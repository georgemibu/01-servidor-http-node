# Servidor HTTP con Node.js

Primer proyecto de backend: un servidor HTTP desarrollado con Node.js y sus módulos nativos, sin utilizar frameworks externos.

## Funcionalidades

- Consultar todos los productos.
- Consultar un producto por su ID.
- Crear productos.
- Modificar productos existentes.
- Eliminar productos.
- Validar los datos recibidos.
- Responder con códigos de estado HTTP apropiados.

## Tecnologías

- Node.js
- Módulo nativo `node:http`
- JavaScript
- Postman para probar los endpoints

## Requisitos

- Tener Node.js instalado.
- Tener Postman u otra herramienta para enviar solicitudes HTTP.

## Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir una terminal en la carpeta del proyecto.
3. Ejecutar:

   ```bash
   node server.js
   ```

4. El servidor estará disponible en:

   `http://localhost:3000`

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/productos` | Obtener todos los productos |
| GET | `/productos?id=1` | Obtener un producto por ID |
| POST | `/productos` | Crear un producto |
| PUT | `/productos?id=1` | Modificar un producto |
| DELETE | `/productos?id=1` | Eliminar un producto |

## Ejemplo de creación

Enviar una solicitud `POST` a `/productos` con este cuerpo JSON:

```json
{
  "nombre": "Monitor",
  "precio": 180000
}
```

## Limitaciones actuales

Los productos se almacenan en memoria. Por eso, los cambios se pierden al reiniciar el servidor.

El proyecto no utiliza todavía una base de datos ni un framework web.

## Objetivo de aprendizaje

Comprender los fundamentos de HTTP, los métodos de solicitud, los códigos de estado, el manejo de JSON y la construcción de una API básica con Node.js.