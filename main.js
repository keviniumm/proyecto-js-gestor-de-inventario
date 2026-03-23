//ARRAY INVENTARIO
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

        //validacion
        if (!producto.nombre) {
            Swal.fire("El nombre no puede estar vacio")
            return
        }
        if (isNaN(producto.precio) || producto.precio <= 0) {
            Swal.fire("El precio debe ser un numero mayor a 0")
            return
        }
        if (isNaN(producto.stock) || producto.stock < 0) {
            Swal.fire("El stock debe ser un numero entero igual o mayor a 0")
            return
        }

        inventario.push(producto)
        localStorage.setItem("inventario", JSON.stringify(inventario));


        document.querySelector("#nombre").value = ""
        document.querySelector("#precio").value = ""
        document.querySelector("#stock").value = ""
    })
}

//boton importar producto
const botonImportar = document.querySelector("#importarProducto")
if (botonImportar) {
    botonImportar.addEventListener("click", cargarProductosDesdeJSON)

    async function cargarProductosDesdeJSON() {

        try {
            const respuesta = await fetch("../data/ProductosImportar.json")

            if (!respuesta.ok) {
                Swal.fire({
                    title: "Error",
                    text: "Error al cargar el archivo JSON",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                })
                throw new Error("Error al cargar el archivo JSON")
            }

            const productos = await respuesta.json()
            console.log(productos)

            const contenedor = document.querySelector("#listaImportacion");
            contenedor.innerHTML = ""

            productos.productos.forEach((producto, index) => {
                const div = document.createElement("div")
                const boton = document.createElement("button")
                boton.textContent = "Importar"

                //boton importar del JSON
                boton.addEventListener("click", () => {
                    let inventario = JSON.parse(localStorage.getItem("inventario")) || []
                    inventario.push(producto)
                    localStorage.setItem("inventario", JSON.stringify(inventario))
                    console.log("producto importado")
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
    `

                div.appendChild(boton)
                contenedor.appendChild(div)
            })
        } catch (error) {
            console.error("Hubo un problema:", error)
        }
    }
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

        //validacion
        if (!productoBuscado) {
            Swal.fire("Ingresa el nombre del producto a buscar")
            return
        }

        const productoEncontrado = inventario.find(
            producto => producto.nombre.toLowerCase() === productoBuscado
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

        //validacion
        if (!productoParaActualizar) {
            Swal.fire("Ingresa el nombre del producto a actualizar")
            return
        }

        let productoFiltrado = inventario.filter(producto => {
            return producto.nombre.toLowerCase() === productoParaActualizar
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

                //validacion precio
                if (isNaN(nuevoPrecio) || parseFloat(nuevoPrecio) <= 0) {
                    Swal.fire("El precio debe ser un número mayor a 0")
                    return
                }
                //validacion stock
                if (isNaN(nuevoStock) || parseInt(nuevoStock) < 0) {
                    Swal.fire("El stock debe ser un número entero igual o mayor a 0")
                    return
                }

                productoFiltrado[0].precio = parseFloat(nuevoPrecio)
                productoFiltrado[0].stock = parseInt(nuevoStock)

                localStorage.setItem("inventario", JSON.stringify(inventario))

                Swal.fire({
                    title: "¡Éxito!",
                    text: `El producto "${productoFiltrado[0].nombre}" se actualizo correctamente`,
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
    document.querySelector("#eliminarP").addEventListener("click", () => {
        window.location.href = "./pages/eliminarProducto.html#h1Eliminar"
    })
}


//boton buscar para eliminar
const buscarParaEliminar = document.querySelector("#botonBuscadorParaEliminar")

if (buscarParaEliminar) {
    buscarParaEliminar.addEventListener("click", () => {

        const productoBuscado = document.querySelector("#productoParaEliminar").value

        //validacion
        if (!productoBuscado) {
            Swal.fire("Ingresa el nombre correcto del producto a eliminar")
            return
        }

        let inventario = JSON.parse(localStorage.getItem("inventario")) || []

        const productoEncontrado = inventario.find(
            producto => producto.nombre.toLowerCase() === productoBuscado
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
                        producto.nombre !== productoBuscado
                    )

                    localStorage.setItem("inventario", JSON.stringify(inventario))

                    document.querySelector("#productoParaEliminar").value = ""
                    contenedor.innerHTML = ""
                    document.querySelector("#productoParaEliminar").focus()

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
            Swal.fire({
                title: "Inventario vacío",
                text: "No hay productos en el inventario",
                icon: "warning",
                confirmButtonText: "Aceptar"
            })
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