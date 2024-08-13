// Función para alternar el menú
function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Función para manejar el envío del formulario en la página de Frases
function handleFormSubmit(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const respuesta = document.getElementById('respuesta').value;

    // Guardar la respuesta en Firebase
    database.ref('respuestas/').push({
        respuesta: respuesta,
        fecha: new Date().toISOString()
    }).then(() => {
        alert('Respuesta guardada exitosamente.');
        document.getElementById('respuesta').value = ''; // Limpiar el campo
    }).catch((error) => {
        console.error('Error al guardar la respuesta: ', error);
    });
}

// Agregar el evento al formulario cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('respuestaForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Agregar evento al botón de menú
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
});
