import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Example, Filter, examples, filters } from '../content';
import { idx } from '../lib/words';

/** Pointer position becomes CSS variables, so the highlight follows without re-rendering. */
const trackPointer = (e: React.PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export const Examples = () => {
  const segRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [filter, setFilter] = useState<Filter>('Semua');
  // `n` makes re-opening the same example still trigger the effect below
  const [request, setRequest] = useState<{ example: Example | null; n: number }>({ example: null, n: 0 });

  const visible = filter === 'Semua' ? examples : examples.filter(e => e.topic === filter);
  const selected = request.example;

  // Slide the segmented-control thumb under the active button
  useLayoutEffect(() => {
    const seg = segRef.current;
    if (!seg) return;
    const place = () => {
      const active = seg.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!active) return;
      seg.style.setProperty('--x', `${active.offsetLeft}px`);
      seg.style.setProperty('--w', `${active.offsetWidth}px`);
    };
    place();
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [filter]);

  useEffect(() => {
    if (request.n > 0 && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [request]);

  return (
    <section id="examples" className="examples" aria-labelledby="examples-title">
      <div className="container">
        <header className="head reveal">
          <h2 id="examples-title" className="title">Pilih satu, lihat bagaimana ia bekerja.</h2>
        </header>

        <div className="seg-wrap reveal">
          <div className="seg" ref={segRef} role="group" aria-label="Filter contoh">
            {filters.map(f => (
              <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <p className="count" aria-live="polite">{visible.length} contoh</p>
        </div>

        <ul className="grid" aria-label="Daftar contoh">
          {visible.map((ex, i) => (
            <li key={ex.id} className="cell">
              <button
                type="button"
                className="card"
                style={idx(i)}
                onPointerMove={trackPointer}
                onClick={() => setRequest(r => ({ example: ex, n: r.n + 1 }))}
              >
                <span className="tag">{ex.topic}</span>
                <h3>{ex.title}</h3>
                <p>{ex.summary}</p>
                <span className="more">Lihat detail <span aria-hidden="true">›</span></span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* The shell is on the dialog itself: a transparent dialog with a rounded child leaves
          square corners where the blurred backdrop shows through. */}
      <dialog
        ref={dialogRef}
        className="sheet"
        aria-labelledby="sheet-title"
        onClick={e => e.target === e.currentTarget && e.currentTarget.close()}
      >
        <div className="sheet-body">
          <span className="tag pop-line" style={idx(0)}>{selected?.topic}</span>
          <h2 id="sheet-title" className="pop-line" style={idx(1)}>{selected?.title}</h2>
          {selected?.detail.map((line, i) => (
            <p key={line} className="pop-line" style={idx(i + 2)}>{line}</p>
          ))}
          <button type="button" className="btn btn-primary pop-line" style={idx(4)} onClick={() => dialogRef.current?.close()}>
            Tutup
          </button>
        </div>
      </dialog>
    </section>
  );
};
