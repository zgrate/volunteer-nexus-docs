import React, {useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

// Przeglądarka dużych diagramów SVG: powiększanie przyciskami lub Ctrl + kółko, przesuwanie przeciąganiem.
// `zoom` = szerokość obrazu jako wielokrotność szerokości ramki (1 = cały diagram widoczny).
export default function SvgViewer({src, alt, height = '70vh'}) {
  const url = useBaseUrl(src);
  const box = useRef(null);
  const drag = useRef(null);
  const [zoom, setZoom] = useState(1);
  const change = (factor) => setZoom((z) => Math.min(12, Math.max(1, z * factor)));

  const onWheel = (e) => {
    if (!e.ctrlKey) return; // zwykłe kółko przewija stronę
    e.preventDefault();
    change(e.deltaY < 0 ? 1.25 : 0.8);
  };
  const onDown = (e) => {
    const b = box.current;
    drag.current = {x: e.clientX, y: e.clientY, left: b.scrollLeft, top: b.scrollTop};
    b.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    box.current.scrollLeft = d.left - (e.clientX - d.x);
    box.current.scrollTop = d.top - (e.clientY - d.y);
  };
  const onUp = () => (drag.current = null);

  return (
    <div>
      <div style={{display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8}}>
        <button className="button button--secondary button--sm" onClick={() => change(0.8)} aria-label="Pomniejsz">−</button>
        <button className="button button--secondary button--sm" onClick={() => change(1.25)} aria-label="Powiększ">+</button>
        <button className="button button--secondary button--sm" onClick={() => setZoom(1)}>Cały diagram</button>
        <span>{Math.round(zoom * 100)}%</span>
        <a href={url} target="_blank" rel="noreferrer" style={{marginLeft: 'auto'}}>Otwórz w nowej karcie</a>
      </div>
      <div
        ref={box}
        onWheel={onWheel}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={{height, overflow: 'auto', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 8, background: '#fff', cursor: 'grab', touchAction: 'none'}}>
        <img src={url} alt={alt} draggable={false} style={{width: `${zoom * 100}%`, maxWidth: 'none', display: 'block', userSelect: 'none'}} />
      </div>
    </div>
  );
}
