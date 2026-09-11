import { useState } from 'react';

function App() {

  const [longitud, setLongitud] = useState(10);
  const [conMayusculas, setConMayusculas] = useState(true);
  const [conMinusculas, setConMinusculas] = useState(true);
  const [conNumeros, setConNumeros] = useState(true);
  const [conSimbolos, setConSimbolos] = useState(false);

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [fortalezaTexto, setFortalezaTexto] = useState('');
  const [puntosFortaleza, setPuntosFortaleza] = useState(0);
  const [historial, setHistorial] = useState([]);


  const generarPassword = () => {

    if (longitud === 0 || (!conMayusculas && !conMinusculas && !conNumeros && !conSimbolos)) {
      setError('Marcá al menos una opción');
      return;
    }

    setError('');

    let permitidos = '';
    if (conMayusculas) permitidos += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (conMinusculas) permitidos += 'abcdefghijklmnopqrstuvwxyz';
    if (conNumeros) permitidos += '0123456789';
    if (conSimbolos) permitidos += '!@#$%^&*';

   let resultado = '';
    for (let i = 0; i < longitud; i++) {
      resultado += permitidos[Math.floor(Math.random() * permitidos.length)];
    }

    setPassword(resultado);


    let puntos = 0;
    if (conMayusculas) puntos++;
    if (conMinusculas) puntos++;
    if (conNumeros) puntos++;
    if (conSimbolos) puntos++;
    if (longitud >= 12) puntos++;

    setPuntosFortaleza(puntos);

    if (puntos <= 1) setFortalezaTexto('Muy débil');
    else if (puntos === 2) setFortalezaTexto('Débil');
    else if (puntos === 3) setFortalezaTexto('Media');
    else setFortalezaTexto('Fuerte');

    setHistorial((prev) => [resultado, ...prev.slice(0, 4)]);
  };

  // Copiar al portapapeles
  const copiarAlPortapapeles = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <main className="app-main">
      <h1>Generador de contraseñas</h1>

      <section className="card">
        <div className="visor-container">
          <input
            type="text"
            readOnly
            placeholder="P4$5W0rD!"
            value={password}
            className="visor-input"
          />
          <button onClick={copiarAlPortapapeles} className="btn-copiar" disabled={!password}>
            {copiado ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>

        <div className="formulario">
          <div className="fila-slider">
            <label>Longitud</label>
            <span className="numero-longitud">{longitud}</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={longitud}
            onChange={(e) => setLongitud(Number(e.target.value))}
            className="slider"
          />

          <div className="opciones">
            <label>
              <input
                type="checkbox"
                checked={conMayusculas}
                onChange={(e) => setConMayusculas(e.target.checked)}
              />
              Incluir mayúsculas
            </label>

            <label>
              <input
                type="checkbox"
                checked={conMinusculas}
                onChange={(e) => setConMinusculas(e.target.checked)}
              />
              Incluir minúsculas
            </label>

            <label>
              <input
                type="checkbox"
                checked={conNumeros}
                onChange={(e) => setConNumeros(e.target.checked)}
              />
              Incluir números
            </label>

            <label>
              <input
                type="checkbox"
                checked={conSimbolos}
                onChange={(e) => setConSimbolos(e.target.checked)}
              />
              Incluir símbolos
            </label>
          </div>

          {/* Medidor de fortaleza */}
          <div className="fortaleza-box">
            <span>FORTALEZA</span>
            <div className="fortaleza-resultado">
              <span className="fortaleza-texto">{fortalezaTexto}</span>
              {password && (
                <div className={`barras puntos-${puntosFortaleza}`}>
                  <span className="b1"></span>
                  <span className="b2"></span>
                  <span className="b3"></span>
                  <span className="b4"></span>
                </div>
              )}
            </div>
          </div>

          {error && <p className="mensaje-error">{error}</p>}

          <button className="btn-generar" onClick={generarPassword}>
            GENERAR →
          </button>
        </div>

        {historial.length > 0 && (
          <div className="historial">
            <h3>Historial</h3>
            <ul>
              {historial.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;