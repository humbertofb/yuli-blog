document.addEventListener('DOMContentLoaded', async function() {
    console.log("DOM completamente cargado");

    // Importar módulos dinámicamente
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js");
    const { getFirestore, collection, addDoc, getDocs, orderBy, query } = await import("https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js");

    const firebaseConfig = {
  apiKey: "AIzaSyBRr5Q9VTe03Vo8PKSmher5r62W0n7Ej-k",
  authDomain: "my-humber-project-319815.firebaseapp.com",
  projectId: "my-humber-project-319815",
  storageBucket: "my-humber-project-319815.appspot.com",
  messagingSenderId: "110994378936",
  appId: "1:110994378936:web:33d8a01b82cc46c07e644d",
    };

    // Inicializar la app y Firestore
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Resto de tu código
});

    // Funcionalidad del menú
    document.getElementById('menu-toggle').addEventListener('click', function () {
        var menu = document.getElementById('dropdown-menu');
        menu.classList.toggle('hidden');
    });

    // Manejar el envío de comentarios
    document.getElementById('commentForm').addEventListener('submit', async function(e) {
        e.preventDefault();  // Prevenir el envío por defecto
        console.log("Formulario enviado - preventDefault llamado");

        const username = document.getElementById('username').value;
        const comment = document.getElementById('comment').value;

        if (!username || !comment) {
            console.error("El nombre de usuario o comentario está vacío.");
            alert("Debe completar ambos campos.");
            return;
        }

        try {
            await addDoc(collection(db, 'comments'), {
                username: username,
                comment: comment,
                timestamp: new Date()
            });
            console.log("Comentario guardado exitosamente");
            alert("Comentario guardado exitosamente");

            // Limpiar el formulario
            document.getElementById('commentForm').reset();
            loadComments(); // Recargar los comentarios
        } catch (error) {
            console.error("Error al guardar el comentario: ", error);
            alert("Error al guardar el comentario: " + error.message);
        }
    });

    // Cargar comentarios
    async function loadComments() {
        const commentsList = document.getElementById('commentsList');
        commentsList.innerHTML = ''; // Limpiar la lista de comentarios

        const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));

        try {
            const querySnapshot = await getDocs(q);
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
        } catch (error) {
            console.error("Error al cargar los comentarios: ", error);
        }
    }

    // Cargar comentarios al inicio
    loadComments();
})
