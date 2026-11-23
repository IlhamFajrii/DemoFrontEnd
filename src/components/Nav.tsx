import { BRAND } from '../content';
import { TEMPLATES } from '../templates';
import { StyleId } from '../types';

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

interface NavProps {
  theme: StyleId;
  onStep: (dir: 1 | -1) => void;
}

export const Nav = ({ theme, onStep }: NavProps) => {
  const index = TEMPLATES.findIndex(t => t.id === theme);
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top">{BRAND}</a>
        <nav aria-label="Navigasi utama">
          <a className="nav-link" href="#statement">Gerak</a>
          <a className="nav-link" href="#story">Cerita</a>
          <a className="nav-link" href="#notes">Pop-up</a>
          <a className="nav-link" href="#examples">Contoh</a>
          <a className="nav-link" href="#templates">Template</a>
        </nav>
        <div className="stepper" role="group" aria-label="Ganti template">
          <button type="button" className="icon-btn" onClick={() => onStep(-1)} aria-label="Template sebelumnya" title="Template sebelumnya ( [ )">
            <Chevron dir="left" />
          </button>
          <span className="stepper-name" aria-live="polite">
            {TEMPLATES[index]?.name} <span className="stepper-count">{index + 1}/{TEMPLATES.length}</span>
          </span>
          <button type="button" className="icon-btn" onClick={() => onStep(1)} aria-label="Template berikutnya" title="Template berikutnya ( ] )">
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </header>
  );
};
