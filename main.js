//array inventario
const inventario = [];

//menú pantalla
function mostrarMenu() {
    return prompt(
        `📦 GESTOR DE INVENTARIOS
1 - Agregar producto
2 - Buscar producto
3 - Actualizar stock
4 - Eliminar producto
0 - Salir`
    );
}

//menu 
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
}

//agregar producto
function agregarProducto() {
    const nombre = prompt("Ingrese el nombre del producto:");
    const precio = Number(prompt("Ingrese el precio:"));
    const stock = Number(prompt("Ingrese el stock inicial:"));

    if (nombre == "" || precio <= 0 || stock < 0) {
        alert("Datos inválidos");
        return;
    }

    const producto = {
        nombre: nombre,
        precio: precio,
        stock: stock
    };

    inventario.push(producto);
    alert("Producto agregado");
}

//buscar producto
function buscarProducto() {
    const nombreBuscado = prompt("Ingrese el nombre del producto:");
    let productoEncontrado = null;

    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].nombre === nombreBuscado) {
            productoEncontrado = inventario[i];
            break;
        }
    }


    const resultado = productoEncontrado ?? "no encontrado";

    if (resultado !== "no encontrado") {
        alert(
            ` PRODUCTO ENCONTRADO
Nombre: ${productoEncontrado.nombre}
Precio: ${productoEncontrado.precio}
Stock: ${productoEncontrado.stock}`
        );
    } else {
        alert("Producto no encontrado");
    }
}

//actualizar stock
function actualizarStock() {
    const nombre = prompt("Ingrese el nombre del producto:");
    let producto = null;

    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].nombre === nombre) {
            producto = inventario[i];
            break;
        }
    }

    if (!producto) {
        alert("Producto no encontrado");
        return;
    }

    const nuevoStock = Number(prompt("Ingrese el nuevo stock:"));

    if (nuevoStock >= 0) {
        producto.stock = nuevoStock;
        alert("Stock actualizado correctamente");
    } else {
        alert("Stock inválido");
    }
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



