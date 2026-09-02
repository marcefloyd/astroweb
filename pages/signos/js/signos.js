/* ==========================================
   SCRIPT DINÁMICO DE SIGNOS Y MENÚ
   ========================================== */

document.addEventListener("DOMContentLoaded", async () => {
    const path = window.location.pathname;
    const nombreArchivo = path.substring(path.lastIndexOf('/') + 1).replace('.html', '').toLowerCase();
    
    // Mapeo exacto entre el nombre del archivo y la clave exacta de tu JSON (con mayúsculas y tildes)
    const mapaSignos = {
        "aries": "Aries",
        "tauro": "Tauro",
        "geminis": "Géminis",
        "cancer": "Cáncer",
        "leo": "Leo",
        "virgo": "Virgo",
        "libra": "Libra",
        "escorpio": "Escorpio",
        "sagitario": "Sagitario",
        "capricornio": "Capricornio",
        "acuario": "Acuario",
        "piscis": "Piscis"
    };

    const signoActual = mapaSignos[nombreArchivo];

    if (signoActual) {
        try {
            // Ruta ajustada para salir de pages/signos/ y encontrar la carpeta json/
            const respuesta = await fetch('../../json/signos.json');
            const datos = await respuesta.json();

            const info = datos[signoActual];

            if (!info) {
                console.error("No se encontró información en el JSON para el signo:", signoActual);
                return;
            }

            // Inyección de datos dinámicos
            document.querySelector('.titulo-signo').textContent = info.signo;
            document.querySelector('.simbolo-signo').textContent = info.simbolo;
            document.querySelector('.elemento-signo').textContent = `Elemento: ${info.elemento}`;
            document.querySelector('.planeta-signo').textContent = `Planeta regente: ${info.planeta}`;
            document.querySelector('.casa-signo').textContent = `Casa astrológica: ${info.casa}`;
            
            const cuerpoSigno = document.querySelector('.cuerpo-signo');
            if (cuerpoSigno) cuerpoSigno.textContent = info.cuerpo;

            const mitologiaSigno = document.querySelector('.mitologia-signo');
            if (mitologiaSigno) mitologiaSigno.textContent = info.mitologia;

            // Listas de Luz y Sombra
            const listaPositiva = document.querySelector('.lista-positiva');
            if (listaPositiva && info.positivo) {
                listaPositiva.innerHTML = info.positivo.map(item => `<li style="position: relative; padding-left: 20px; margin-bottom: 10px;">${item}</li>`).join('');
            }

            const listaNegativa = document.querySelector('.lista-negativa');
            if (listaNegativa && info.negativo) {
                listaNegativa.innerHTML = info.negativo.map(item => `<li style="position: relative; padding-left: 20px; margin-bottom: 10px;">${item}</li>`).join('');
            }

        } catch (error) {
            console.error("Error al cargar los datos astrológicos:", error);
        }
    }

    // 📱 Control del Menú Desplegable (Hamburguesa)
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