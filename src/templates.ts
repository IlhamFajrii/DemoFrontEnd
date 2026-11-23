import { StyleId } from './types';

/**
 * The ten templates. Each one re-skins the SAME page with its own palette, type, shape and,
 * above all, its own motion character:
 *   - reveal:  how content arrives while you scroll
 *   - words:   how the headline words pop in
 *   - popup:   how interactive pop-up text (note panel, case sheet) opens
 * The CSS for each lives in styles/theme.css and styles/templates.css; `scroll` is read by
 * useScrollMotion (GSAP). Fonts are all SIL OFL 1.1 (free for any use), bundled by @fontsource
 * and loaded on demand. The first template, Lumen, is the default.
 */
export interface ScrollProfile {
  /** Section-title entrance, as GSAP `from` vars */
  title: gsap.TweenVars;
  /** Parallax travel in px: foreground layers move this far, the page ground a fraction of it */
  parallax: number;
  /** Scale the hero copy reaches while it recedes on scroll */
  heroScale: number;
}

export interface Template {
  id: StyleId;
  name: string;
  tagline: string;
  mode: 'light' | 'dark';
  /** Swatch for the gallery: background, surface, accent, ink */
  swatch: [string, string, string, string];
  reveal: string;
  words: string;
  popup: string;
  scroll: ScrollProfile;
  loadFonts: () => Promise<unknown>;
}

const inter = () => import('@fontsource-variable/inter');

export const TEMPLATES: Template[] = [
  {
    id: 'lumen', name: 'Lumen', tagline: 'Putih lapang, huruf besar, aksen biru.', mode: 'light',
    swatch: ['#ffffff', '#f5f5f7', '#0071e3', '#1d1d1f'],
    reveal: 'Naik halus', words: 'Naik dari garis', popup: 'Kartu mengambang',
    scroll: { title: { y: 28, opacity: 0, duration: 0.9, ease: 'power3.out' }, parallax: 220, heroScale: 0.97 },
    loadFonts: inter
  },
  {
    id: 'midnight', name: 'Midnight', tagline: 'Hitam pekat dengan teks lembut dan aksen biru.', mode: 'dark',
    swatch: ['#000000', '#1c1c1e', '#0071e3', '#f5f5f7'],
    reveal: 'Naik perlahan', words: 'Naik perlahan', popup: 'Lembar dari bawah',
    scroll: { title: { y: 44, opacity: 0, duration: 1.3, ease: 'power2.out' }, parallax: 260, heroScale: 0.96 },
    loadFonts: inter
  },
  {
    id: 'obsidian', name: 'Obsidian Glass', tagline: 'Kaca buram dengan cahaya biru dingin.', mode: 'dark',
    swatch: ['#05070b', '#0a0f17', '#4cc2ff', '#eaf2ff'],
    reveal: 'Fokus dari buram', words: 'Fokus dari buram', popup: 'Kaca terbuka',
    scroll: { title: { y: 18, scale: 0.96, opacity: 0, filter: 'blur(14px)', duration: 1.1, ease: 'expo.out' }, parallax: 280, heroScale: 0.95 },
    loadFonts: () => Promise.all([inter(), import('@fontsource-variable/manrope')])
  },
  {
    id: 'editorial', name: 'Editorial', tagline: 'Majalah cetak: serif besar dan garis tipis.', mode: 'light',
    swatch: ['#f6f1e7', '#efe8d8', '#b4380d', '#1c1917'],
    reveal: 'Tirai naik', words: 'Tirai naik', popup: 'Lembar surat kabar',
    scroll: { title: { clipPath: 'inset(100% 0 0 0)', y: 24, duration: 1, ease: 'power4.out' }, parallax: 160, heroScale: 0.96 },
    loadFonts: () => Promise.all([inter(), import('@fontsource-variable/playfair-display')])
  },
  {
    id: 'brutal', name: 'Neo Brutal', tagline: 'Garis tebal, bayangan keras, warna ramai.', mode: 'light',
    swatch: ['#fff4d6', '#ffffff', '#ff5d8f', '#111111'],
    reveal: 'Menghentak', words: 'Menghentak miring', popup: 'Stiker melompat',
    scroll: { title: { y: 40, rotate: -3, scale: 0.9, opacity: 0, duration: 0.55, ease: 'back.out(2.2)' }, parallax: 90, heroScale: 1 },
    loadFonts: () => import('@fontsource-variable/space-grotesk')
  },
  {
    id: 'clay', name: 'Soft Clay', tagline: 'Pastel lembut, bentuk gemuk, memantul ringan.', mode: 'light',
    swatch: ['#fdf1ea', '#fff7f2', '#f2766b', '#3b2a26'],
    reveal: 'Memantul', words: 'Memantul', popup: 'Gelembung kenyal',
    scroll: { title: { y: 36, scale: 0.8, opacity: 0, duration: 0.9, ease: 'elastic.out(1, 0.6)' }, parallax: 140, heroScale: 0.98 },
    loadFonts: () => import('@fontsource-variable/nunito')
  },
  {
    id: 'aurora', name: 'Aurora', tagline: 'Biru malam dengan kabut hijau-teal bercahaya.', mode: 'dark',
    swatch: ['#06121c', '#0a1b29', '#2ee6b6', '#e6fbff'],
    reveal: 'Melayang bercahaya', words: 'Melayang bercahaya', popup: 'Kartu bercahaya',
    scroll: { title: { y: 60, opacity: 0, filter: 'blur(8px)', duration: 1.4, ease: 'sine.out' }, parallax: 340, heroScale: 0.94 },
    loadFonts: () => Promise.all([inter(), import('@fontsource-variable/sora')])
  },
  {
    id: 'swiss', name: 'Swiss Grid', tagline: 'Grid ketat, tipografi tebal, satu warna merah.', mode: 'light',
    swatch: ['#ffffff', '#f6f6f6', '#e10600', '#000000'],
    reveal: 'Geser dari kiri', words: 'Geser dari kiri', popup: 'Label presisi',
    scroll: { title: { x: -56, opacity: 0, duration: 0.7, ease: 'power2.out' }, parallax: 110, heroScale: 1 },
    loadFonts: () => import('@fontsource-variable/archivo')
  },
  {
    id: 'botanica', name: 'Botanica', tagline: 'Hijau sage dan krem, bentuk organik.', mode: 'light',
    swatch: ['#f3f1e8', '#ece9dc', '#2f6b3f', '#1f2a1d'],
    reveal: 'Tumbuh perlahan', words: 'Tumbuh perlahan', popup: 'Daun terbuka',
    scroll: { title: { y: 22, scale: 0.92, rotate: 1.5, opacity: 0, duration: 1.2, ease: 'power2.out' }, parallax: 190, heroScale: 0.96 },
    loadFonts: () => Promise.all([inter(), import('@fontsource-variable/fraunces')])
  },
  {
    id: 'sunset', name: 'Sunset', tagline: 'Krem hangat dan oranye terbenam.', mode: 'light',
    swatch: ['#fff7f0', '#ffeadb', '#c2410c', '#3a1f12'],
    reveal: 'Terbit', words: 'Terbit', popup: 'Cahaya hangat',
    scroll: { title: { y: 48, scale: 0.9, opacity: 0, duration: 1.1, ease: 'power3.out' }, parallax: 200, heroScale: 0.95 },
    loadFonts: () => Promise.all([inter(), import('@fontsource-variable/outfit')])
  }
];

export const TEMPLATE_MAP = new Map(TEMPLATES.map(t => [t.id, t]));
export const DEFAULT_TEMPLATE: StyleId = 'lumen';
