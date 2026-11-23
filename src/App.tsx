import { useCallback, useEffect, useRef, useState } from 'react';
import { BRAND } from './content';
import { useTheme } from './hooks/useTheme';
import { useMotionPref } from './hooks/useMotionPref';
import { useScrollMotion } from './hooks/useScrollMotion';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Statement } from './components/Statement';
import { Story } from './components/Story';
import { Notes } from './components/Notes';
import { Examples } from './components/Examples';
import { Templates } from './components/Templates';

export const App = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme, step } = useTheme();
  const [motion, setMotion] = useMotionPref();
  const [storyStep, setStoryStep] = useState(0);
  const onStep = useCallback((i: number) => setStoryStep(i), []);

  useScrollMotion(rootRef, theme, motion, onStep);

  // [ and ] step through the ten templates (not while typing, not with a modifier)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
      if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === ']') step(1);
      if (e.key === '[') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step]);

  return (
    <div ref={rootRef} id="top">
      <a className="skip" href="#main">Lewati ke konten</a>
      <div className="progress" aria-hidden="true" />
      <div className="bg-fx" aria-hidden="true" />

      <Nav theme={theme} onStep={step} />

      <main id="main">
        <Hero />
        <Statement />
        <Story active={storyStep} />
        <Notes />
        <Examples />
        <Templates theme={theme} onTheme={setTheme} motion={motion} onMotion={setMotion} />
      </main>

      <footer className="foot">
        <p>{BRAND}. Semua konten di halaman ini adalah contoh untuk demo teknik animasi. Kode berlisensi MIT.</p>
      </footer>
    </div>
  );
};
