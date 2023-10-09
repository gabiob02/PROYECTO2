console.log("Entro index.js");

let prendas = JSON.parse(localStorage.getItem("prendas")) || [];
// Estos son las referencias a mis inputs
const inputTipo = document.getElementById("inputTipo");
const inputPrecio = document.getElementById("inputPrecio");
const inputTalla = document.getElementById("inputTalla");
const inputImagen = document.getElementById("inputImagen");
const inputDescripcion = document.getElementById("inputDescripcion");

// Estas son las referencias a mis botones
const btnAgregar = document.getElementById("btnAgregar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

const divPrendas = document.getElementById("divPrendas");
const alertSinPrendas = document.getElementById("alertSinPrendas");

let indexEditar = null;

class Prenda {
    constructor(tipo, precio, talla, imagen, descripcion) {
        this.tipo = tipo;
        this.precio = precio;
        this.talla = talla;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }
}


function guardarPrenda() {
    let tipo = inputTipo.value;
    let precio = inputPrecio.value;
    let talla = inputTalla.value;
    let imagen = inputImagen.value;
    let descripcion = inputDescripcion.value;

    let prenda = new Prenda(
        tipo,
        precio,
        talla,
        imagen,
        descripcion
    );
    console.log(prenda);

    if (indexEditar === null) {
        console.log("Agregar prenda");
        prendas.push(prenda); 
    } else {
        prendas[indexEditar] = prenda; 
        indexEditar = null;
        console.log("Editar prenda");
    }
    limpiarFormularioPrendas();
    localStorage.setItem("prendas", JSON.stringify(prendas))
    console.log("Entro funcion guardar prenda");
    mostrarPrendas();
}

function borrarTodo() {
    console.log("Entro a borrar todo");
    localStorage.clear();
    prendas = [];
    mostrarPrendas();
    alert("Se borrraron las prendas");
}

function editarPrenda(index) {
    console.log("Entro editar prenda:" + index);
    let prendaAEditar = prendas[index];
    console.log(prendaAEditar, "prendaAEditar");
    inputTipo.value = prendaAEditar.tipo;
    inputPrecio.value = prendaAEditar.precio;
    inputTalla.value = prendaAEditar.talla;
    inputImagen.value = prendaAEditar.imagen;
    inputDescripcion.value = prendaAEditar.descripcion;
    indexEditar = index;
    // Reto: separa la funcionalidad de llenar el formulario a una funcion individual como lo hicimos con la de limpiarFormularioPeliculas
}

function eliminarPrenda(index) {
    console.log("Entro elimnar prenda:" + index);
    prendas.splice(index, 1);
    localStorage.setItem("prendas",JSON.stringify(prendas));
    mostrarPrendas();
}

function mostrarPrendas() {
    if (prendas.length === 0) {
        divPrendas.innerHTML = `
        <div class="alert alert-primary" role="alert" id="alertSinPrendas">
            No hay prendas agregadas
        </div>`;
    } else {
        divPrendas.innerHTML = "";
        prendas.forEach ((prenda, index) => {
            divPrendas.innerHTML += `
                <div class="card mb-3">
                   <div class="row g-0">
                      <div class="col-md-4">
                         <img src="${prenda.imagen}" class="img-fluid rounded-start" alt="prenda">
                      </div>
                      <div class="col-md-8">
                         <div class="card-body">
                            <h5 class="card-title">${prenda.tipo}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${prenda.precio} - ${prenda.talla}</h6>
                            <p class="card-text">${prenda.descripcion}</p>
                            <div class="row mb-2">
                               <div class="col">
                                  <button class="btn btn-dark w-100 mt-2" type="button" id="editar-${index}" onclick="editarPrenda(${index})">Editar</button>
                               </div>
                               <div class="col">
                                  <button class="btn btn-secondary w-100 mt-2" type="button" id="eliminar-${index}" onclick="eliminarPrenda(${index})">Eliminar</button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            `;
        });
    }
}

function limpiarFormularioPrendas() {
    inputTipo.value = "";
    inputPrecio.value = "";
    inputTalla.value = "";
    inputImagen.value = "";
    inputDescripcion.value = "";
}


btnAgregar.addEventListener("click", guardarPrenda);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarPrendas();