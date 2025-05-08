// Lista de pistas posibles
const hintOptions = [
    {
        action: (num, guess) => num % 2 === 0 ? 'El número es par.' : 'El número es impar.'
    },
    {
        action: (num, guess) => {
            if (isPrime(num)) {
                return 'El número es primo.';
            } else {
                const factors = factorize(num);
                const randomFactor = factors[Math.floor(Math.random() * factors.length)]; // Selecciona un factor aleatorio
                return `El número es múltiplo de ${randomFactor}.`; // Muestra un factor aleatorio
            }
        }
    },
    {
        action: (num, guess) => num > 500000 ? 'El número es mayor que 500,000.' : 'El número es menor o igual a 500,000.'
    },
    {
        action: (num, guess) => {
            const randomDigit = Math.floor(Math.random() * 10); // Genera un número aleatorio entre 0 y 9
            const count = num.toString().split('').filter(digit => digit === randomDigit.toString()).length; // Cuenta cuántas veces aparece el dígito
            
            if (count > 0) {
                return `El número contiene el dígito ${randomDigit} un total de ${count} veces.`;
            } else {
                return `El número no contiene el dígito ${randomDigit}.`;
            }
        }
    },
    {
        action: (num, guess) => {
            const digitSum = sumDigits(num);
            return `La suma de los dígitos es ${digitSum}.`;
        }
    },
    {
        action: (num, guess) => {
            const digitCount = num.toString().length; // Cuenta el número de dígitos
            return `El número tiene ${digitCount} dígitos.`;
        }
    },
    {
        action: (num, guess) => {
            if (guess < num) {
                return `El número buscado es mayor que ${guess}.`;
            } else if (guess > num) {
                return `El número buscado es menor que ${guess}.`;
            } else {
                return ''; // No se muestra nada si es igual
            }
        }
    },
    {
        action: (num, guess) => {
            const numStr = num.toString();
            const guessStr = guess.toString();
            let correctDigits = 0;

            // Compara los dígitos en la misma posición
            for (let i = 0; i < Math.min(numStr.length, guessStr.length); i++) {
                if (numStr[i] === guessStr[i]) {
                    correctDigits++;
                }
            }

            return `El número introducido (${guess}) tiene ${correctDigits} dígitos correctos en la misma posición.`;
        }
    },
    {
        action: (num, guess) => {
            const numStr = num.toString();
            const position = Math.floor(Math.random() * numStr.length); // Genera un número aleatorio entre 0 y la longitud del número
            const digit = numStr[position]; // Obtiene el dígito en la posición aleatoria
            let positionLabel;

            // Determina la etiqueta de posición
            if (position === numStr.length - 1) {
                positionLabel = 'último'; // Si es el último dígito
            } else {
                positionLabel = position === 0 ? 'primer' : position === 1 ? 'segundo' : position === 2 ? 'tercer' : position === 3 ? 'cuarto' : position === 4 ? 'quinto' : 'sexto'; // Otras posiciones
            }

            return `El ${positionLabel} dígito del número es ${digit}.`;
        }
    }
];

// Función que selecciona una pista aleatoria
function giveHints(guess) {
    let message = '';
    let attempts = 0; // Contador de intentos para evitar un bucle infinito

    // Intenta seleccionar una pista que no se haya dado
    while (message === '' && attempts < 40) { // Limitar a 10 intentos para evitar bucles infinitos
        const randomHint = hintOptions[Math.floor(Math.random() * hintOptions.length)];
        message = randomHint.action(numberToGuess, guess); // Pasa ambos argumentos

        // Verifica si la pista ya existe en el arreglo de hints
        if (message && hints.includes(message)) {
            message = ''; // Reinicia el mensaje si ya existe
        }
        attempts++;
    }

    // Agrega la pista al arreglo solo si no está vacía
    if (message) {
        hints.push(message);
    }
}

// Función para verificar si el número es primo
function isPrime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

// Función para sumar los dígitos de un número
function sumDigits(num) {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

function factorize(num) {
    let factors = [];
    let divisor = 2;

    // Divide el número por cada divisor posible
    while (num >= divisor) {
        if (num % divisor === 0) {
            factors.push(divisor);  // Si el divisor es un factor, lo añadimos a la lista
            num = num / divisor;  // Dividimos el número por el divisor
        } else {
            divisor++;  // Si no es un factor, probamos con el siguiente número
        }
    }

    return factors;  // Devolvemos los factores
}
