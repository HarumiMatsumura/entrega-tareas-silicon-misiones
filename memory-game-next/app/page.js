'use client';

import { useState, useEffect } from 'react';

const ICONOS = ['🚀', '🎮', '🍕', '🐱', '⭐', '🎈', '🔥', '💎', '🎨', '🎵', '⚡', '🍀', '🏆', '🎯', '🔮', '🧩'];

export default function MemoryGame() {
  const [gridSize, setGridSize] = useState(4); // 4x4 por defecto (Bonus 6x6 opcional)
  const [tablero, setTablero] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [movimientos, setMovimientos] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [jugando, setJugando] = useState(false);
  const [evaluando, setEvaluando] = useState(false);
  const [victoria, setVictoria] = useState(false);

  const iniciarJuego = (size = gridSize) => {
    const totalPares = (size * size) / 2;
    const iconosSeleccionados = ICONOS.slice(0, totalPares);
    const parejas = [...iconosSeleccionados, ...iconosSeleccionados];
    const mezcladas = parejas.sort(() => Math.random() - 0.5);

    const nuevasFichas = mezcladas.map((icono, index) => ({
      id: index,
      icono,
      dadaVuelta: false,
      emparejada: false,
    }));

    setTablero(nuevasFichas);
    setSeleccionadas([]);
    setMovimientos(0);
    setTiempo(0);
    setJugando(false);
    setEvaluando(false);
    setVictoria(false);
  };

  useEffect(() => {
    iniciarJuego(gridSize);
  }, [gridSize]);

  useEffect(() => {
    let intervalo = null;
    if (jugando && !victoria) {
      intervalo = setInterval(() => setTiempo((prev) => prev + 1), 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [jugando, victoria]);

  useEffect(() => {
    if (seleccionadas.length === 2) {
      setEvaluando(true);
      setMovimientos((prev) => prev + 1);
      const [primera, segunda] = seleccionadas;

      if (primera.icono === segunda.icono) {
        setTablero((prev) =>
          prev.map((f) => (f.icono === primera.icono ? { ...f, emparejada: true } : f))
        );
        setSeleccionadas([]);
        setEvaluando(false);
      } else {
        setTimeout(() => {
          setTablero((prev) =>
            prev.map((f) =>
              f.id === primera.id || f.id === segunda.id ? { ...f, dadaVuelta: false } : f
            )
          );
          setSeleccionadas([]);
          setEvaluando(false);
        }, 1000);
      }
    }
  }, [seleccionadas]);

  useEffect(() => {
    if (tablero.length > 0 && tablero.every((f) => f.emparejada)) {
      setVictoria(true);
      setJugando(false);
    }
  }, [tablero]);

  const voltearFicha = (id) => {
    if (!jugando) setJugando(true);
    const ficha = tablero.find((f) => f.id === id);
    if (!ficha || ficha.dadaVuelta || evaluando) return;

    setTablero((prev) =>
      prev.map((f) => (f.id === id ? { ...f, dadaVuelta: true } : f))
    );
    setSeleccionadas((prev) => [...prev, ficha]);
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Memory Game - Silicon Misiones</h1>

      <div style={styles.controls}>
        <button style={styles.btn} onClick={() => setGridSize(4)}>Grilla 4x4</button>
        <button style={styles.btn} onClick={() => setGridSize(6)}>Grilla 6x6 (Bonus)</button>
        <button style={styles.btnReiniciar} onClick={() => iniciarJuego(gridSize)}>Reiniciar</button>
      </div>

      <div style={styles.marcador}>
        <span>Movimientos: <strong>{movimientos}</strong></span>
        <span>Tiempo: <strong>{tiempo}s</strong></span>
      </div>

      <div style={{ ...styles.tablero, gridTemplateColumns: `repeat(${gridSize}, 70px)` }}>
        {tablero.map((ficha) => (
          <div
            key={ficha.id}
            onClick={() => voltearFicha(ficha.id)}
            style={{
              ...styles.ficha,
              backgroundColor: ficha.dadaVuelta || ficha.emparejada ? '#1e293b' : '#334155',
              borderColor: ficha.emparejada ? '#22c55e' : '#3b82f6',
            }}
          >
            {ficha.dadaVuelta || ficha.emparejada ? ficha.icono : '❓'}
          </div>
        ))}
      </div>

      {victoria && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>¡Victoria! 🎉</h2>
            <p>Completaste el juego en {tiempo} segundos y con {movimientos} movimientos.</p>
            <button style={styles.btnReiniciar} onClick={() => iniciarJuego(gridSize)}>
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const styles = {
  main: {
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    padding: '20px',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '15px',
    textAlign: 'center',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  btn: {
    backgroundColor: '#334155',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  btnReiniciar: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  marcador: {
    display: 'flex',
    gap: '30px',
    fontSize: '1.1rem',
    marginBottom: '20px',
    background: '#1e293b',
    padding: '10px 20px',
    borderRadius: '8px',
  },
  tablero: {
    display: 'grid',
    gap: '10px',
  },
  ficha: {
    width: '70px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    borderRadius: '8px',
    cursor: 'pointer',
    border: '2px solid transparent',
    userSelect: 'none',
    transition: 'background-color 0.2s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#1e293b',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
  },
};