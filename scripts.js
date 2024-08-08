document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM completamente cargado");

    // Inicializar Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBRr5Q9VTe03Vo8PKSmher5r62W0n7Ej-k",
        authDomain: "my-humber-project-319815.firebaseapp.com",
        projectId: "my-humber-project-319815",
        storageBucket: "my-humber-project-319815.appspot.com",
        messagingSenderId: "110994378936",
        appId: "1:110994378936:web:33d8a01b82cc46c07e644d",
        measurementId: "G-HNWTFFS4BP"
    };

    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

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
        e.preventDefault();  // Prevenir el envío por defecto
        console.log("Formulario enviado - preventDefault llamado");

        const username = document.getElementById('username').value;
        const comment = document.getElementById('comment').value;

        if (!username || !comment) {
            console.error("El nombre de usuario o comentario está vacío.");
            return;
        }

        db.collection('comments').add({
            username: username,
            comment: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log("Comentario guardado exitosamente");
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
