'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tablero from './components/Tablero';
import Marcador from './components/Marcador';
import PantallaFinal from './components/PantallaFinal';

const ICONOS = ['🚀', '🎮', '🍕', '🐱', '⭐', '🎈', '🔥', '💎'];

function crearTablero() {
  const parejas = [...ICONOS, ...ICONOS];
  const mezcladas = parejas.sort(() => Math.random() - 0.5);

  return mezcladas.map((icono, index) => ({
    id: index,
    icono,
    dadaVuelta: false,
    emparejada: false,
  }));
}

export default function MemoryGame() {
  const [tablero, setTablero] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [movimientos, setMovimientos] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [jugando, setJugando] = useState(false);
  const [evaluando, setEvaluando] = useState(false);
  const [victoria, setVictoria] = useState(false);

  useEffect(() => {
    reiniciarJuego();
  }, []);

  useEffect(() => {
    let intervalo = null;
    if (jugando && !victoria) {
      intervalo = setInterval(() => {
        setTiempo((prev) => prev + 1);
      }, 1000);
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
          prev.map((f) =>
            f.icono === primera.icono ? { ...f, emparejada: true } : f
          )
        );
        setSeleccionadas([]);
        setEvaluando(false);
      } else {
        setTimeout(() => {
          setTablero((prev) =>
            prev.map((f) =>
              f.id === primera.id || f.id === segunda.id
                ? { ...f, dadaVuelta: false }
                : f
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

  const handleFichaClick = (id) => {
    if (!jugando) setJugando(true);

    const fichaSeleccionada = tablero.find((f) => f.id === id);
    if (!fichaSeleccionada || fichaSeleccionada.dadaVuelta || evaluando) return;

    setTablero((prev) =>
      prev.map((f) => (f.id === id ? { ...f, dadaVuelta: true } : f))
    );

    setSeleccionadas((prev) => [...prev, fichaSeleccionada]);
  };

  const reiniciarJuego = () => {
    setTablero(crearTablero());
    setSeleccionadas([]);
    setMovimientos(0);
    setTiempo(0);
    setJugando(false);
    setEvaluando(false);
    setVictoria(false);
  };

  return (
    <main className="app-container">
      <Header onReiniciar={reiniciarJuego} />
      <Marcador tiempo={tiempo} movimientos={movimientos} />
      <Tablero
        fichas={tablero}
        onFichaClick={handleFichaClick}
        evaluando={evaluando}
      />
      {victoria && (
        <PantallaFinal
          tiempo={tiempo}
          movimientos={movimientos}
          onReiniciar={reiniciarJuego}
        />
      )}
    </main>
  );
}