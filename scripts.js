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
