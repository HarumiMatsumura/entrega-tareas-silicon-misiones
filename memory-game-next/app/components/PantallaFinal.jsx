export default function PantallaFinal({ tiempo, movimientos, onReiniciar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🎉 ¡Felicitaciones!</h2>
        <p>Completaste el juego con éxito.</p>
        <p>⏱️ Tiempo final: <strong>{tiempo} segundos</strong></p>
        <p>🎯 Movimientos totales: <strong>{movimientos}</strong></p>
        <button className="btn-reiniciar" onClick={onReiniciar}>
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
}