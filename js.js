// ============================================
// CONSTANTES Y UTILIDADES
// ============================================
const ACCOUNT_API = {
    CHECK_USERNAME: '/api/gestionusuario/public/usuario/disponible-username',
    CHECK_EMAIL: '/api/gestionusuario/public/usuario/disponible-email'
};

// Helper para seleccionar elementos
const qs = id => document.getElementById(id);

// Fetch seguro con manejo de errores
function safeFetch(url, options) {
    return fetch(url, options).then(r => {
        if (!r.ok) return Promise.reject(r);
        const ct = r.headers.get('content-type') || '';
        return ct.includes('application/json') ? r.json() : r.text();
    });
}

// Debounce para validaciones en tiempo real
function debounce(fn, wait = 600) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), wait);
    };
}

// Manejo de estados visuales para campos
function setInlineStatus(el, state, message) {
    if (!el) return;
    const states = {
        checking: { cls: 'text-checking', icon: '<i class="fa-solid fa-spinner fa-spin mr-2"></i>' },
        ok: { cls: 'text-success', icon: '<i class="fa-solid fa-circle-check mr-2"></i>' },
        error: { cls: 'text-error', icon: '<i class="fa-solid fa-circle-xmark mr-2"></i>' },
        idle: { cls: '', icon: '' }
    };
    const s = states[state] || states.idle;
    el.className = `status-message ${s.cls}`;
    el.innerHTML = message ? `${s.icon}${message}` : '';
}

// Interpretar respuesta de disponibilidad
function availableFromResponse(data) {
    if (typeof data === 'boolean') return data;
    if (data && typeof data === 'object') {
        if ('available' in data) return !!data.available;
        if ('disponible' in data) return !!data.disponible;
        if ('exists' in data) return !data.exists;
        if ('taken' in data) return !data.taken;
    }
    if (typeof data === 'string') {
        const s = data.toLowerCase();
        if (s.includes('disponible') || s.includes('available')) return true;
        if (s.includes('no disponible') || s.includes('existe') || s.includes('taken')) return false;
    }
    return null;
}

// ============================================
// MANEJO DE ERRORES GLOBALES
// ============================================
function clearErrors() {
    const box = qs('errorBox');
    const list = qs('errorList');
    if (list) list.innerHTML = '';
    if (box) box.classList.add('hidden');
}

