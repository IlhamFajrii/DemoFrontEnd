import { describe, it, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { App } from '../App';
import { TEMPLATES, DEFAULT_TEMPLATE } from '../templates';
import { notes } from '../content';
import { splitWords } from '../lib/words';

// Read from disk: Vitest blanks CSS imports, even with ?raw. Plain paths, because jsdom's own URL
// class is not accepted by fs.
const SRC = join(dirname(fileURLToPath(import.meta.url)), '..');
const themeCss = readFileSync(join(SRC, 'styles/theme.css'), 'utf8');
const templatesCss = readFileSync(join(SRC, 'styles/templates.css'), 'utf8');

const html = () => document.documentElement;

beforeEach(() => {
  localStorage.clear();
  html().setAttribute('data-theme', 'lumen');
  html().setAttribute('data-motion', 'normal');
  window.history.replaceState(null, '', '/');
});

describe('templates', () => {
  it('has ten unique templates and the first one is the default', () => {
    expect(TEMPLATES).toHaveLength(10);
    expect(new Set(TEMPLATES.map(t => t.id)).size).toBe(10);
    expect(TEMPLATES[0].id).toBe(DEFAULT_TEMPLATE);
  });

  it('gives every template its own CSS block', () => {
    for (const t of TEMPLATES) {
      expect(themeCss, `theme.css has no block for "${t.id}"`).toContain(`[data-theme="${t.id}"]`);
    }
  });

  it('gives every template its own scroll animation, headline pop and pop-up', () => {
    for (const t of TEMPLATES) {
      expect(t.reveal && t.words && t.popup, `${t.id} lacks a motion character`).toBeTruthy();
      expect(Object.keys(t.scroll.title).length, `${t.id} has no title animation`).toBeGreaterThan(0);
    }
    expect(new Set(TEMPLATES.map(t => t.popup)).size).toBe(10);
    expect(new Set(TEMPLATES.map(t => t.reveal)).size).toBeGreaterThanOrEqual(9);
  });

  it('only points at keyframes that exist', () => {
    const wanted = [...themeCss.matchAll(/--(?:word|pop)-anim:\s*([\w-]+)/g)].map(m => m[1]);
    expect(wanted.length).toBeGreaterThanOrEqual(20); // ten templates, two each
    for (const name of new Set(wanted)) {
      expect(templatesCss, `@keyframes ${name} is missing`).toContain(`@keyframes ${name}`);
    }
  });
});

describe('App', () => {
  it('reads the headline as one sentence while the words animate separately', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /antarmuka yang terasa hidup/i })).toBeInTheDocument();
  });

  it('switches template from the gallery, saves it and puts it in the shareable link', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Neo Brutal/ }));
    await waitFor(() => expect(html().getAttribute('data-theme')).toBe('brutal'));
    expect(localStorage.getItem('demo-style')).toBe('brutal');
    expect(window.location.search).toContain('style=brutal');
  });

  it('steps with ] and [, builds on rapid presses, and wraps around', async () => {
    render(<App />);
    fireEvent.keyDown(window, { key: ']' });
    await waitFor(() => expect(html().getAttribute('data-theme')).toBe(TEMPLATES[1].id));
    fireEvent.keyDown(window, { key: '[' });
    fireEvent.keyDown(window, { key: '[' });
    await waitFor(() => expect(html().getAttribute('data-theme')).toBe(TEMPLATES[9].id));
  });

  it('opens the pop-up note for a chip on click and on keyboard focus', () => {
    render(<App />);
    const panel = document.getElementById('note-panel')!;
    expect(within(panel).getByRole('heading')).toHaveTextContent(notes[0].title);

    fireEvent.click(screen.getByRole('button', { name: notes[2].label }));
    expect(within(panel).getByRole('heading')).toHaveTextContent(notes[2].title);

    fireEvent.focus(screen.getByRole('button', { name: notes[4].label }));
    expect(within(panel).getByRole('heading')).toHaveTextContent(notes[4].title);
  });

  it('opens an example in the sheet and closes it again', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Parallax berlapis/ }));
    const sheet = document.querySelector('dialog')!;
    expect(sheet).toHaveAttribute('open');
    expect(within(sheet).getByRole('heading', { name: 'Parallax berlapis' })).toBeInTheDocument();
    fireEvent.click(within(sheet).getByRole('button', { name: 'Tutup' }));
    expect(sheet).not.toHaveAttribute('open');
  });

  it('filters the example cards', () => {
    render(<App />);
    const grid = screen.getByRole('list', { name: 'Daftar contoh' });
    expect(within(grid).getAllByRole('button')).toHaveLength(6);
    fireEvent.click(screen.getByRole('button', { name: 'Teks' }));
    expect(within(grid).getAllByRole('button')).toHaveLength(2);
    expect(screen.getByText('2 contoh')).toBeInTheDocument();
  });

  it('runs the animation engine only while motion is allowed, and leaves everything visible otherwise', async () => {
    render(<App />);
    expect(html().classList.contains('motion')).toBe(true);
    expect(document.querySelectorAll('.fill-word').length).toBeGreaterThan(5);
    // The sentence is plain text: no ARIA label on a paragraph (not permitted) and no hidden words
    expect(document.querySelector('.fill')).not.toHaveAttribute('aria-label');
    expect(document.querySelector('.fill-word')).not.toHaveAttribute('aria-hidden');

    fireEvent.click(screen.getByRole('switch', { name: /Mati|Aktif/ }));
    await waitFor(() => expect(html().getAttribute('data-motion')).toBe('reduced'));
    expect(html().classList.contains('motion')).toBe(false);
    expect(localStorage.getItem('demo-motion')).toBe('reduced');
  });
});

describe('words', () => {
  it('splits on any whitespace and drops empty parts', () => {
    expect(splitWords('  Antarmuka   yang\nhidup. ')).toEqual(['Antarmuka', 'yang', 'hidup.']);
    expect(splitWords('')).toEqual([]);
  });
});

describe('source hygiene', () => {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|tsx|css)$/.test(name) && !name.endsWith('app.test.tsx')) files.push(p);
    }
  };
  walk(SRC);

  it('carries no personal portfolio data, real social links or private addresses', () => {
    const banned = /ilham|fajri|dzrl|palembang|github\.com|instagram\.com|gmail\.com|vercel\.app|formsubmit/i;
    for (const f of files) expect(readFileSync(f, 'utf8'), f).not.toMatch(banned);
  });

  it('uses no proprietary system fonts by name', () => {
    const banned = /-apple-system|BlinkMacSystemFont|SF Pro|San Francisco|Helvetica Neue|system-ui|Segoe UI/i;
    for (const f of files) expect(readFileSync(f, 'utf8'), f).not.toMatch(banned);
  });
});
