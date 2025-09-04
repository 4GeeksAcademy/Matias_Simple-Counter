import React from 'react';
import PropTypes from 'prop-types';

// Componente para mostrar un solo dígito
const Digit = ({ number }) => {
    return <div className="digit">{number}</div>;
};

Digit.propTypes = {
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

// Componente principal del contador
export const SecondsCounter = (props) => {
    // Formatea el número total de segundos a una cadena de 6 dígitos (ej: 12 -> "000012")
    const sixDigitString = props.seconds.toString().padStart(6, '0');

    return (
        <div className="counter-container">
            <div className="clock">
                <div className="icon">
                    <i className="far fa-clock"></i>
                </div>
                <Digit number={sixDigitString[0]} />
                <Digit number={sixDigitString[1]} />
                <Digit number={sixDigitString[2]} />
                <Digit number={sixDigitString[3]} />
                <Digit number={sixDigitString[4]} />
                <Digit number={sixDigitString[5]} />
            </div>

            <div className="controls">
                <h4>Controles del Contador</h4>
                <button onClick={props.handleResume} className="btn btn-success">Continuar</button>
                <button onClick={props.handleStop} className="btn btn-danger">Detener</button>
                <button onClick={props.handleReset} className="btn btn-warning">Reiniciar</button>
            </div>

            <div className="settings">
                <h4>Configuraciones</h4>
                <div className="input-group mb-3">
                    <input type="number" id="countdownInput" className="form-control" placeholder="Iniciar cuenta regresiva desde..." />
                    <button onClick={props.handleSetCountdown} className="btn btn-primary">Empezar</button>
                </div>
                <div className="input-group">
                    <input type="number" id="alertInput" className="form-control" placeholder="Alertar a los X segundos..." />
                    <button onClick={props.handleSetAlert} className="btn btn-info">Fijar Alerta</button>
                </div>
            </div>
        </div>
    );
};

SecondsCounter.propTypes = {
    seconds: PropTypes.number.isRequired,
    handleStop: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    handleResume: PropTypes.func.isRequired,
    handleSetCountdown: PropTypes.func.isRequired,
    handleSetAlert: PropTypes.func.isRequired
};