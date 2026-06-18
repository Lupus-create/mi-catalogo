const urlSheet = "https://docs.google.com/spreadsheets/d/13Ey_6OvygoJms0PPHQtWLjJSIQuhXaWvXWKIQFZOOS8/gviz/tq?tqx=out:csv";
const numeroWhatsApp = "584127484447"; // <-- Pon aquí tu número real (ej: 584121234567)


async function cargarProductos() {
    try {
        const respuesta = await fetch(urlSheet);
        const texto = await respuesta.text();
        const filas = texto.split('\n').slice(1); 
        const contenedor = document.getElementById('contenedor-productos');
        contenedor.innerHTML = ""; 

        filas.forEach(fila => {
            const columnas = fila.split('","').map(c => c.replace(/"/g, ''));
            if(columnas.length >= 4) {
                const producto = columnas[0];
                const precio = columnas[1];
                const imagen = columnas[2];
                const stock = parseInt(columnas[3]);

                if (stock > 0) {
                    const tarjeta = document.createElement('div');
                    tarjeta.className = 'tarjeta-producto';
                    tarjeta.innerHTML = `
                        <img src="${imagen}" alt="${producto}">
                        <h3>${producto}</h3>
                        <p class="precio">$${precio}</p>
                    `;
                    tarjeta.onclick = () => {
                        const mensaje = encodeURIComponent(`Hola, estoy interesado en el producto: ${producto} ($${precio}). ¿Está disponible?`);
                        window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
                    };
                    contenedor.appendChild(tarjeta);
                }
            }
        });
    } catch (error) {
        console.error("Error cargando los productos:", error);
    }
}
cargarProductos();
