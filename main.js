//array inventario
let inventario = JSON.parse(localStorage.getItem("inventario")) || [];


//AGREGAR PRODUCTOS

//boton navegador
const botonAgregarP = document.querySelector("#agregarP")
if (botonAgregarP) {
    document.querySelector("#agregarP").addEventListener("click", () => {
        window.location.href = "./pages/agregarProductos.html#agregarProducto"
    })
}

//boton agregar
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

//boton buscador
const buscador = document.querySelector("#botonBuscador")
if (buscador) {
    buscador.addEventListener("click", () => {
        const productoBuscado = document.querySelector("#productoBuscado").value

        const productoEncontrado = inventario.find(
            producto => producto.nombre === productoBuscado
        )

        const contenedor = document.querySelector("#resultadoBusqueda")
        if (productoEncontrado) {
            contenedor.innerHTML = `
                <div>
                    <p><strong>Nombre:</strong> ${productoEncontrado.nombre}</p>
                    <p><strong>Precio:</strong> ${productoEncontrado.precio}</p>
                    <p><strong>Stock:</strong> ${productoEncontrado.stock}</p>
                </div>
            `} else {
            contenedor.innerHTML = "<p>Producto no encontrado</p>"
        }

        document.querySelector("#productoBuscado").value = ""

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

//boton actualizar
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
            //boton guardar
            botonGuardar.addEventListener("click", () => {

                let nuevoPrecio = document.querySelector("#nuevoPrecio").value
                let nuevoStock = document.querySelector("#nuevoStock").value

                productoFiltrado[0].precio = parseFloat(nuevoPrecio)
                productoFiltrado[0].stock = parseInt(nuevoStock)

                localStorage.setItem("inventario", JSON.stringify(inventario))

            })

        } else {
            contenedor.innerHTML = "<p>Producto no encontrado</p>"
        }
    })

}

//ELIMINAR PRODUCTO

//boton navegador
const botonEliminarP = document.querySelector("#eliminarP")
if (botonEliminarP) {
    document.querySelector("#eliminarP").addEventListener("click", () => {
        window.location.href = "./pages/eliminarProducto.html#h1Eliminar"
    })
}


//boton buscar para eliminar
const buscarParaEliminar = document.querySelector("#botonBuscadorParaEliminar")

if (buscarParaEliminar) {
    buscarParaEliminar.addEventListener("click", () => {

        const productoBuscado = document.querySelector("#productoParaEliminar").value

        const productoEncontrado = inventario.find(
            producto => producto.nombre === productoBuscado
        )

        const contenedor = document.querySelector("#resultadoEliminar")

        if (productoEncontrado) {

            contenedor.innerHTML = `
                <p>Nombre: ${productoEncontrado.nombre}</p>
                <p>Precio: ${productoEncontrado.precio}</p>
                <p>Stock: ${productoEncontrado.stock}</p>
                <button id="confirmarEliminar">Eliminar Producto</button>
            `
            //boton eliminar
            const botonConfirmar = document.querySelector("#confirmarEliminar")

            botonConfirmar.addEventListener("click", () => {
                inventario = inventario.filter(producto =>
                    producto.nombre !== productoBuscado
                )

                localStorage.setItem("inventario", JSON.stringify(inventario))

                document.querySelector("#productoParaEliminar").value = ""
                contenedor.innerHTML = ""
                document.querySelector("#productoParaEliminar").focus()

                console.log(inventario)
            })

        } else {
            contenedor.innerHTML = "<p>Producto no encontrado</p>"
        }
    })
}

//LISTA DEL INVENTARIO

//boton navegador
const botonListaP = document.querySelector("#listaP")
if (botonListaP) {
    document.querySelector("#listaP").addEventListener("click", () => {
        window.location.href = "./pages/listaProductos.html#h1lista"
    })
}

//boton lista
const botonMostrarLista = document.querySelector("#mostrarLista")
if (botonMostrarLista) {
    botonMostrarLista.addEventListener("click", () => {

        const contenedor = document.querySelector("#listaProductos")

        if (inventario.length === 0) {
            contenedor.innerHTML = "<p>No hay productos en el inventario</p>"
            return
        }

        let listaHTML = ""

        for (let i = 0; i < inventario.length; i++) {

            listaHTML += `
                <div>
                    <p>Nombre: ${inventario[i].nombre}</p>
                    <p>Precio: ${inventario[i].precio}</p>
                    <p>Stock: ${inventario[i].stock}</p>
                    <hr>
                </div>
            `
        }

        contenedor.innerHTML = listaHTML
    })
}