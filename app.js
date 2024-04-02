const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error interno del servidor');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (req.url === '/script.js') {
        fs.readFile(path.join(__dirname, 'script.js'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error interno del servidor');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(content);
            }
        });
    } else if (req.url === '/multiplicar' && req.method === 'POST') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            const jsonData = JSON.parse(data);
            const matriz1 = jsonData.matriz1;
            const matriz2 = jsonData.matriz2;
            const matrizResultado = multiplicarMatrices(matriz1, matriz2);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ resultado: matrizResultado }));
        });
    } else {
        res.writeHead(404);
        res.end('Página no encontrada');
    }
});

function multiplicarMatrices(matriz1, matriz2) {
    const filas1 = matriz1.length
    const columnas1 = matriz1[0].length
    const columnas2 = matriz2[0].length

    const matrizResultado = []
    for (let i = 0; i < filas1; i++){
        matrizResultado[i] = []
        for (let j = 0; j < columnas2; j++) { 
            matrizResultado[i][j] = 0
            for (let k = 0; k < columnas1; k++) {
                matrizResultado[i][j] += matriz1[i][k] * matriz2[k][j]
            }
        }
    }
   return matrizResultado
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto http://localhost:3000`)
});