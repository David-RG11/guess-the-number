// Lista de pistas posibles
const hintOptions = [
    {
        action: (num, guess) => {
            return {
                message: num % 2 === 0 ? 'El número es par.' : 'El número es impar.',
                isCorrect: (value) => isNaN(value) ? false : (value % 2 === 0) === (num % 2 === 0) // Comparar paridad
            };
        }
    },
    {
        action: (num, guess) => {
            if (isPrime(num)) {
                return {
                    message: 'El número es primo.',
                    isCorrect: (value) => isPrime(value) // Comprobar si el guess es primo
                };
            } else {
                const factors = factorize(num);
                const randomFactor = factors[Math.floor(Math.random() * factors.length)]; // Selecciona un factor aleatorio
                return {
                    message: `El número es múltiplo de ${randomFactor}.`, // Muestra un factor aleatorio
                    isCorrect: (value) => value % randomFactor === 0 // Comprobar si el guess es múltiplo del factor aleatorio 
                };
            }
        }
    },

    {
        action: (num, guess) => {
            const activeButton = document.querySelector('button.active');
            if (activeButton) {
                const selectedRange = activeButton.id;

                if (selectedRange === 'range1000') {
                    return {
                        message: num > 500 ? 'El número es mayor que 500.' : 'El número es menor o igual a 500.',
                        isCorrect: (value) => (value > 500) === (num > 500) // Comparar si ambos son mayores que 500
                    };
                } else if (selectedRange === 'range1000000') {
                    return {
                        message: num > 500000 ? 'El número es mayor que 500,000.' : 'El número es menor o igual a 500,000.',
                        isCorrect: (value) => (value > 500000) === (num > 500000) // Comparar si ambos son mayores que 500,000
                    };
                }
            }
        },
    },
    {
        action: (num, guess) => {
            const digitSum = sumDigits(num); // Calcular la suma de los dígitos del número original

            // Definir la función isCorrect que compara el guess con digitSum
            const isCorrect = (value) => {
                return sumDigits(value) === digitSum; // Devuelve true si el valor coincide con la suma de los dígitos
            };

            return {
                message: `La suma de los dígitos es ${digitSum}.`,
                isCorrect: isCorrect // Devuelve la función isCorrect
            };
        }
    },
    {
        action: (num, guess) => {
            const digitCount = num.toString().length;
            return {
                message: `El número tiene ${digitCount} dígitos.`,
                isCorrect: (value) => isNaN(value) ? false :   value.toString().length === digitCount // Comparar el número de dígitos
            };
        }
    },
    {
        action: (num, guess) => {
            return {
                message: guess < num ? `El número buscado es mayor que ${guess}.` : `El número buscado es menor que ${guess}.`,
                isCorrect: (value) => value==guess? false : (value > guess) === (guess < num) // Comparar si ambos son mayores o menores
            };
        }
    },
    {
        action: (num, guess) => {
            const numStr = num.toString();
            const guessStr = guess.toString();
            let correctDigits = 0;
            let correctDigits2 = 0;

            // Compara los dígitos en la misma posición
            for (let i = 0; i < Math.min(numStr.length, guessStr.length); i++) {
                if (numStr[i] === guessStr[i]) {
                    correctDigits++;
                }
            }

            return { message: `El número introducido (${guess}) tiene ${correctDigits} dígitos correctos en la misma posición.`,
                isCorrect: (value) => {
                    const valStr = value.toString();
                    correctDigits2=0;
                    for (let i = 0; i < Math.min(valStr.length, guessStr.length); i++) {
                    if (valStr[i] === guessStr[i]) {
                        
                        correctDigits2++; 
                    }
                }
                
                   return correctDigits2 == correctDigits;
                   
                
            }
            }
        
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

            return { message: `El ${positionLabel} dígito del número es ${digit}.`,
                isCorrect: (value) => { 
                    if (positionLabel === 'último') {
                        return value.toString()[value.toString().length - 1] === digit;
                    }else{
                    return value.toString()[position] === digit; // Compara el dígito en la posición aleatoria
                    }
                }
            }
        }
    }
];

let hints = []; // Lista de mensajes de pistas
let hintsCheck = []; // Lista para almacenar el estado de corrección de las pistas

function giveHints(guess) {
    let attempts = 0; // Contador de intentos para evitar un bucle infinito

    // Intenta seleccionar una pista que no se haya dado
    while (attempts < 40) { // Limitar a 40 intentos para evitar bucles infinitos
        const randomHint = hintOptions[Math.floor(Math.random() * hintOptions.length)];
        const hintResult = randomHint.action(numberToGuess, guess); // Obtener el resultado de la pista

        // Verifica si la pista ya existe en el arreglo de hints
        if (hintResult.message && !hints.some(hint => hint === hintResult.message)) {
            hints.push(hintResult.message); // Almacena el mensaje de la pista
            hintsCheck.push(hintResult.isCorrect); // Almacena el estado de corrección
            break; // Salir del bucle si se ha encontrado una pista válida
        }
        attempts++;
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
