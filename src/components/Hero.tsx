import { Fragment } from 'react';
import { headline, subline } from '../content';
import { idx, splitWords } from '../lib/words';

export const Hero = () => {
  const words = splitWords(headline);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        {/* Each word is its own element so every template can pop it in its own way */}
        <h1 id="hero-title" className="display" aria-label={headline}>
          {words.map((word, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="word" aria-hidden="true" style={idx(i)}>
                <span>{word}</span>
              </span>
            </Fragment>
          ))}
        </h1>
        <p className="lede">{subline}</p>
        <div className="actions">
          <a className="btn btn-primary" href="#examples">Lihat contoh</a>
          <a className="btn btn-link" href="#templates">Pilih template</a>
        </div>
      </div>

      {/* Parallax stage: GSAP moves each [data-depth] layer at its own speed (useScrollMotion) */}
      <div className="stage" aria-hidden="true">
        <div className="layer orb" data-depth="-0.3" />
        <div className="layer win win-back" data-depth="0.12">
          <div className="win-bar"><i /><i /><i /></div>
          <div className="win-body">
            <b style={{ width: '62%' }} /><b style={{ width: '88%' }} /><b style={{ width: '48%' }} />
            <div className="win-block" />
          </div>
        </div>
        <div className="layer win win-mid" data-depth="0.42">
          <div className="win-bar"><i /><i /><i /></div>
          <div className="win-body">
            <b style={{ width: '74%' }} /><b style={{ width: '40%' }} />
          </div>
        </div>
        <div className="layer toast" data-depth="0.8">
          <span className="toast-dot" />
          <span>Tersimpan</span>
        </div>
      </div>
    </section>
  );
};
