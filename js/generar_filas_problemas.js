const problemas = ["Problema A", "Problema B", "Problema C", "Problema D", "Problema E"];
let currentLetterIndex = 5; // Inicia en 5 porque ya tenemos A-E

const opciones = [
    { value: "", text: "Seleccione..", disabled: true, selected: true },
    { value: "1", text: "1" },
    { value: "2", text: "2" },
    { value: "3", text: "3" },
    { value: "4", text: "4" }
];

function crearSelect() {
    const select = document.createElement("select");

    opciones.forEach(opcion => {
        const option = document.createElement("option");
        option.value = opcion.value;
        option.textContent = opcion.text;
        if (opcion.disabled) option.disabled = true;
        if (opcion.selected) option.selected = true;
        select.appendChild(option);
    });

    return select;
}

function crearFilaProblema(problema) {
    const fila = document.createElement("tr");

    // Crear celda de textarea
    const celdaTextarea = document.createElement("td");
    const textarea = document.createElement("textarea");
    textarea.placeholder = problema;
    celdaTextarea.appendChild(textarea);
    fila.appendChild(celdaTextarea);

    // Crear celdas de select
    for (let i = 0; i < 3; i++) {
        const celdaSelect = document.createElement("td");
        celdaSelect.className = "padding-none";
        const tablaInterna = document.createElement("table");
        const filaInterna = document.createElement("tr");
        const celdaInterna = document.createElement("td");
        const select = crearSelect();
        celdaInterna.appendChild(select);
        filaInterna.appendChild(celdaInterna);
        tablaInterna.appendChild(filaInterna);
        celdaSelect.appendChild(tablaInterna);
        fila.appendChild(celdaSelect);
    }

    // Crear celda compleja con dos selects
    const celdaCompleja = document.createElement("td");
    celdaCompleja.className = "padding-none";
    const tablaInterna = document.createElement("table");
    const filaInterna = document.createElement("tr");

    for (let i = 0; i < 2; i++) {
        const celdaInterna = document.createElement("td");
        celdaInterna.className = "padding-none";
        const tablaMasInterna = document.createElement("table");
        const filaMasInterna = document.createElement("tr");
        const celdaMasInterna = document.createElement("td");
        const select = crearSelect();
        celdaMasInterna.appendChild(select);
        filaMasInterna.appendChild(celdaMasInterna);
        tablaMasInterna.appendChild(filaMasInterna);
        celdaInterna.appendChild(tablaMasInterna);
        filaInterna.appendChild(celdaInterna);
    }

    tablaInterna.appendChild(filaInterna);
    celdaCompleja.appendChild(tablaInterna);
    fila.appendChild(celdaCompleja);

    // Añadir celda vacía
    const celdaVacia = document.createElement("td");
    fila.appendChild(celdaVacia);

    return fila;
}

document.addEventListener("DOMContentLoaded", function() {
    const tabla = document.querySelector("table");

    problemas.forEach(problema => {
        const fila = crearFilaProblema(problema);
        tabla.appendChild(fila);
    });

    const boton = document.getElementById("addRowButton");
    boton.addEventListener("click", function() {
        if (currentLetterIndex < 26) { // Limita a 26 letras del abecedario
            const nuevaLetra = String.fromCharCode(65 + currentLetterIndex); // Convierte el índice a la letra correspondiente
            const nuevaFila = crearFilaProblema(`Problema ${nuevaLetra}`);
            tabla.appendChild(nuevaFila);
            currentLetterIndex++;
        } else {
            alert("Has alcanzado el límite del alfabeto.");
        }
    });
});
