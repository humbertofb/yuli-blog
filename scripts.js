document.getElementById('menuButton').addEventListener('click', function() {
    document.getElementById('menu').style.display = 'block';
});

document.addEventListener('click', function(event) {
    if (!event.target.closest('#menu') && !event.target.closest('#menuButton')) {
        document.getElementById('menu').style.display = 'none';
    }
});

document.querySelectorAll('nav ul li a').forEach(function(link) {
    link.addEventListener('click', function() {
        document.getElementById('menu').style.display = 'none';
    });
});

// Configuración de Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyBfGBf5Zmp1hEZHT9aKIhTRcXjULD-jbGw",
            authDomain: "mi-web-5402c.firebaseapp.com",
            databaseURL: "https://mi-web-5402c-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "mi-web-5402c",
            storageBucket: "mi-web-5402c.appspot.com",
            messagingSenderId: "31272724190",
            appId: "1:31272724190:web:51fcc8750c51abf783844f"
        };

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Referencia a la base de datos
const questionsRef = database.ref('questions');

// Función para enviar una pregunta
document.getElementById('questionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const question = document.getElementById('question').value;
    questionsRef.push().set({
        question: question
    });
    document.getElementById('question').value = '';
});

// Función para mostrar las preguntas
questionsRef.on('value', function(snapshot) {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';
    snapshot.forEach(function(childSnapshot) {
        const question = childSnapshot.val().question;
        const div = document.createElement('div');
        div.className = 'question';
        div.textContent = question;
        questionsContainer.appendChild(div);
    });
});

// Función para mostrar/ocultar el menú
document.getElementById('menuButton').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});
