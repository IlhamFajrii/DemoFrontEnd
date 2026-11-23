import { RefObject, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPref, StyleId } from '../types';
import { DEFAULT_TEMPLATE, TEMPLATE_MAP } from '../templates';

gsap.registerPlugin(ScrollTrigger);

/**
 * All scroll-linked motion. The character comes from the active template (templates.ts):
 *   - section titles enter with the template's own gesture (`scroll.title`)
 *   - hero layers and the page ground travel by its parallax distance (`scroll.parallax`)
 *   - content blocks arrive through the CSS reveal, driven by the --rv-* tokens in theme.css
 * Rebuilt whenever the template changes, so a switch replays the new character at once.
 *
 * Everything runs inside gsap.matchMedia: when the OS asks for reduced motion, or the in-page
 * switch is set, nothing is created and the `motion` class is never added, so the page stays in
 * its static, fully visible state. Layout effect: the hidden start state (`html.motion`) has to
 * exist before the first paint.
 */
export function useScrollMotion(
  root: RefObject<HTMLElement | null>,
  style: StyleId,
  pref: MotionPref,
  onStep: (index: number) => void
) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || pref === 'reduced') return;

    const profile = (TEMPLATE_MAP.get(style) ?? TEMPLATE_MAP.get(DEFAULT_TEMPLATE)!).scroll;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      document.documentElement.classList.add('motion');
      const q = gsap.utils.selector(el);

      // Reading progress, scrubbed to the whole page
      gsap.to(q('.progress'), {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'max', scrub: 0.3 }
      });

      // Section titles enter once, with the template's own gesture
      q('.title').forEach(title => {
        gsap.from(title, {
          ...profile.title,
          scrollTrigger: { trigger: title, start: 'top 92%', once: true }
        });
      });

      // Parallax: a layer with depth d travels d * parallax px against the scroll. Positive depth
      // is foreground (faster than the page), negative is background (slower).
      const hero = q('.hero')[0];
      if (profile.parallax > 0) {
        q('[data-depth]').forEach(layer => {
          const depth = Number((layer as HTMLElement).dataset.depth);
          gsap.to(layer, {
            y: () => -depth * profile.parallax,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true }
          });
        });
        // The page ground drifts slower than the content: depth without a layer on screen
        gsap.to(q('.bg-fx'), {
          y: () => -profile.parallax * 0.6,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'max', scrub: true, invalidateOnRefresh: true }
        });
      }

      // Hero copy recedes as the page moves on
      gsap.to(q('.hero-copy'), {
        y: -50,
        scale: profile.heroScale,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom 25%', scrub: true }
      });

      // The statement lights up word by word as it crosses the screen. It moves between two palette
      // colours (--muted to --text), both already checked for contrast, so the words stay readable at
      // every point of the scroll. Opacity would not: a half-faded word fails contrast.
      const words = q('.fill-word');
      if (words.length) {
        const css = getComputedStyle(document.documentElement);
        gsap.fromTo(words, { color: css.getPropertyValue('--muted').trim() }, {
          color: css.getPropertyValue('--text').trim(),
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: q('.statement')[0], start: 'top 78%', end: 'bottom 52%', scrub: true }
        });
      }

      // Sticky story: the step crossing the middle of the screen is the active one
      q('.step').forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: self => self.isActive && onStep(index)
        });
      });

      // Hairline under the nav once the page has moved
      const nav = q('.nav')[0];
      ScrollTrigger.create({
        start: 24,
        end: 'max',
        onToggle: self => nav?.classList.toggle('scrolled', self.isActive)
      });

      // One-shot entrance for blocks marked .reveal. On a template switch the marks are cleared first:
      // blocks on screen replay the new character at once, the rest wait for their scroll.
      q('.reveal').forEach(node => node.classList.remove('in'));
      const io = new IntersectionObserver(
        entries =>
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          }),
        { rootMargin: '0px 0px -12% 0px' }
      );
      q('.reveal').forEach(node => io.observe(node));

      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        io.disconnect();
        document.documentElement.classList.remove('motion');
      };
    });

    return () => mm.revert();
  }, [root, style, pref, onStep]);
}
