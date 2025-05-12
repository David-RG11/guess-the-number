// Escuchar el evento de cambio en el selector de herramientas
document.getElementById('tools').addEventListener('change', function() {
    const selectedTool = this.value;

    // Ocultar todas las secciones de herramientas
    const toolSections = document.querySelectorAll('.tool-section');
    toolSections.forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    if (selectedTool) {
        document.getElementById(selectedTool).style.display = 'block';
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

// Ajustar el evento de clic en el botón de múltiplos para incluir el encabezado dinámico
document.getElementById('multiplesButton').addEventListener('click', function() {
    const multiplesInput = parseInt(document.getElementById('multiplesInput').value);
    const multiplesStart = parseInt(document.getElementById('multiplesStart').value);

    if (isNaN(multiplesInput) || multiplesInput <= 0 || isNaN(multiplesStart) || multiplesStart <= 0) {
        document.getElementById('multiplesResult').innerText = 'Por favor, introduce números válidos mayores que 0.';
        return;
    }

    // Ajustar el cálculo de los múltiplos para que comiencen desde el menor múltiplo de multiplesInput mayor o igual a multiplesStart
    const startValue = Math.ceil(multiplesStart / multiplesInput) * multiplesInput;
    const multiples = Array.from({ length: 100 }, (_, i) => startValue + multiplesInput * i);

    // Formatear la lista de múltiplos con la coma dentro del span y añadir "..." al final
    const formattedMultiples = multiples.map((num, index) => `<span>${num}${index < multiples.length - 1 ? ',' : ''}</span>`).join('') + '<span>...</span>';

    // Actualizar el encabezado dinámico y la lista de múltiplos
    document.getElementById('multiplesResult').innerHTML = `<strong>Múltiplos de ${multiplesInput} desde ${multiplesStart}:</strong><br>${formattedMultiples}`;
});

//! CALCULADORA

let currentNumber = '';
let firstOperand = null;
let operator = null;
let shouldResetScreen = false;

const calcInput = document.getElementById('calcInput');
const calcResult = document.getElementById('calcResult');

// Escuchadores para botones numéricos
document.querySelectorAll('.numButton').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

// Escuchadores para operadores
document.querySelectorAll('.opButton').forEach(button => {
    button.addEventListener('click', () => setOperation(button.textContent));
});

// Botón igual
document.getElementById('equalsButton').addEventListener('click', calculate);

// Botón limpiar
document.getElementById('clearButton').addEventListener('click', clear);

function appendNumber(num) {
    if (shouldResetScreen) {
        calcInput.value = '';
        shouldResetScreen = false;
    }
    if (num === '0' && calcInput.value === '0') return;
    if (num !== '0' && calcInput.value === '0') calcInput.value = '';
    
    // Verificar si el número actual ya contiene un punto
    if (num === '.' && calcInput.value.includes('.')) return; // No permitir más de un punto

    calcInput.value += num;
    currentNumber = calcInput.value;
}

function setOperation(op) {
    
  if (operator !== null && currentNumber === '') {
        operator = op; // Cambiar el operador
        calcResult.textContent = `${firstOperand} ${operator}`; // Actualizar la visualización
        return; // Salir de la función
    }

    if (currentNumber === '') currentNumber = '0'; // No hacer nada si no hay número actual

    // Convertir currentNumber a número, interpretando '.' como '0'

    if (operator !== null) {
        // Verificar si se intenta dividir por cero
        if (operator === '/' && currentNumber === '0') {
            document.getElementById('calcResult').innerText = 'Error: No se puede dividir por 0.';
            calcInput.value = `${firstOperand}`;
            currentNumber = calcInput.value;
            operator = null;
            return; // Salir de la función sin realizar el cálculo
        }
        calculate(); // Realiza el cálculo si ya hay un operador
    }   
    
    firstOperand = parseFloat(currentNumber === '.' ? '0' : currentNumber);


    operator = op;
    shouldResetScreen = true;
    calcResult.textContent = `${firstOperand} ${operator}`;
    currentNumber = '';
}

function calculate() {
    if (operator === null || firstOperand === null) return;

    // Convertir currentNumber a número, interpretando '.' como '0'
    const secondOperand = parseFloat(currentNumber === '.' ? '0' : currentNumber);
    let result;

    // Verificar si se intenta dividir por cero
    if (operator === '/' && secondOperand === 0) {
        document.getElementById('calcResult').innerText = 'Error: No se puede dividir por 0.';
        calcInput.value = `${firstOperand}`;
        currentNumber = calcInput.value;
        operator = null;
        return; // Salir de la función sin realizar el cálculo
    }

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand; // Ya hemos verificado que secondOperand no es 0
            break;
        default:
            return;
    }

    // Mostrar el resultado en el campo de entrada
    calcInput.value = result;
    currentNumber= result;
    calcResult.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
    operator = null;
    firstOperand = result;
    shouldResetScreen = true;
}

function clear() {
    calcInput.value = '0';
    calcResult.textContent = '';
    currentNumber = '';
    firstOperand = null;
    operator = null;
    shouldResetScreen = false;
}

// Manejar entrada desde teclado
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (['+', '-', '*', '/'].includes(e.key)) setOperation(e.key);
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Escape') clear();
});

// Función para calcular números primos
function calculatePrimes(start) {
    const primes = [];
    let num = start;

    while (primes.length < 100) {
        if (isPrime(num)) {
            primes.push(num);
        }
        num++;
    }

    return primes;
}

// Verificar si un número es primo
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Manejar el evento del botón de calcular números primos
document.getElementById('primesButton').addEventListener('click', function() {
    const primesStart = parseInt(document.getElementById('primesStart').value);

    if (isNaN(primesStart) || primesStart < 1 || primesStart > 1000000) {
        document.getElementById('primesResult').innerText = 'Por favor, introduce un número válido entre 1 y 1,000,000.';
        return;
    }

    const primes = calculatePrimes(primesStart);

    // Formatear la lista de números primos con la coma dentro del span y añadir "..." al final
    const formattedPrimes = primes.map((num, index) => `<span>${num}${index < primes.length - 1 ? ',' : ''}</span>`).join('') + '<span>...</span>';

    // Actualizar el encabezado dinámico y la lista de números primos
    document.getElementById('primesResult').innerHTML = `<strong>Primos desde ${primesStart}:</strong><br>${formattedPrimes}`;
});