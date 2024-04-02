function crearMatrices() {
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);
    let columnas2 = parseInt(document.getElementById("columnas2").value); // Nuevo campo de entrada

    if (isNaN(filas) || isNaN(columnas) || isNaN(columnas2) || filas <= 0 || columnas <= 0 || columnas2 <= 0) {
        alert("Ingrese valores numéricos válidos mayores que cero.");
        return;
    }

    let matriz1HTML = "<h2>Matriz 1:</h2>" + crearInputMatriz("matriz1", filas, columnas);
    let matriz2HTML = "<h2>Matriz 2:</h2>" + crearInputMatriz("matriz2", columnas, columnas2);

    document.getElementById("matrices").innerHTML = matriz1HTML + matriz2HTML;
}

function crearInputMatriz(nombre, filas, columnas) {
    let inputHTML = "<table>";
    for (let i = 0; i < filas; i++) {
        inputHTML += "<tr>";
        for (let j = 0; j < columnas; j++) {
            inputHTML += "<td><input type='text' id='" + nombre + i + j + "' style='width: 100px; height: 25px; text-align: center;'></td>";
        }
        inputHTML += "</tr>";
    }
    inputHTML += "</table>";
    return inputHTML;
}

function obtenerMatriz(nombre, filas, columnas) {
    let matriz = [];
    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = parseFloat(document.getElementById(nombre + i + j).value) || 0;
        }
    }
    return matriz;
}

function multiplicarMatrices(){
    let filas1 = parseInt(document.getElementById("filas").value);
    let columnas1 = parseInt(document.getElementById("columnas").value);
    let columnas2 = parseInt(document.getElementById("columnas2").value); 

    let matriz1 = obtenerMatriz("matriz1", filas1, columnas1);
    let matriz2 = obtenerMatriz("matriz2", columnas1, columnas2);

    fetch('/multiplicar', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({matriz1: matriz1, matriz2:matriz2 })
    })
    .then(response => response.json())
    .then(data => mostrarMatrizResultado(data.resultado))
    .catch(error => console.error('Error al multiplicar las matrices:', error))
}

function mostrarMatrizResultado(matriz) {
    let resultadoHTML = "<h2>Matriz Resultante:</h2><table>";
    let filas = matriz.length;
    let columnas = matriz[0].length;

    for (let i = 0; i < filas; i++) {
        resultadoHTML += "<tr>";
        for (let j = 0; j < columnas; j++) {
            resultadoHTML += "<td><input type='text' value='" + matriz[i][j] + "' style='width: 100px; height: 25px; text-align: center;'</td>";
        }
        resultadoHTML += "</tr>";
    }
    resultadoHTML += "</table>";

    document.getElementById("resultado").innerHTML = resultadoHTML;
}

function limpiarMatriz() {
    document.getElementById("filas").value = "";
    document.getElementById("columnas").value = "";
    document.getElementById("columnas2").value = "";
    document.getElementById("matrices").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}