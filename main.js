
//ARRAY INVENTARIO
let inventario = []


//AGREGAR PRODUCTOS

//boton navegador
const botonAgregarP = document.querySelector("#agregarP")
if (botonAgregarP) {
    botonAgregarP.addEventListener("click", () => {
        window.location.href = "./pages/agregarProductos.html#agregarProducto"
    })
}

//funcion obtener datos
function obtenerDatosFormulario() {
    return {
        nombre: document.querySelector("#nombre").value,
        precio: parseFloat(document.querySelector("#precio").value),
        stock: parseInt(document.querySelector("#stock").value),
    }
}

//funcion validacion
function validarProducto(producto) {
    if (!producto.nombre) {
        Swal.fire("El nombre no puede estar vacio")
        return false
    }
    if (isNaN(producto.precio) || producto.precio <= 0) {
        Swal.fire("El precio debe ser un numero mayor a 0")
        return false
    }
    if (isNaN(producto.stock) || producto.stock < 0) {
        Swal.fire("El stock debe ser un numero entero igual o mayor a 0")
        return false
    }

    return true
}
//funcion limpiar
function limpiarFormulario() {
    document.querySelector("#nombre").value = ""
    document.querySelector("#precio").value = ""
    document.querySelector("#stock").value = ""
}

//funcion guardar inventario
function guardarInventario() {
    localStorage.setItem("inventario", JSON.stringify(inventario))
}

//funcion cargar productos del JSON
async function obtenerProductosDesdeJSON() {
    const rutaJSON = window.location.pathname.includes("/pages/")
        ? "../data/ProductosImportar.json"
        : "./data/ProductosImportar.json"

    const respuesta = await fetch(rutaJSON)

    if (!respuesta.ok) {
        throw new Error("No se pudo cargar el archivo JSON")
    }

    const datos = await respuesta.json()

    return datos.productos
}

async function cargarInventarioInicial() {

    const inventarioGuardado = localStorage.getItem("inventario")

    if (inventarioGuardado) {
        inventario = JSON.parse(inventarioGuardado)
        return
    }

    try {

        inventario = await obtenerProductosDesdeJSON()

        guardarInventario()
    }

    catch {

        Swal.fire({
            title: "Error",
            text: "No fue posible cargar el inventario inicial.",
            icon: "error"
        })
    }
}

//boton agregar
const botonAgregar = document.querySelector("#agregar")

if (botonAgregar) {
    botonAgregar.addEventListener("click", () => {

        const datos = obtenerDatosFormulario()

        if (!validarProducto(datos)) return

        const producto = {
            ...datos,
            id: Date.now()
        }

        inventario.push(producto)
        guardarInventario()

        limpiarFormulario()

    })
}

//boton importar producto
const botonImportar = document.querySelector("#importarProducto")
if (botonImportar) {
    botonImportar.addEventListener("click", cargarProductosDesdeJSON)

    async function cargarProductosDesdeJSON() {

        try {
            const productos = await

                obtenerProductosDesdeJSON()


            const contenedor = document.querySelector("#listaImportacion");
            contenedor.innerHTML = ""

            productos.forEach((producto) => {
                const div = document.createElement("div")
                const boton = document.createElement("button")
                boton.textContent = "Importar"



                //boton importar del JSON
                boton.addEventListener("click", () => {

                    //crear producto con id
                    const productoConId = {
                        ...producto,
                        id: Date.now()
                    }
                    inventario.push(productoConId)
                    guardarInventario()

                    Swal.fire({
                        title: "¡Listo!",
                        text: `El producto "${producto.nombre}" se importó correctamente`,
                        icon: "success",
                        confirmButtonText: "Aceptar"
                    })
                })

                div.innerHTML = `
        <p><strong>${producto.nombre}</strong></p>
        <p>Precio: ${producto.precio}</p>
        <p>Stock: ${producto.stock}</p>
        <hr>
    `

                div.appendChild(boton)
                contenedor.appendChild(div)
            })
        }
        catch {

            Swal.fire({
                title: "Error",
                text: "Ocurrió un problema al importar los productos.",
                icon: "error"
            })

        }
    }
}

//boton restablecer inventario
const botonRestablecer = document.querySelector("#restablecerInventario")

if (botonRestablecer) {
    botonRestablecer.addEventListener("click", async () => {
        inventario = await obtenerProductosDesdeJSON()

        guardarInventario()

        Swal.fire({
            title: "Inventario restablecido",
            text: "El inventario volvió a su estado original",
            icon: "success",
            confirmButtonText: "Aceptar"
        })
    })
}



//boton volver menu
const botonVolverMenuA = document.querySelector("#salir")
if (botonVolverMenuA) {
    botonVolverMenuA.addEventListener("click", () => {
        window.location.href = "../index.html"
    })
}


//BUSCAR PRODUCTO

//boton navegador
const botonBuscarP = document.querySelector("#buscarP")
if (botonBuscarP) {
    botonBuscarP.addEventListener("click", () => {
        window.location.href = "./pages/buscarProducto.html#buscador"
    })
}

