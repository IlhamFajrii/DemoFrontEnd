import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { StyleId } from '../types';
import { DEFAULT_TEMPLATE, TEMPLATE_MAP, TEMPLATES } from '../templates';

const KEY = 'demo-style';

// index.html applied this before first paint (same rule), so read it back rather than guess again
const initial = (): StyleId => {
  const attr = document.documentElement.getAttribute('data-theme') as StyleId | null;
  return attr && TEMPLATE_MAP.has(attr) ? attr : DEFAULT_TEMPLATE;
};

export function useTheme() {
  const [theme, setThemeState] = useState<StyleId>(initial);
  // Where the user last asked to go. Switching waits for fonts, so rapid presses must build on this,
  // not on the (older) rendered theme, and only the latest request may be applied.
  const target = useRef<StyleId>(theme);

  // Keep the attribute, the saved choice and the shareable ?style= link in step with the state
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(KEY, theme);
      const url = new URL(window.location.href);
      url.searchParams.set('style', theme);
      history.replaceState(null, '', url);
    } catch {
      // Storage or history can be blocked (private mode, sandboxed frame); the switch still works.
    }
  }, [theme]);

  // First paint uses fallback faces; swap in the template's own fonts as soon as they arrive
  useEffect(() => {
    TEMPLATE_MAP.get(theme)?.loadFonts().catch(() => {});
  }, [theme]);

  const setTheme = useCallback(async (next: StyleId) => {
    const tpl = TEMPLATE_MAP.get(next);
    if (!tpl) return;
    target.current = next;
    // Wait (briefly) for the new fonts so the headline does not reflow after the switch
    await Promise.race([tpl.loadFonts().catch(() => {}), new Promise(r => setTimeout(r, 900))]);
    if (target.current !== next) return; // a newer request superseded this one
    const apply = () => flushSync(() => setThemeState(next));
    const reduced = document.documentElement.getAttribute('data-motion') === 'reduced';
    if (!reduced && 'startViewTransition' in document) {
      (document as Document & { startViewTransition: (cb: () => void) => unknown }).startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  /** Step through the ten templates; wraps around. */
  const step = useCallback((dir: 1 | -1) => {
    const i = TEMPLATES.findIndex(t => t.id === target.current);
    setTheme(TEMPLATES[(i + dir + TEMPLATES.length) % TEMPLATES.length].id);
  }, [setTheme]);

  return { theme, setTheme, step };
}
