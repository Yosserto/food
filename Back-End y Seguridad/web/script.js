document.addEventListener("DOMContentLoaded", function () {
    // Oculta el contenido principal inicialmente
    document.querySelector(".container").style.display = "none";
    document.querySelector("header").style.display = "none"; // Oculta el header

    // Función para ocultar el preloader
    const hidePreloader = () => {
        const preloader = document.getElementById("preloader");
        preloader.style.display = "none"; // Oculta el preloader
        document.querySelector(".container").style.display = "block"; // Muestra el contenido
        document.querySelector("header").style.display = "block"; // Muestra el header
    };

    // Escuchar el evento load para ocultar el preloader cuando todo el contenido esté cargado
    window.addEventListener("load", hidePreloader);

    const buttons = document.querySelectorAll(".menu-button");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const paragraph = this.previousElementSibling;
            if (paragraph.style.display === "none") {
                paragraph.style.display = "block";
                this.textContent = "Mostrar menos";
            } else {
                paragraph.style.display = "none";
                this.textContent = "Mostrar más";
            }
        });
        const paragraph = button.previousElementSibling;
        paragraph.style.display = "none"; // Asegúrate de que el párrafo esté oculto inicialmente
    });

    // Lazy Loader para las imágenes
    const lazyImages = document.querySelectorAll("img[loading='lazy']");

    const lazyLoad = (image) => {
        const src = image.getAttribute('data-src');
        if (!src) {
            return;
        }
        image.src = src;
        image.removeAttribute('loading');
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(image => {
        observer.observe(image);
    });
});
