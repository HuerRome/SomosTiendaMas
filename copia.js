const btnMas = document.getElementById("btn-mas");
const btnMenos = document.getElementById("btn-menos");
const cantidad = document.getElementById("cantidad");

let contador = 1;

btnMas.addEventListener("click", () => {
    contador++;
    cantidad.textContent = contador;
});

btnMenos.addEventListener("click", () => {

    if(contador > 1){
        contador--;
        cantidad.textContent = contador;
    }

});

