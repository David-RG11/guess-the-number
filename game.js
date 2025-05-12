// Genera un número aleatorio basado en el rango seleccionado
function generateRandomNumber(range) {
    return Math.floor(Math.random() * range) + 1; // Genera un número entre 1 y el rango seleccionado
}

// Inicializa el número a adivinar
let numberToGuess = generateRandomNumber(1000); // Inicializa con el rango de 1 a 1000
//let hintsCheck = []; // Asegúrate de que esto esté presente
//let hints = [];

// Escuchar el evento de clic en el botón de rango 1-1000
document.getElementById('range1000').addEventListener('click', function() {
    numberToGuess = generateRandomNumber(1000); // Generar un nuevo número en el rango de 1 a 1000
    document.getElementById('guess').max = 1000; // Actualizar el máximo del input

    // Cambiar el estado activo de los botones
    this.classList.add('active'); // Agregar clase activa al botón 1-1000
    document.getElementById('range1000000').classList.remove('active'); // Quitar clase activa del botón 1-1,000,000

    // Limpiar las pistas
    hints = []; // Reiniciar el arreglo de pistas
    hintsCheck = [];
    const hintsList = document.getElementById('hints');
    hintsList.innerHTML = ''; // Limpiar la lista actual de pistas
});

// Escuchar el evento de clic en el botón de rango 1-1,000,000
document.getElementById('range1000000').addEventListener('click', function() {
    numberToGuess = generateRandomNumber(1000000); // Generar un nuevo número en el rango de 1 a 1,000,000
    document.getElementById('guess').max = 1000000; // Actualizar el máximo del input

    // Cambiar el estado activo de los botones
    this.classList.add('active'); // Agregar clase activa al botón 1-1,000,000
    document.getElementById('range1000').classList.remove('active'); // Quitar clase activa del botón 1-1000

    // Limpiar las pistas
    hints = []; // Reiniciar el arreglo de pistas
    hintsCheck = [];
    const hintsList = document.getElementById('hints');
    hintsList.innerHTML = ''; // Limpiar la lista actual de pistas
});

// Escuchar el evento de clic en el botón de adivinanza
document.getElementById('submit').addEventListener('click', handleGuess);

function handleGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    let message = '';

    // Validación del número introducido
    if (guess < 1 || guess > parseInt(document.getElementById('guess').max)) {
        message = `Por favor, introduce un número entre 1 y ${document.getElementById('guess').max}.`;
    } else if (isNaN(guess)) {
        message = 'Por favor, introduce un número.';
    }
    
    // Asegurar que el evento de clic se maneje correctamente y las variables se reinicien
    else if (guess === numberToGuess) {
        message = '¡Enhorabuena! Has adivinado el número.';

        // Limpiar las pistas y reiniciar las variables
        document.getElementById('hints').innerHTML = ''; // Limpiar las pistas
        document.getElementById('last-hint').innerText = ''; // Limpiar la última pista
        hints = []; // Reiniciar el arreglo de pistas
        hintsCheck = [];

        // Cambiar el texto y funcionalidad del botón de enviar
        const submitButton = document.getElementById('submit');
        submitButton.textContent = 'Generar nuevo número';
        submitButton.replaceWith(submitButton.cloneNode(true)); // Reemplazar el botón para eliminar todos los eventos

        const newSubmitButton = document.getElementById('submit');
        newSubmitButton.addEventListener('click', function generateNewNumber() {
            numberToGuess = generateRandomNumber(parseInt(document.getElementById('guess').max));
            document.getElementById('message').innerText = 'Se ha generado un nuevo número. ¡Intenta adivinarlo!';
            document.getElementById('hints').innerHTML = ''; // Limpiar las pistas
            document.getElementById('last-hint').innerText = ''; // Limpiar la última pista
            newSubmitButton.textContent = 'Enviar';
            newSubmitButton.replaceWith(newSubmitButton.cloneNode(true)); // Reemplazar el botón nuevamente
            document.getElementById('submit').addEventListener('click', handleGuess);
        });
    } else {
        message = 'Incorrecto. Intenta de nuevo.';
        giveHints(guess);  // Llamada a la función para dar pistas
    }

    document.getElementById('message').innerText = message;

    // Limpiar la lista de pistas antes de agregar nuevas
    const hintsList = document.getElementById('hints');
    hintsList.innerHTML = ''; // Limpiar la lista actual

    // Agregar cada pista como un nuevo elemento de lista
    hints.forEach((hint, index) => {
        const listItem = document.createElement('li'); // Crear un nuevo elemento de lista

        // Usar hint directamente como el mensaje
        const message = hint; // Asumimos que hint es el mensaje
        const isCorrect = hintsCheck[index](guess); // Llamar a la función isCorrect correspondiente

        listItem.textContent = message; // Establecer el texto del elemento de lista
        listItem.style.color = isCorrect ? 'green' : 'red'; // Cambiar el color según si es correcta
        hintsList.appendChild(listItem); // Agregar el elemento de lista al contenedor
    });

    // Mostrar solo la última pista
    if (hints.length > 0) {
        document.getElementById('last-hint').innerText = hints[hints.length - 1]; // Mostrar la última pista
    } else {
        document.getElementById('last-hint').innerText = ''; // Limpiar si no hay pistas
    }
    

}

document.getElementById('guess').addEventListener('input', function() {
    const guess = parseInt(this.value); // Obtener el valor actual del input
    const hintsList = document.getElementById('hints');
    
    // Limpiar la lista actual de pistas
    hintsList.innerHTML = '';

    // Verificar cada pista y actualizar el color
    hints.forEach((hint, index) => {
        const listItem = document.createElement('li'); // Crear un nuevo elemento de lista

        // Usar hint directamente como el mensaje
        const message = hint; // Asumimos que hint es el mensaje
        const isCorrect = hintsCheck[index](guess); // Llamar a la función isCorrect correspondiente

        listItem.textContent = message; // Establecer el texto del elemento de lista
        listItem.style.color = isCorrect ? 'green' : 'red'; // Cambiar el color según si es correcta
        hintsList.appendChild(listItem); // Agregar el elemento de lista al contenedor
    });
});
