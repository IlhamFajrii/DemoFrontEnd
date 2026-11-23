import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom has none of these browser APIs. matchMedia says motion is allowed (no-preference matches,
// reduce does not), so the animation engine runs the way it does for a normal visitor.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query.includes('no-preference'),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false
  })
});

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);

Element.prototype.scrollIntoView = () => {};

HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
  this.removeAttribute('open');
};
