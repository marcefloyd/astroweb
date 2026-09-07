async function generarInterpretacion() {
  const resultadoDiv = document.getElementById("resultadoIA");

  resultadoDiv.innerHTML = "Cargando interpretación...";

  try {
    // 📂 leer JSON (RUTA CORRECTA)
    const resJSON = await fetch("/json/grados.json");
    const dataJSON = await resJSON.json();

    console.log("✅ JSON cargado:", dataJSON);

    // 🔮 valores seleccionados
    const signo = document.getElementById("signo").value.toLowerCase();
    const numero = parseInt(document.getElementById("grado").value);

    // 🔍 buscar en array (CLAVE)
    const grado = dataJSON.find(
      g => g.signo === signo && g.grado === numero
    );

    if (!grado) {
      resultadoDiv.innerHTML = "⚠️ No hay datos para este grado";
      return;
    }

    // 🎨 render completo
    resultadoDiv.innerHTML = `
      <h2>${grado.titulo}</h2>

      <p><b>Resumen:</b> ${grado.resumen}</p>

      <p><b>Palabras clave:</b> ${grado.palabras_clave.join(", ")}</p>

      <hr>

      <h3>🧠 Interpretación</h3>
      <p><b>General:</b> ${grado.interpretacion.general}</p>
      <p><b>Psicológica:</b> ${grado.interpretacion.psicologica}</p>
      <p><b>Espiritual:</b> ${grado.interpretacion.espiritual}</p>

      <hr>

      <h3>⚖️ Polaridad</h3>
      <p><b>Luz:</b> ${grado.polaridad.luz.join(", ")}</p>
      <p><b>Sombra:</b> ${grado.polaridad.sombra.join(", ")}</p>

      <hr>

      <h3>🔮 Mensaje evolutivo</h3>
      <p>${grado.mensaje_evolutivo}</p>

      <hr>

      <h3>🜂 Simbolismo</h3>
      <p>${grado.simbolismo}</p>

      <hr>

      <h3>🔍 Análisis final</h3>
      <p style="white-space: pre-line;">
        ${grado.analisis_final}
      </p>
    `;

  } catch (error) {
    resultadoDiv.innerHTML = "❌ Error cargando el JSON";
    console.error("Error:", error);
  }
}