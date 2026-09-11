export default function Ficha({ ficha, onClick, deshabilitado }) {
  const handleClick = () => {
    if (!ficha.dadaVuelta && !ficha.emparejada && !deshabilitado) {
      onClick(ficha.id);
    }
  };

  const estadoClases = `ficha-card ${ficha.dadaVuelta ? 'dada-vuelta' : ''} ${ficha.emparejada ? 'emparejada' : ''}`;

  return (
    <div className={estadoClases} onClick={handleClick}>
      <div className="ficha-inner">
        <div className="ficha-front">❓</div>
        <div className="ficha-back">{ficha.icono}</div>
      </div>
    </div>
  );
}