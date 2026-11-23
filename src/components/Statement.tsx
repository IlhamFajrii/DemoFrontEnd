import { statement } from '../content';
import { splitWords } from '../lib/words';

/**
 * A large sentence that lights up word by word while it crosses the screen (see useScrollMotion).
 * The words are plain inline text, so assistive tech reads the sentence as written.
 */
export const Statement = () => (
  <section id="statement" className="statement" aria-label="Pernyataan">
    <p className="fill">
      {splitWords(statement).map((word, i) => (
        <span key={i} className="fill-word">{word}{' '}</span>
      ))}
    </p>
  </section>
);
