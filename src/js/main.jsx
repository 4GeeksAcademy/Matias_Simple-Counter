import React from 'react';
import ReactDOM from 'react-dom/client';

// Importa los estilos y el componente
import "../styles/index.css";
import { SecondsCounter } from './component/SecondsCounter.jsx';

// Variables para manejar el estado del contador
let counter = 0;
let intervalId = null;
let isRunning = true;
let alertTime = null;

// Funciones de control
const stopCounter = () => {
    if (isRunning) {
        console.log("Contador detenido.");
        clearInterval(intervalId);
        isRunning = false;
    }
};

const resumeCounter = () => {
    if (!isRunning) {
        console.log("Contador reanundado.");
        intervalId = setInterval(renderApp, 1000);
        isRunning = true;
    }
};

const resetCounter = () => {
    console.log("Contador reiniciado.");
    stopCounter(); // Detiene el contador actual
    counter = 0;   // Reinicia el valor
    alertTime = null; // Limpia la alerta
    resumeCounter(); // Inicia de nuevo
};

const setCountdown = () => {
    stopCounter();
    const startTime = parseInt(document.querySelector("#countdownInput").value, 10);
    if (!isNaN(startTime) && startTime > 0) {
        console.log(`Iniciando cuenta regresiva desde ${startTime}`);
        counter = startTime;
        // Inicia un intervalo que descuenta
        intervalId = setInterval(() => {
            renderApp();
            counter--;
            if (counter < 0) {
                stopCounter();
                alert("¡La cuenta regresiva ha terminado!");
                resetCounter();
            }
        }, 1000);
        isRunning = true;
    } else {
        alert("Por favor, ingresa un número válido para la cuenta regresiva.");
    }
};

const setAlert = () => {
    const time = parseInt(document.querySelector("#alertInput").value, 10);
    if (!isNaN(time) && time > 0) {
        alertTime = time;
        console.log(`Alerta configurada para los ${alertTime} segundos.`);
        alert(`Alerta configurada para cuando el contador llegue a ${alertTime} segundos.`);
    } else {
        alert("Por favor, ingresa un número válido para la alerta.");
    }
};

// Obtenemos el elemento root del HTML
const root = ReactDOM.createRoot(document.getElementById('app'));

// Función principal que se ejecuta cada segundo
const renderApp = () => {
    // Comprueba si se alcanzó el tiempo de la alerta
    if (alertTime !== null && counter === alertTime) {
        alert(`¡Alerta! Se han alcanzado los ${alertTime} segundos.`);
        alertTime = null; // Resetea la alerta para que no se muestre de nuevo
    }

    // Renderiza el componente con los valores y funciones actuales
    root.render(
        <SecondsCounter
            seconds={counter}
            handleStop={stopCounter}
            handleReset={resetCounter}
            handleResume={resumeCounter}
            handleSetCountdown={setCountdown}
            handleSetAlert={setAlert}
        />
    );

    // Solo incrementa si no estamos en modo cuenta regresiva (manejada por su propio intervalo)
    if (isRunning && !document.querySelector("#countdownInput").value) {
       counter++;
    }
};

// Inicia el contador por primera vez
intervalId = setInterval(renderApp, 1000);