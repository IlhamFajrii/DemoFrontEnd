import { useState } from 'react';
import { notes } from '../content';
import { idx } from '../lib/words';

/**
 * Interactive pop-up text. Hover (mouse), focus (keyboard) or click (touch) a chip and its note opens
 * in the panel below, in the active template's own way (--pop-anim). The panel is keyed by note,
 * so every change plays the opening again; each line arrives after the one before it.
 */
export const Notes = () => {
  const [activeId, setActiveId] = useState(notes[0].id);
  const active = notes.find(n => n.id === activeId) ?? notes[0];

  return (
    <section id="notes" className="notes" aria-labelledby="notes-title">
      <div className="container">
        <header className="head reveal">
          <h2 id="notes-title" className="title">Arahkan kursor, lalu baca.</h2>
        </header>

        <div className="chips reveal" role="group" aria-label="Pilih catatan">
          {notes.map(n => (
            <button
              key={n.id}
              type="button"
              className="chip"
              aria-pressed={n.id === activeId}
              aria-controls="note-panel"
              onPointerEnter={e => { if (e.pointerType === 'mouse') setActiveId(n.id); }}
              onFocus={() => setActiveId(n.id)}
              onClick={() => setActiveId(n.id)}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div id="note-panel" className="note-panel reveal" aria-live="polite">
          <div key={active.id} className="note-body">
            <h3 className="pop-line" style={idx(0)}>{active.title}</h3>
            {active.lines.map((line, i) => (
              <p key={line} className="pop-line" style={idx(i + 1)}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
