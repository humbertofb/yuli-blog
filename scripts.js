// Asegúrate de que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad del menú
    document.getElementById('menu-toggle').addEventListener('click', function () {
        var menu = document.getElementById('dropdown-menu');
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    });

    // Manejar el envío de comentarios
    document.getElementById('commentForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const comment = document.getElementById('comment').value;

        db.collection('comments').add({
            username: username,
            comment: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            // Limpiar el formulario
            document.getElementById('commentForm').reset();
            loadComments(); // Recargar los comentarios
        }).catch((error) => {
            console.error("Error al guardar el comentario: ", error);
        });
    });

    // Cargar comentarios
    function loadComments() {
        db.collection('comments').orderBy('timestamp', 'desc').get().then((querySnapshot) => {
            const commentsList = document.getElementById('commentsList');
            commentsList.innerHTML = ''; // Limpiar la lista de comentarios
            
            querySnapshot.forEach((doc) => {
                const commentData = doc.data();
                const commentElement = document.createElement('div');
                commentElement.className = 'p-4 border-b border-gray-200';
                commentElement.innerHTML = `
                    <h3 class="text-lg font-bold">${commentData.username}</h3>
                    <p class="text-gray-700">${commentData.comment}</p>
                `;
                commentsList.appendChild(commentElement);
            });
        }).catch((error) => {
            console.error("Error al cargar los comentarios: ", error);
        });
    }

    // Cargar comentarios al inicio
    loadComments();
});