//boton buscador
const buscador = document.querySelector("#botonBuscador")
if (buscador) {
    buscador.addEventListener("click", () => {

        const inputBusqueda = document.querySelector("#productoBuscado")
        const productoBuscado = inputBusqueda.value


        //validacion
        if (!productoBuscado.trim()) {
            Swal.fire("Ingresa el nombre del producto a buscar")
            return
        }

        const textoBusqueda = productoBuscado.toLowerCase()

        const productoEncontrado = inventario.find(
            producto => producto.nombre.toLowerCase().includes(textoBusqueda)
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

        inputBusqueda.value = ""

    })
}


//ACTUALIZAR STOCK

//boton navegador
const botonActualizarP = document.querySelector("#actualizarP")
if (botonActualizarP) {
    botonActualizarP.addEventListener("click", () => {
        window.location.href = "./pages/actualizarProducto.html#actualizarProductor"
    })
}

//boton actualizar
const botonBusquedaProducto = document.querySelector("#botonBuscadorParaActualizar")
if (botonBusquedaProducto) {
    botonBusquedaProducto.addEventListener("click", () => {

        const inputActualizar = document.querySelector("#productoParaActualizar")
        let productoParaActualizar = inputActualizar.value

        //validacion
        if (!productoParaActualizar.trim()) {
            Swal.fire("Ingresa el nombre del producto a actualizar")
            return
        }

        const textoActualizar = productoParaActualizar.trim().toLowerCase()

        let productoFiltrado = inventario.find(producto => { 
            return producto.nombre.toLowerCase() === textoActualizar
        })


        const contenedor = document.querySelector("#resultadoBusqueda")

        if (productoFiltrado) {

            contenedor.innerHTML = `
                <p>Nombre: ${productoFiltrado.nombre}</p>
                <p>Precio: <input type="number" id="nuevoPrecio" value="${productoFiltrado.precio}"></p>
                <p>Stock: <input type="number" id="nuevoStock" value="${productoFiltrado.stock}"></p>
                <button id="guardarCambios">Guardar Cambios</button>
            `

            const botonGuardar = document.querySelector("#guardarCambios")
            //boton guardar
            botonGuardar.addEventListener("click", () => {

                const inputPrecio = document.querySelector("#nuevoPrecio")
                const inputStock = document.querySelector("#nuevoStock")

                let nuevoPrecio = parseFloat(inputPrecio.value)
                let nuevoStock = parseInt(inputStock.value)

                //validacion precio
                if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
                    Swal.fire("El precio debe ser un número mayor a 0")
                    return
                }
                //validacion stock
                if (isNaN(nuevoStock) || nuevoStock < 0) {
                    Swal.fire("El stock debe ser un número entero igual o mayor a 0")
                    return
                }

                productoFiltrado.precio = nuevoPrecio
                productoFiltrado.stock = nuevoStock

                guardarInventario()

                Swal.fire({
                    title: "¡Éxito!",
                    text: `El producto "${productoFiltrado.nombre}" se actualizo correctamente`,
                    icon: "success",
                    confirmButtonText: "Aceptar"
                })
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
    botonEliminarP.addEventListener("click", () => {
        window.location.href = "./pages/eliminarProducto.html#h1Eliminar"
    })
}


//boton buscar para eliminar
const buscarParaEliminar = document.querySelector("#botonBuscadorParaEliminar")

if (buscarParaEliminar) {
    buscarParaEliminar.addEventListener("click", () => {

        const inputEliminar = document.querySelector("#productoParaEliminar")
        const productoBuscado = inputEliminar.value



        //validacion
        if (!productoBuscado.trim()) {
            Swal.fire("Ingresa el nombre correcto del producto a eliminar")
            return
        }
        const textoBuscado = productoBuscado.toLowerCase()

        const productoEncontrado = inventario.find(
            producto => producto.nombre.toLowerCase() === textoBuscado
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
                Swal.fire({
                    title: "¿Estás seguro?",
                    text: `Se eliminará el producto "${productoBuscado}" del inventario`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (!result.isConfirmed) return


                    inventario = inventario.filter(producto =>
                        producto.nombre.toLowerCase() !== textoBuscado
                    )

                    guardarInventario()

                    inputEliminar.value = ""
                    contenedor.innerHTML = ""
                    inputEliminar.focus()


                    Swal.fire("¡Eliminado!", `El producto "${productoBuscado}" fue eliminado correctamente`, "success")
                })
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
    botonListaP.addEventListener("click", () => {
        window.location.href = "./pages/listaProductos.html#h1lista"
    })
}

//boton lista
const botonMostrarLista = document.querySelector("#mostrarLista")
if (botonMostrarLista) {
    botonMostrarLista.addEventListener("click", () => {

        const contenedor = document.querySelector("#listaProductos")

        if (inventario.length === 0) {
            Swal.fire({
                title: "Inventario vacío",
                text: "No hay productos en el inventario",
                icon: "warning",
                confirmButtonText: "Aceptar"
            })
            return
        }

        let listaHTML = ""

        inventario.forEach(producto => {

            listaHTML += `
                <div>
                    <p>Nombre: ${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p>Stock: ${producto.stock}</p>
                    <hr>
                </div>
            `
        })

        contenedor.innerHTML = listaHTML
    })
}

cargarInventarioInicial()