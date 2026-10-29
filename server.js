const http = require(`node:http`);

const productos = [
    { id: 1, nombre: "Teclado", precio: 25000 },
    { id: 2, nombre: "Mouse", precio: 12000 },
];



const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:3000`);
    const ruta = url.pathname;

    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === `GET` && ruta === `/productos`) {
        const id = url.searchParams.get(`id`); //captar parámetros de la url

        if (id !== null) { //Chequea que haya id como parámetro, si no hay ninguno muestra todos los productos
            const producto = productos.find(p => p.id === Number(id));

            if (!producto) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: `Producto no encontrado` }));
                return;
            }

            res.statusCode = 200;
            res.end(JSON.stringify(producto));
            return;
        }
        res.statusCode = 200;
        res.end(JSON.stringify(productos));
        return;
    }

    if (req.method === `POST` && ruta === `/productos`) {
        let body = ``;

        req.on(`data`, chunk => {
            body += chunk;
        });

        req.on(`end`, () => {
            try {
                const datos = JSON.parse(body);
                if (datos === null || typeof datos !== 'object' || Array.isArray(datos)) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({
                        error: 'Se espera un objeto JSON con nombre y precio'
                    }));
                    return;
                }

                if (
                    typeof datos.nombre !== 'string' ||
                    datos.nombre.trim() === '' ||
                    typeof datos.precio !== 'number' ||
                    !Number.isFinite(datos.precio) ||
                    datos.precio <= 0
                ) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({
                        error: `Nombre y precio válido son obligatorios`
                    }));
                    return;
                }

                const nuevoProducto = {
                    id: Math.max(0, ...productos.map(p => p.id)) + 1,
                    nombre: datos.nombre.trim(),
                    precio: datos.precio
                }

                productos.push(nuevoProducto);

                res.statusCode = 201;
                res.end(JSON.stringify(nuevoProducto));
            } catch (error) {

                res.statusCode = 400;
                res.end(JSON.stringify({
                    error: `El cuerpo debe contener JSON válido`
                }));
            }
        });

        return;
    }

    if (req.method === 'PUT' && ruta === '/productos') {
        const id = Number(url.searchParams.get('id'));


        if (!url.searchParams.has('id') || !Number.isInteger(id) || id <= 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: 'Se requiere un ID válido'
            }));
            return;
        }

        const producto = productos.find(p => p.id === id);

        if (!producto) {
            res.statusCode = 404;
            res.end(JSON.stringify({
                error: 'Producto no encontrado'
            }));
            return;
        }

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            let datos;

            try {
                datos = JSON.parse(body);
                if (datos === null || typeof datos !== 'object' || Array.isArray(datos)) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({
                        error: 'Se espera un objeto JSON con nombre y precio'
                    }));
                    return;
                }
            } catch {
                res.statusCode = 400;
                res.end(JSON.stringify({
                    error: 'El cuerpo debe contener JSON válido'
                }));
                return;
            }

            if (
                typeof datos.nombre !== 'string' ||
                datos.nombre.trim() === '' ||
                typeof datos.precio !== 'number' ||
                !Number.isFinite(datos.precio) ||
                datos.precio <= 0
            ) {
                res.statusCode = 400;
                res.end(JSON.stringify({
                    error: 'Nombre y precio válido son obligatorios'
                }));
                return;
            }

            producto.nombre = datos.nombre.trim();
            producto.precio = datos.precio;

            res.statusCode = 200;
            res.end(JSON.stringify(producto));
        });
        return;
    }
    if (req.method === 'DELETE' && ruta === '/productos') {
        const id = Number(url.searchParams.get('id'));

        if (!url.searchParams.has('id') || !Number.isInteger(id) || id <= 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: 'Se requiere un ID válido'
            }));
            return;
        }

        const indice = productos.findIndex(p => p.id === id)

        if (indice === -1) {
            res.statusCode = 404;
            res.end(JSON.stringify({
                error: 'Producto no encontrado'
            }));
            return;
        }

        const [productoEliminado] = productos.splice(indice, 1);

        res.statusCode = 200;
        res.end(JSON.stringify({
            mensaje: 'Producto eliminado correctamente',
            producto: productoEliminado
        }));

        return;

    }



    res.statusCode = 404;
    res.end(JSON.stringify({ error: `Ruta no encontrada` }));











});

server.listen(3000, () => {
    console.log(`Servidor escuchando en http://localhost:3000`);
});