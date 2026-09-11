export default function Header({ onReiniciar }) {
  return (
    <header className="header">
      <h1>Juego de Memoria</h1>
      <button className="btn-reiniciar" onClick={onReiniciar}>
        Reiniciar
      </button>
    </header>
  );
}