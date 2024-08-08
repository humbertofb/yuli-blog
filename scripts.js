// Importa las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBRr5Q9VTe03Vo8PKSmher5r62W0n7Ej-k",
    authDomain: "my-humber-project-319815.firebaseapp.com",
    projectId: "my-humber-project-319815",
    storageBucket: "my-humber-project-319815.appspot.com",
    messagingSenderId: "110994378936",
    appId: "1:110994378936:web:33d8a01b82cc46c07e644d",
    measurementId: "G-HNWTFFS4BP"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
document.getElementById('commentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;

    try {
        await addDoc(collection(db, "comments"), {
            username: username,
            comment: comment,
            timestamp: serverTimestamp()
        });
        // Limpiar el formulario
        document.getElementById('commentForm').reset();
        loadComments(); // Recargar los comentarios
    } catch (error) {
        console.error("Error al guardar el comentario: ", error);
    }
});

// Cargar comentarios
async function loadComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Limpiar la lista de comentarios
    
    try {
        const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
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
window.onload = loadComments;
