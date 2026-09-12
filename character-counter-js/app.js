const formTarea = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const listaTareas = document.getElementById('lista-tareas');
const contador = document.getElementById('contador');

const contadorCaracteres = document.getElementById('contador-caracteres');
const contadorExtra = document.getElementById('contador-extra');
const infoCaracteres = document.querySelector('.info-caracteres');
const btnLimpiar = document.getElementById('btn-limpiar');

const btnTodas = document.getElementById('btn-todas');
const btnPendientes = document.getElementById('btn-pendientes');
const btnCompletadas = document.getElementById('btn-completadas');

const LIMITE_MAX = 60;
let tareas = JSON.parse(localStorage.getItem('mis_tareas')) || [];
let filtroActual = 'todas';

function guardarEnStorage() {
    localStorage.setItem('mis_tareas', JSON.stringify(tareas));
}

function actualizarContador() {
    const pendientes = tareas.filter(t => !t.completada).length;
    contador.textContent = `${pendientes} tareas pendientes`;
}

inputTarea.addEventListener('input', () => {
    const texto = inputTarea.value;
    const totalCaracteres = texto.length;
    
    const palabras = texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length;
    const sinEspacios = texto.replace(/\s+/g, '').length;

    contadorCaracteres.textContent = `${totalCaracteres} / ${LIMITE_MAX} caracteres`;
    contadorExtra.textContent = `(${palabras} palabras | ${sinEspacios} sin espacios)`;

    if (totalCaracteres >= LIMITE_MAX) {
        infoCaracteres.classList.add('limite-alcanzado');
    } else {
        infoCaracteres.classList.remove('limite-alcanzado');
    }
});

btnLimpiar.addEventListener('click', () => {
    inputTarea.value = '';
    contadorCaracteres.textContent = `0 / ${LIMITE_MAX} caracteres`;
    contadorExtra.textContent = `(0 palabras | 0 sin espacios)`;
    infoCaracteres.classList.remove('limite-alcanzado');
});

function renderizarTareas() {
    listaTareas.innerHTML = '';
    let tareasFiltradas = tareas;

    if (filtroActual === 'pendientes') {
        tareasFiltradas = tareas.filter(t => !t.completada);
    } else if (filtroActual === 'completadas') {
        tareasFiltradas = tareas.filter(t => t.completada);
    }

    tareasFiltradas.forEach((tarea, index) => {
        const li = document.createElement('li');
        if (tarea.completada) {
            li.classList.add('completada');
        }

        li.innerHTML = `
            <div class="contenido-tarea">
                <input type="checkbox" ${tarea.completada ? 'checked' : ''} onchange="cambiarEstado(${index})">
                <span>${tarea.texto}</span>
            </div>
            <button class="btn-eliminar" onclick="borrarTarea(${index})">X</button>
        `;

        listaTareas.appendChild(li);
    });

    actualizarContador();
}

formTarea.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = inputTarea.value.trim();
    if (texto === '') return;

    tareas.push({
        texto: texto,
        completada: false
    });

    guardarEnStorage();
    renderizarTareas();

    inputTarea.value = '';
    contadorCaracteres.textContent = `0 / ${LIMITE_MAX} caracteres`;
    contadorExtra.textContent = `(0 palabras | 0 sin espacios)`;
    infoCaracteres.classList.remove('limite-alcanzado');
});

function cambiarEstado(index) {
    tareas[index].completada = !tareas[index].completada;
    guardarEnStorage();
    renderizarTareas();
}

function borrarTarea(index) {
    tareas.splice(index, 1);
    guardarEnStorage();
    renderizarTareas();
}

btnTodas.addEventListener('click', () => {
    filtroActual = 'todas';
    marcarBotonActivo(btnTodas);
    renderizarTareas();
});

btnPendientes.addEventListener('click', () => {
    filtroActual = 'pendientes';
    marcarBotonActivo(btnPendientes);
    renderizarTareas();
});

btnCompletadas.addEventListener('click', () => {
    filtroActual = 'completadas';
    marcarBotonActivo(btnCompletadas);
    renderizarTareas();
});

function marcarBotonActivo(botonSeleccionado) {
    [btnTodas, btnPendientes, btnCompletadas].forEach(btn => btn.classList.remove('activo'));
    botonSeleccionado.classList.add('activo');
}

renderizarTareas();