function showErrors(errors) {
    const box = qs('errorBox');
    const list = qs('errorList');
    if (!box || !list) return;
    list.innerHTML = '';
    errors.forEach(m => {
        const li = document.createElement('li');
        li.textContent = m;
        list.appendChild(li);
    });
    box.classList.remove('hidden');
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// VALIDACIÓN DE CONTRASEÑA
// ============================================
function updatePasswordChecklist(pass) {
    const setItem = (id, ok) => {
        const li = document.getElementById(id);
        if (!li) return;
        const iconOk = '<i class="fa-solid fa-circle-check mr-2"></i>';
        const iconKo = '<i class="fa-solid fa-circle-xmark mr-2"></i>';
        const text = li.textContent.replace(/[✓✗]/g, '').trim();
        li.classList.remove('valid', 'invalid');
        li.classList.add(ok ? 'valid' : 'invalid');
        li.innerHTML = (ok ? iconOk : iconKo) + ' ' + text;
    };

    setItem('pwc-length', pass.length >= 8);
    setItem('pwc-upper', /[A-Z]/.test(pass));
    setItem('pwc-number', /[0-9]/.test(pass));
    setItem('pwc-special', /[^A-Za-z0-9]/.test(pass));
}

function updatePasswordMatch() {
    const pass = qs('password')?.value || '';
    const pass2 = qs('confirmPassword')?.value || '';
    const el = qs('passwordMatch');
    if (!el || (!pass && !pass2)) {
        if (el) setInlineStatus(el, 'idle', '');
        return;
    }
    setInlineStatus(el, pass && pass2 && pass === pass2 ? 'ok' : 'error',
        pass === pass2 ? 'Las contraseñas coinciden.' : 'Las contraseñas no coinciden.');
}

// ============================================
// VALIDACIÓN EN TIEMPO REAL (USERNAME / EMAIL)
// ============================================
async function checkUsernameAvailability(u) {
    try {
        const d = await safeFetch(`${ACCOUNT_API.CHECK_USERNAME}?username=${encodeURIComponent(u)}`);
        return availableFromResponse(d);
    } catch { return null; }
}

async function checkEmailAvailability(e) {
    try {
        const d = await safeFetch(`${ACCOUNT_API.CHECK_EMAIL}?email=${encodeURIComponent(e)}`);
        return availableFromResponse(d);
    } catch { return null; }
}

function wireRealtimeValidation() {
    const u = qs('username'), uS = qs('usernameStatus');
    const e = qs('email'), eS = qs('emailStatus');
    const p = qs('password'), p2 = qs('confirmPassword');

    if (u && uS) {
        const doCheck = debounce(async () => {
            const v = (u.value || '').trim();
            if (!v || v.length < 6) {
                setInlineStatus(uS, 'idle', '');
                return;
            }
            setInlineStatus(uS, 'checking', 'Comprobando disponibilidad...');
            const ok = await checkUsernameAvailability(v);
            if (ok === true) setInlineStatus(uS, 'ok', 'Usuario disponible.');
            else if (ok === false) setInlineStatus(uS, 'error', 'Usuario no disponible.');
            else setInlineStatus(uS, 'idle', 'No se pudo verificar ahora.');
        }, 700);
        u.addEventListener('input', doCheck);
        u.addEventListener('blur', () => doCheck());
    }

    if (e && eS) {
        const doCheck = debounce(async () => {
            const v = (e.value || '').trim();
            if (!v) {
                setInlineStatus(eS, 'idle', '');
                return;
            }
            if (e.validity?.typeMismatch) {
                setInlineStatus(eS, 'error', 'Formato de correo inválido.');
                return;
            }
            setInlineStatus(eS, 'checking', 'Comprobando disponibilidad...');
            const ok = await checkEmailAvailability(v);
            if (ok === true) setInlineStatus(eS, 'ok', 'Correo disponible.');
            else if (ok === false) setInlineStatus(eS, 'error', 'Correo ya registrado.');
            else setInlineStatus(eS, 'idle', 'No se pudo verificar ahora.');
        }, 700);
        e.addEventListener('input', doCheck);
        e.addEventListener('blur', () => doCheck());
    }

    if (p) {
        updatePasswordChecklist(p.value || '');
        p.addEventListener('input', () => {
            updatePasswordChecklist(p.value || '');
            updatePasswordMatch();
        });
    }
    if (p2) {
        p2.addEventListener('input', updatePasswordMatch);
    }
}

// ============================================
// VALIDACIÓN CENTRAL DEL FORMULARIO
// ============================================
function validateForm() {
    const errors = [];
    const val = id => (qs(id)?.value || '').trim();
    const onlyDigits = v => /^\d+$/.test(v);

    // Usuario
    const username = val('username');
    if (!username) errors.push('El campo Usuario no puede estar vacío.');
    else if (username.length < 6 || username.length > 16) errors.push('El Usuario debe tener entre 6 y 16 caracteres.');

    const email = val('email');
    if (!email) errors.push('El campo Correo electrónico es obligatorio.');
    else if (qs('email')?.validity?.typeMismatch) errors.push('El Correo electrónico no es válido.');

    // Password
    const pass = val('password'), pass2 = val('confirmPassword');
    if (!pass) errors.push('El campo Contraseña es obligatorio.');
    if (!pass2) errors.push('El campo Repetir contraseña es obligatorio.');
    if (pass && pass.length < 8) errors.push('La Contraseña debe tener al menos 8 caracteres.');
    if (pass && !/[A-Z]/.test(pass)) errors.push('La Contraseña debe incluir al menos una letra mayúscula.');
    if (pass && !/[0-9]/.test(pass)) errors.push('La Contraseña debe incluir al menos un número.');
    if (pass && !/[^A-Za-z0-9]/.test(pass)) errors.push('La Contraseña debe incluir al menos un caracter especial.');
    if (pass && pass2 && pass !== pass2) errors.push('El campo Contraseña y Repetir contraseña no coinciden.');

    // Responsable
    if (!val('repFirstName')) errors.push('El Nombre del responsable es obligatorio.');
    if (!val('repLastName')) errors.push('El Apellido del responsable es obligatorio.');
    if (!val('repGender')) errors.push('Debes seleccionar un Género del responsable.');
    if (!val('repDocument')) errors.push('El Documento del responsable es obligatorio.');
    else if (!onlyDigits(val('repDocument'))) errors.push('El Documento del responsable debe contener solo números.');
    if (!val('repBirthDate')) errors.push('La Fecha de nacimiento del responsable es obligatoria.');

    // Empresa
    if (!val('businessName')) errors.push('La Razón social es obligatoria.');
    const cuit = val('cuit').replace(/-/g, '');
    if (!cuit) errors.push('El CUIT es obligatorio.');
    else if (!/^\d{11}$/.test(cuit)) errors.push('El CUIT debe tener 11 dígitos.');

    const companyEmail = val('companyEmail');
    if (!companyEmail) errors.push('El Email de la empresa es obligatorio.');
    else if (qs('companyEmail')?.validity?.typeMismatch) errors.push('El Email de la empresa no es válido.');

    // Dirección Empresa (cascading selects)
    if (!val('provinciaSelect')) errors.push('Debes seleccionar una Provincia de la empresa.');
    if (!val('departamentoSelect')) errors.push('Debes seleccionar un Departamento de la empresa.');
    if (!val('municipioSelect')) errors.push('Debes seleccionar un Municipio de la empresa.');
    if (!val('localidadSelect')) errors.push('Debes seleccionar una Localidad de la empresa.');
    if (!val('street')) errors.push('La Calle de la empresa es obligatoria.');
    if (!val('number')) errors.push('El Número de la empresa es obligatorio.');
    else if (!onlyDigits(val('number'))) errors.push('El Número de la empresa debe ser numérico.');
    if (!val('postalCode')) errors.push('El Código Postal de la empresa es obligatorio.');

    // Teléfono Responsable
    if (!val('repPhoneArea')) errors.push('La Característica del responsable es obligatoria.');
    else if (!onlyDigits(val('repPhoneArea'))) errors.push('La Característica del responsable debe ser numérica.');
    if (!val('repPhoneNumber')) errors.push('El Número de teléfono del responsable es obligatorio.');
    else if (!onlyDigits(val('repPhoneNumber'))) errors.push('El Número de teléfono del responsable debe ser numérico.');
    if (!val('repPhoneType')) errors.push('El Tipo de teléfono del responsable es obligatorio.');

    // Teléfono Empresa
    if (!val('companyPhoneArea')) errors.push('La Característica de la empresa es obligatoria.');
    else if (!onlyDigits(val('companyPhoneArea'))) errors.push('La Característica de la empresa debe ser numérica.');
    if (!val('companyPhoneNumber')) errors.push('El Número de teléfono de la empresa es obligatorio.');
    else if (!onlyDigits(val('companyPhoneNumber'))) errors.push('El Número de teléfono de la empresa debe ser numérico.');
    if (!val('companyPhoneType')) errors.push('El Tipo de teléfono de la empresa es obligatorio.');

    // Términos
    if (!qs('terms')?.checked) errors.push('Debes aceptar los Términos y Condiciones y la Política de Privacidad.');

    return errors;
}

// ============================================
// INICIALIZACIÓN DE FECHA DE NACIMIENTO
// ============================================
function initBirthDateConstraints() {
    const bd = qs('repBirthDate');
    if (!bd) return;
    const today = new Date();
    bd.max = today.toISOString().split('T')[0];
    bd.min = '1900-01-01';
}

// ============================================
// ENVÍO DEL FORMULARIO
// ============================================
async function handleSubmit(evt) {
    evt.preventDefault();
    clearErrors();

    const errors = validateForm();
    if (errors.length) {
        showErrors(errors);
        return;
    }

    const btn = qs('submitBtn');
    const spinner = qs('spinner');
    const btnText = qs('btnText');

    btn.disabled = true;
    btnText.textContent = 'Creando cuenta...';
    if (spinner) spinner.classList.remove('hidden');

    const tipoUsuario = 'EMPRESA';

    const payload = {
        responsable: {
            username: qs('username').value.trim(),
            password: qs('password').value,
            email: qs('email').value.trim(),
            nombreResponsable: qs('repFirstName').value.trim(),
            apellidoResponsable: qs('repLastName').value.trim(),
            documentoResponsable: qs('repDocument').value.trim(),
            aceptaPoliticaPriv: qs('terms').checked,
            aceptaTerminos: qs('terms').checked,
            fechaNacimientoResponsable: qs('repBirthDate').value,
            generoResponsable: qs('repGender').value,
            tipoUsuario,
            idioma: 'es',
            timezone: 'America/Argentina/Buenos_Aires',
            rol: 'ROLE_USUARIO'
        },
        perfilEmpresa: {
            razonSocial: qs('businessName').value.trim(),
            cuit: qs('cuit').value.trim().replace(/-/g, ''),
            condicionIVA: qs('ivaCondition')?.value || 'RI',
            emailEmpresa: qs('companyEmail').value.trim(),
            requiereFacturacion: qs('requiresBilling')?.checked || false
        },
        direccionesResponsable: [
            {
                calle: qs('repStreet')?.value.trim() || '',
                numero: qs('repStreetNumber')?.value.trim() || '',
                codigoPostal: qs('repPostalCode')?.value.trim() || '',
                idPais: 1,
                provinciaTexto: qs('repProvince')?.value.trim() || '',
                ciudadTexto: qs('repCity')?.value.trim() || '',
                activa: true,
                esPrincipal: true,
                tipo: qs('repAddressType')?.value || ''
            }
        ],
        telefonosResponsable: [
            {
                numero: qs('repPhoneNumber').value.trim(),
                caracteristica: qs('repPhoneArea').value.trim(),
                activo: true,
                verificado: false,
                tipo: qs('repPhoneType').value
            }
        ],
        direccionesEmpresa: [
            {
                calle: qs('street').value.trim(),
                numero: qs('number').value.trim(),
                codigoPostal: qs('postalCode').value.trim(),
                idPais: 1,
                provinciaId: parseInt(qs('provinciaSelect').value) || null,
                departamentoId: parseInt(qs('departamentoSelect').value) || null,
                municipioId: parseInt(qs('municipioSelect').value) || null,
                localidadId: parseInt(qs('localidadSelect').value) || null,
                piso: qs('floor')?.value || null,
                departamentoInterno: qs('apartment')?.value || null,
                referencia: qs('reference')?.value || null,
                activa: true,
                tipo: 'FISCAL',
                esPrincipal: true
            }
        ],
        telefonosEmpresa: [
            {
                numero: qs('companyPhoneNumber').value.trim(),
                caracteristica: qs('companyPhoneArea').value.trim(),
                tipo: qs('companyPhoneType').value,
                activo: true,
                verificado: false
            }
        ]
    };

    try {
        const res = await fetch('/api/gestionusuario/public/empresa/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert('Cuenta de empresa creada correctamente. Verifica tu email.');
            qs('companyForm').reset();
            updatePasswordChecklist('');
            updatePasswordMatch();
            clearErrors();
        } else {
            let text;
            try { text = await res.text(); } catch { }
            showErrors([text || `HTTP ${res.status}`]);
        }
    } catch (err) {
        console.error(err);
        showErrors(['Ocurrió un error al crear la cuenta. Intenta nuevamente.']);
    } finally {
        btn.disabled = false;
        btnText.textContent = 'Crear cuenta';
        if (spinner) spinner.classList.add('hidden');
    }
}

// ============================================
// DOM CONTENT LOADED
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initBirthDateConstraints();
    try {
        if (typeof initLocationSelectors === 'function') initLocationSelectors();
    } catch (e) {
        console.warn('initLocationSelectors no está definido. Asegúrate de que ubicaciones.js esté cargado.');
    }
    wireRealtimeValidation();
    const form = document.getElementById('companyForm');
    if (form) form.addEventListener('submit', handleSubmit);
});


