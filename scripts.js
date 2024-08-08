document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM completamente cargado");

    // Funcionalidad del menú
    document.getElementById('menu-toggle').addEventListener('click', function () {
        var menu = document.getElementById('dropdown-menu');
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    });

    // Manejar el envío de comentarios - VERIFICACIÓN BÁSICA
    document.getElementById('commentForm').addEventListener('submit', function(e) {
        e.preventDefault();  // Prevenir el envío por defecto
        console.log("Formulario enviado - preventDefault llamado");

        alert("¡Formulario enviado!");
    });
});
