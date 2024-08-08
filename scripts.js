document.getElementById('menu-toggle').addEventListener('click', function () {
    var menu = document.getElementById('dropdown-menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
});
// Configuración de Firebase

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
window.onload = loadComments;

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBRr5Q9VTe03Vo8PKSmher5r62W0n7Ej-k",
    authDomain: "my-humber-project-319815.firebaseapp.com",
    projectId: "my-humber-project-319815",
    storageBucket: "my-humber-project-319815.appspot.com",
    messagingSenderId: "110994378936",
    appId: "1:110994378936:web:33d8a01b82cc46c07e644d",
    measurementId: "G-HNWTFFS4BP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
