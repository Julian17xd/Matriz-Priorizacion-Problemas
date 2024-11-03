const problemas = ["Problema A", "Problema B", "Problema C", "Problema D", "Problema E"];
let currentLetterIndex = 5; // Inicia en 5 

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

    select.addEventListener('change', calcularPromedio); // Añadir evento de cambio

    return select;
}

function crearFilaProblema(problema) {
    const fila = document.createElement("tr");
    fila.classList.add('main-row')

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

    // Añadir celda para el promedio
    const celdaPromedio = document.createElement("td");
    celdaPromedio.className = "promedio";
    fila.appendChild(celdaPromedio);

    return fila;
}

function calcularPromedio() {
    const filas = document.querySelectorAll("table tr");
    filas.forEach(fila => {
        const selects = fila.querySelectorAll("select");
        if (selects.length > 0) {
            let sum = 0;
            let count = 0;
            let sumIntervention = 0;
            let interventionCount = 0;
            let allSelected = true;

            selects.forEach((select, index) => {
                const value = parseInt(select.value);
                if (isNaN(value)) {
                    allSelected = false;
                } else {
                    if (index < 3) {  // Sumar los valores de las columnas 1, 2 y 3
                        sum += value;
                        count++;
                    } else {  // Sumar los valores de las columnas 4 y 5
                        sumIntervention += value;
                        interventionCount++;
                    }
                }
            });

            if (allSelected) {
                const promedioIntervention = (interventionCount > 0) ? (sumIntervention / interventionCount) : 0;
                const total = sum + promedioIntervention;

                let mensaje = '';
                let color = ''; // Variable para el color de fondo
                if (total >= 4 && total <= 5.32) { 
                    mensaje = 'Nvl 1 Priorización: A ' + total;
                    color = 'green'; 
                } else if (total >= 5.33 && total <= 6.65) { 
                    mensaje = 'Nvl 1 Priorización: B ' + total;
                    color = 'green'; 
                } else if (total >= 6.66 && total <= 7.99) { 
                    mensaje = 'Nvl 1 Priorización: C ' + total; 
                    color = 'green';
                } else if (total >= 8 && total <= 9.32) { 
                    mensaje = 'Nvl 2 priorización: A ' + total;
                    color = 'orange'; 
                } else if (total >= 9.33 && total <= 10.65) { 
                    mensaje = 'Nvl 2 priorización: B ' + total;
                    color = 'orange'; 
                } else if (total >= 10.66 && total <= 11.99) { 
                    mensaje = 'Nvl 2 priorización: C ' + total;
                    color = 'orange'; 
                } else if (total >= 12 && total <= 13.33) { 
                    mensaje = 'Nvl 3 priorización: A ' + total;
                    color = 'red'; 
                } else if (total >= 13.34 && total <= 14.67) { 
                    mensaje = 'Nvl 3 priorización: B ' + total;
                    color = 'red'; 
                } else if (total >= 14.68 && total <= 16) { 
                    mensaje = 'Nvl 3 priorización: C ' + total;
                    color = 'red'; 
                }

                const celdaPromedio = fila.querySelector(".promedio");
                if (celdaPromedio) {
                    celdaPromedio.textContent = mensaje;
                    celdaPromedio.style.backgroundColor = color; // Cambiar el color de fondo solo de la celda
                }
            } else {
                const celdaPromedio = fila.querySelector(".promedio");
                if (celdaPromedio) { // Si no todas las opciones están seleccionadas, limpiar el contenido
                    celdaPromedio.textContent = '';
                    celdaPromedio.style.backgroundColor = ''; // Restaurar el color de fondo original
                }
            }
        }
    });
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
    document.getElementById("deleteRowButton").addEventListener("click", function() {
        const tabla = document.getElementById("problemasTabla");
        const filas = tabla.querySelectorAll("tr.main-row");
        if (filas.length > 1) { // Asegurarse de que haya al menos una fila para no eliminar la primera fila
            const ultimaFila = filas[filas.length - 1];
            ultimaFila.remove();
            calcularPromedio(); // Recalcular el promedio después de eliminar la fila
        }
    });

});
