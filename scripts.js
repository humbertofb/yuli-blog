document.getElementById('menu-toggle').addEventListener('click', function () {
    var menu = document.getElementById('dropdown-menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
});
document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;
    
    // Crear un nuevo elemento de comentario
    const commentElement = document.createElement('div');
    commentElement.className = 'p-4 border-b border-gray-200';
    commentElement.innerHTML = `
        <h3 class="text-lg font-bold">${username}</h3>
        <p class="text-gray-700">${comment}</p>
    `;
    
    // Añadir el comentario al listado
    document.getElementById('commentsList').appendChild(commentElement);
    
    // Limpiar el formulario
    document.getElementById('commentForm').reset();
});
