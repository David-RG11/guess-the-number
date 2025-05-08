// Genera un número aleatorio basado en el rango seleccionado
function generateRandomNumber() {
    const range = parseInt(document.getElementById('numberRange').value);
    return Math.floor(Math.random() * range) + 1; // Genera un número entre 1 y el rango seleccionado
}

// Inicializa el número a adivinar
let numberToGuess = generateRandomNumber();
let hints = [];

// Escuchar el evento de clic en el botón de adivinanza
document.getElementById('submit').addEventListener('click', function() {
    const guess = parseInt(document.getElementById('guess').value);
    let message = '';

    // Validación del número introducido
    if (guess < 1 || guess > parseInt(document.getElementById('numberRange').value)) {
        message = `Por favor, introduce un número entre 1 y ${document.getElementById('numberRange').value}.`;
    } else if (guess === numberToGuess) {
        message = '¡Correcto! Has adivinado el número.';
    } else {
        message = 'Incorrecto. Intenta de nuevo.';
        giveHints(guess);  // Llamada a la función para dar pistas
    }

    document.getElementById('message').innerText = message;

    // Limpiar la lista de pistas antes de agregar nuevas
    const hintsList = document.getElementById('hints');
    hintsList.innerHTML = ''; // Limpiar la lista actual

    // Agregar cada pista como un nuevo elemento de lista
    hints.forEach(hint => {
        const listItem = document.createElement('li'); // Crear un nuevo elemento de lista
        listItem.textContent = hint; // Establecer el texto del elemento de lista
        hintsList.appendChild(listItem); // Agregar el elemento de lista al contenedor
    });

    // Mostrar solo la última pista
    if (hints.length > 0) {
        document.getElementById('last-hint').innerText = hints[hints.length - 1]; // Mostrar la última pista
    } else {
        document.getElementById('last-hint').innerText = ''; // Limpiar si no hay pistas
    }
});

// Escuchar el evento de clic en el botón de factorización
document.getElementById('factorButton').addEventListener('click', function() {
    const factorInput = parseInt(document.getElementById('factorInput').value);
    const factors = factorize(factorInput);
    document.getElementById('factorResult').innerText = `Factores: ${factors.join(', ')}`;
});

// Escuchar el evento de clic en el botón de suma de cifras
document.getElementById('sumButton').addEventListener('click', function() {
    const sumInput = parseInt(document.getElementById('sumInput').value);
    const sum = sumDigits(sumInput);
    document.getElementById('sumResult').innerText = `Suma de cifras: ${sum}`;
});

// Escuchar los eventos de clic en los botones de la calculadora
document.getElementById('addButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('calcInput1').value);
    const num2 = parseFloat(document.getElementById('calcInput2').value);
    const result = num1 + num2;
    document.getElementById('calcResult').innerText = `Resultado: ${result}`;
});

document.getElementById('subtractButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('calcInput1').value);
    const num2 = parseFloat(document.getElementById('calcInput2').value);
    const result = num1 - num2;
    document.getElementById('calcResult').innerText = `Resultado: ${result}`;
});

document.getElementById('multiplyButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('calcInput1').value);
    const num2 = parseFloat(document.getElementById('calcInput2').value);
    const result = num1 * num2;
    document.getElementById('calcResult').innerText = `Resultado: ${result}`;
});

document.getElementById('divideButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('calcInput1').value);
    const num2 = parseFloat(document.getElementById('calcInput2').value);
    if (num2 !== 0) {
        const result = num1 / num2;
        document.getElementById('calcResult').innerText = `Resultado: ${result}`;
    } else {
        document.getElementById('calcResult').innerText = 'Error: División por cero.';
    }
});

// Escuchar el evento de cambio en el rango de números
document.getElementById('numberRange').addEventListener('change', function() {
    numberToGuess = generateRandomNumber(); // Generar un nuevo número al cambiar el rango
});
