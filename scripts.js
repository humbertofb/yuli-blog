// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
    });
}

// Cargar comentarios al inicio
window.onload = loadComments;
