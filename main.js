//array inventario
let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

/* //menú pantalla
function mostrarMenu() {
    return prompt(
        ` GESTOR DE INVENTARIOS
1 - Agregar producto
2 - Buscar producto
3 - Actualizar stock
4 - Eliminar producto
0 - Salir`
    );
} */

/* //menu 
let menu;

while (menu !== "0") {
    menu = mostrarMenu();

    switch (menu) {
        case "1":
            agregarProducto();
            break;
        case "2":
            buscarProducto();
            break;
        case "3":
            actualizarStock();
            break;
        case "4":
            eliminarProducto();
            break;
        case "0":
            alert("Saliendo del sistema");
            break;
        default:
            alert("Opción inválida");
    }
} */

//AGREGAR PRODUCTOS

//boton navegador
const botonAgregarP = document.querySelector("#agregarP")
if (botonAgregarP) {
    document.querySelector("#agregarP").addEventListener("click", () => {
        window.location.href = "./pages/agregarProductos.html#agregarProducto"
    })
}

const botonAgregar = document.querySelector("#agregar")
if (botonAgregar) {
    document.querySelector("#agregar").addEventListener("click", () => {
        const producto = {
            nombre: document.querySelector("#nombre").value,
            precio: parseFloat(document.querySelector("#precio").value),
            stock: parseInt(document.querySelector("#stock").value)
        }
        inventario.push(producto)
        localStorage.setItem("inventario", JSON.stringify(inventario));
        console.log(inventario)

        document.querySelector("#nombre").value = ""
        document.querySelector("#precio").value = ""
        document.querySelector("#stock").value = ""
    })
}

//boton volver menu
const botonVolverMenuA = document.querySelector("#salir")
if (botonVolverMenuA) {
    document.querySelector("#salir").addEventListener("click", () => {
        window.location.href = "../index.html"
    })
}


//BUSCAR PRODUCTO

//boton navegador
const botonBuscarP = document.querySelector("#buscarP")
if (botonBuscarP) {
    document.querySelector("#buscarP").addEventListener("click", () => {
        window.location.href = "./pages/buscarProducto.html#buscador"
    })
}

const buscador = document.querySelector("#botonBuscador")
if (buscador) {
    buscador.addEventListener("click", () => {
        const valorBuscado = document.querySelector("#productoBuscado").value

        const productoEcontrado = inventario.find(
            producto => producto.nombre === valorBuscado
        )
        console.log(productoEcontrado)
    })
}




//ACTUALIZAR STOCK

//boton navegador
const botonActualizarP = document.querySelector("#actualizarP")
if (botonActualizarP) {
    document.querySelector("#actualizarP").addEventListener("click", () => {
        window.location.href = "./pages/actualizarProducto.html#actualizarProductor"
    })
}

const botonBusquedaProducto = document.querySelector("#botonBuscadorParaActualizar")
if (botonBusquedaProducto) {
    botonBusquedaProducto.addEventListener("click", () => {

        let productoParaActualizar = document.querySelector("#productoParaActualizar").value

        let productoFiltrado = inventario.filter(producto => {
            return producto.nombre === productoParaActualizar
        })
        console.log(productoFiltrado)

        const contenedor = document.querySelector("#resultadoBusqueda")

        if (productoFiltrado.length > 0) {

            contenedor.innerHTML = `
                <p>Nombre: ${productoFiltrado[0].nombre}</p>
                <p>Precio: <input type="number" id="nuevoPrecio" value="${productoFiltrado[0].precio}"></p>
                <p>Stock: <input type="number" id="nuevoStock" value="${productoFiltrado[0].stock}"></p>
                <button id="guardarCambios">Guardar Cambios</button>
            `

            const botonGuardar = document.querySelector("#guardarCambios")

            botonGuardar.addEventListener("click", () => {

                let nuevoPrecio = document.querySelector("#nuevoPrecio").value
                let nuevoStock = document.querySelector("#nuevoStock").value

                productoFiltrado[0].precio = parseFloat(nuevoPrecio)
                productoFiltrado[0].stock = parseInt(nuevoStock)

                localStorage.setItem("inventario", JSON.stringify(inventario))

                
                console.log(inventario)
            })

        } else {
            contenedor.innerHTML = "<p>Producto no encontrado</p>"
        }
    })
    
}







//eliminar producto
function eliminarProducto() {
    const nombre = prompt("Ingrese el nombre del producto:");
    let encontrado = false;
    const nuevoInventario = [];

    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].nombre === nombre) {
            encontrado = true;
        } else {
            nuevoInventario.push(inventario[i]);
        }
    }

    if (encontrado) {
        inventario.length = 0;

        for (let i = 0; i < nuevoInventario.length; i++) {
            inventario.push(nuevoInventario[i]);
        }

        alert("Producto eliminado correctamente");
    } else {
        alert("Producto no encontrado");
    }
}



