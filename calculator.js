const display = document.getElementById('display');
let numeroActual = '';
let numeroAnterior = '';
let operacion = null;

const botonesNumeros = document.querySelectorAll('.numbers, .comma');
const botonesOperaciones = document.querySelectorAll('.sing');
const botonIgual = document.querySelector('.equals');
const botonBorrar = document.querySelector('.clear');
const botonNegativo = document.querySelector('.negative');

botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => {
        agregarNumero(boton.innerText);
        actualizarDisplay();
    });
});

botonesOperaciones.forEach(boton => {
    boton.addEventListener('click', () => {
        elegirOperacion(boton.innerText);
        actualizarDisplay();
    });
});

botonIgual.addEventListener('click', () => {
    calcular();
    actualizarDisplay();
});

botonBorrar.addEventListener('click', () => {
    borrarTodo();
    actualizarDisplay();
});

botonNegativo.addEventListener('click', () => {
    cambiarSigno();
    actualizarDisplay();
});

function agregarNumero(numero) {
    if (numero === ',' && numeroActual.includes(',')) return;
    numeroActual = numeroActual.toString() + numero.toString();
}

function elegirOperacion(op) {
    if (numeroActual === '') return;
    if (numeroAnterior !== '') {
        calcular();
    }
    operacion = op;
    numeroAnterior = numeroActual;
    numeroActual = '';
}

function calcular() {
    let resultado;
    const anterior = parseFloat(numeroAnterior.replace(',', '.'));
    const actual = parseFloat(numeroActual.replace(',', '.'));
    if (isNaN(anterior) || isNaN(actual)) return;
    switch (operacion) {
        case '+':
            resultado = anterior + actual;
            break;
        case '-':
            resultado = anterior - actual;
            break;
        case 'x':
            resultado = anterior * actual;
            break;
        case '÷':
            resultado = anterior / actual;
            break;
        case '%':
            resultado = anterior % actual;
            break;
        default:
            return;
    }
    numeroActual = resultado.toString().replace('.', ',');
    operacion = null;
    numeroAnterior = '';
}

function borrarTodo() {
    numeroActual = '';
    numeroAnterior = '';
    operacion = null;
}

function cambiarSigno() {
    numeroActual = (parseFloat(numeroActual.replace(',', '.')) * -1).toString().replace('.', ',');
}

function actualizarDisplay() {
    display.innerText = numeroActual || '0';
}