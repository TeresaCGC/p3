window.addEventListener('scroll', function() {
    var footer = document.querySelector('footer.pie');
    var scrollPosition = window.scrollY;
    var windowHeight = window.innerHeight;
    var bodyHeight = document.body.offsetHeight;

    // Verifica si el usuario ha llegado al final de la página
    if (scrollPosition + windowHeight >= bodyHeight) {
        footer.style.display = 'block'; // Muestra el footer
    } else {
        footer.style.display = 'none'; // Oculta el footer
    }
});
