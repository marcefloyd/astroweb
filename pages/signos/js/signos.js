document.addEventListener("DOMContentLoaded", async () => {
    const path = window.location.pathname;
    const nombreArchivo = path.substring(path.lastIndexOf('/') + 1).replace('.html', '').toLowerCase();
    
    const signoActual = nombreArchivo.charAt(0).toUpperCase() + nombreArchivo.slice(1);

    try {
        const respuesta = await fetch('json/signos.json');
        const datos = await respuesta.json();

        const info = datos[signoActual];

        if (!info) {
            console.error("No se encontró información para el signo:", signoActual);
            return;
        }

        document.querySelector('.titulo-signo').textContent = info.signo;
        document.querySelector('.simbolo-signo').textContent = info.simbolo;
        document.querySelector('.elemento-signo').textContent = `Elemento: ${info.elemento}`;
        document.querySelector('.planeta-signo').textContent = `Planeta regente: ${info.planeta}`;
        document.querySelector('.casa-signo').textContent = `Casa astrológica: ${info.casa}`;
        document.querySelector('.cuerpo-signo').textContent = info.cuerpo;
        document.querySelector('.mitologia-signo').textContent = info.mitologia;

        const listaPositiva = document.querySelector('.lista-positiva');
        if (listaPositiva) {
            listaPositiva.innerHTML = info.positivo.map(item => `<li>${item}</li>`).join('');
        }

        const listaNegativa = document.querySelector('.lista-negativa');
        if (listaNegativa) {
            listaNegativa.innerHTML = info.negativo.map(item => `<li>${item}</li>`).join('');
        }

    } catch (error) {
        console.error("Error al cargar los datos astrológicos:", error);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const menuCerrar = document.getElementById("menu-cerrar");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("activo");
        });
    }

    if (menuCerrar && menu) {
        menuCerrar.addEventListener("click", () => {
            menu.classList.remove("activo");
        });
    }
});