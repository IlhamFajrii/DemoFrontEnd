import { TEMPLATES } from '../templates';
import { MotionPref, StyleId } from '../types';
import { idx } from '../lib/words';

interface TemplatesProps {
  theme: StyleId;
  onTheme: (id: StyleId) => void;
  motion: MotionPref;
  onMotion: (next: MotionPref) => void;
}

/** The ten templates, each with the motion character it brings, plus the reduced-motion switch. */
export const Templates = ({ theme, onTheme, motion, onMotion }: TemplatesProps) => (
  <section id="templates" className="templates" aria-labelledby="templates-title">
    <div className="container">
      <header className="head reveal">
        <h2 id="templates-title" className="title">Sepuluh template, satu halaman.</h2>
        <p className="head-note">
          Pilihan tersimpan dan ikut di tautan, jadi tiap template bisa dibagikan. Tombol <kbd>[</kbd> dan <kbd>]</kbd> berpindah template.
        </p>
      </header>

      <div className="tpl-grid" role="group" aria-label="Pilih template">
        {TEMPLATES.map((tpl, i) => {
          const active = theme === tpl.id;
          return (
            <button key={tpl.id} type="button" className="tpl-card reveal" style={idx(i % 4)} aria-pressed={active} onClick={() => onTheme(tpl.id)}>
              <span className="tpl-sw" aria-hidden="true">
                {tpl.swatch.map((color, i) => <span key={i} style={{ background: color }} />)}
              </span>
              <span className="tpl-name">
                {tpl.name}
                {active && <span className="tpl-on">Aktif</span>}
              </span>
              <span className="tpl-tag">{tpl.tagline}</span>
              <span className="tpl-meta">
                <span><b>Scroll</b> {tpl.reveal}</span>
                <span><b>Judul</b> {tpl.words}</span>
                <span><b>Pop-up</b> {tpl.popup}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="motion-switch reveal">
        <div>
          <h3>Kurangi gerakan</h3>
          <p>Mematikan semua animasi. Konten tetap tampil utuh. Pengaturan sistem Anda juga selalu dihormati.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={motion === 'reduced'}
          className="switch-btn"
          onClick={() => onMotion(motion === 'reduced' ? 'normal' : 'reduced')}
        >
          <span className="switch-track" aria-hidden="true"><i /></span>
          <span>{motion === 'reduced' ? 'Aktif' : 'Mati'}</span>
        </button>
      </div>
    </div>
  </section>
);
