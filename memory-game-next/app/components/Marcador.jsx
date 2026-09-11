export default function Marcador({ tiempo, movimientos }) {
  return (
    <div className="marcador">
      <span>⏱️ Tiempo: {tiempo}s</span>
      <span>🎯 Movimientos: {movimientos}</span>
    </div>
  );
}