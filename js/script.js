// ===============================
// 🔮 DATA GLOBAL
// ===============================
let gradosData = [];
let gradoActivo = null;


// ===============================
// 📥 CARGAR JSON
// ===============================
async function cargarGrados() {
  try {
    const response = await fetch('/Json/grados.json');

    if (!response.ok) throw new Error('Error al cargar grados.json');

    const data = await response.json();

    // 🔥 NORMALIZACIÓN ROBUSTA (CLAVE REAL DEL PROBLEMA)
    gradosData = data.map(g => ({
      ...g,

      grado: Number(g.grado),
      signo: (g.signo || "")
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g,"")
  .trim(),

      palabras_clave: Array.isArray(g.palabras_clave) ? g.palabras_clave : [],
      simbolos_clave: Array.isArray(g.simbolos_clave) ? g.simbolos_clave : [],

      interpretacion: g.interpretacion || {},
      polaridad: {
        luz: Array.isArray(g.polaridad?.luz)
          ? g.polaridad.luz
          : (g.polaridad?.luz ? [g.polaridad.luz] : []),

        sombra: Array.isArray(g.polaridad?.sombra)
          ? g.polaridad.sombra
          : (g.polaridad?.sombra ? [g.polaridad.sombra] : []),
      },

      autores: (g.autores && typeof g.autores === "object") ? g.autores : {},
    }));

    console.log('✅ Grados cargados:', gradosData.length);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}


// ===============================
// 🚀 INICIO
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
  await cargarGrados();

  renderGrados("aries");

  const btn = document.querySelector(".btn-generar");
  if (btn) {
    btn.addEventListener("click", generarInterpretacion);
  }
});


// ===============================
// 🔮 BUSCADOR SELECT
// ===============================
function generarInterpretacion() {

  const output = document.getElementById("resultadoIA");
  if (!output) return;

  if (!gradosData.length) {
    output.innerHTML = "⏳ Cargando datos...";
    return;
  }

  const signo = document.getElementById("signo")?.value?.toLowerCase().trim();
  const gradoNumero = Number(document.getElementById("grado")?.value);

  const resultado = gradosData.find(
    g => g.signo === signo && g.grado === gradoNumero
  );

  if (!resultado) {
    output.innerHTML = "⚠️ No hay interpretación todavía";
    return;
  }

  renderResultado(resultado);
}


// ===============================
// 🔥 GRID DINÁMICO
// ===============================
function renderGrados(signoActual) {

  const grid = document.getElementById("gridGrados");
  if (!grid || !gradosData.length) return;

  grid.innerHTML = "";

  const grados = gradosData
    .filter(g => g.signo === signoActual.toLowerCase())
    .sort((a, b) => a.grado - b.grado);

  grados.forEach(g => {

    const btn = document.createElement("button");
    btn.textContent = `${g.grado}°`;

    btn.onclick = () => {

      const output = document.getElementById("resultadoIA");
      if (!output) return;

      if (gradoActivo === g.id) {
        output.innerHTML = "";
        gradoActivo = null;
        return;
      }

      renderResultado(g);
      gradoActivo = g.id;

      output.scrollIntoView({ behavior: "smooth" });
    };

    grid.appendChild(btn);
  });
}


// ===============================
// 🎨 RENDER UNIVERSAL (ROBUSTO)
// ===============================
function renderResultado(resultado) {

  const output = document.getElementById("resultadoIA");
  if (!output) return;

  const safe = (v) => (v ?? "Sin datos");

  const arr = (v) => Array.isArray(v) ? v.join(", ") : safe(v);

  const objToHTML = (obj) => {

if (!obj) return "Sin datos";

/* si es texto simple */
if (typeof obj === "string"){
return obj;
}

/* si es array */
if (Array.isArray(obj)){
return obj.join(", ");
}

/* si es objeto */
return Object.entries(obj)
.map(([k,v])=>{

if(Array.isArray(v)){
v = v.join(", ");
}

return `<b>${k}:</b> ${v}`;
})
.join("<br>");

};

  output.innerHTML = `
    <h2>${safe(resultado.titulo)}</h2>

    <p><b>Resumen:</b> ${safe(resultado.resumen)}</p>

    <p><b>Palabras clave:</b> ${arr(resultado.palabras_clave)}</p>

    <hr>

    <h3>🧠 Interpretación</h3>
    ${objToHTML(resultado.interpretacion)}

    <hr>

    <h3>⚖️ Polaridad</h3>
    ${objToHTML(resultado.polaridad)}

    <hr>

    <h3>🔮 Mensaje evolutivo</h3>
    <p>${safe(resultado.mensaje_evolutivo)}</p>

    <hr>

    <h3>🜂 Simbolos clave</h3>
    <p>${safe(resultado.simbolos_clave)}</p>

    <hr>

    <h3>📚 Autores</h3>
    ${objToHTML(resultado.autores)}

    <hr>

    <h3>⚡ Dinámica profunda</h3>
    <p>${safe(resultado.dinamica_profunda)}</p>

    <hr>

    <h3>📊 Campos extra</h3>
    <h3>📊 Energía</h3>
${objToHTML(resultado.energia)}

<hr>

<h3>💧 Emoción</h3>
${objToHTML(resultado.emocion)}

<hr>

<h3>🧠 Mente</h3>
${objToHTML(resultado.mente)}

<hr>

<h3>❤️ Relaciones</h3>
${objToHTML(resultado.relaciones)}

<hr>

<h3>🜁 Cuerpo / Manifestación</h3>
${objToHTML(resultado.cuerpo_manifestacion)}

    <hr>

    <h3>⚡ Potencial</h3>
    <p>${arr(resultado.potencial)}</p>

    <hr>

    <h3>🔍 Análisis final</h3>
    <p style="white-space: pre-line;">
      ${safe(resultado.analisis_final)}
    </p>
  `;
}
// ===============================
// 📱 CONTROLADOR DEL MENÚ HAMBURGUESA
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('activo');
    });
  }
});