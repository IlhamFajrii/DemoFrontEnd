import { useEffect, useState } from 'react';
import { MotionPref } from '../types';

const KEY = 'demo-motion';

/** The in-page "reduce motion" switch. The OS setting is honoured separately (see useScrollMotion). */
export function useMotionPref(): [MotionPref, (next: MotionPref) => void] {
  const [pref, setPref] = useState<MotionPref>(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'reduced' || saved === 'normal') return saved;
    } catch {
      // Storage blocked: fall back to the default.
    }
    return 'normal';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-motion', pref);
    try {
      localStorage.setItem(KEY, pref);
    } catch {
      // Not persisted this visit.
    }
  }, [pref]);

  return [pref, setPref];
}
