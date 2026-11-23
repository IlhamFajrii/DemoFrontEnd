import { steps } from '../content';

/** Left column scrolls, the device on the right stays and swaps screens as each step takes over. */
export const Story = ({ active }: { active: number }) => (
  <section id="story" className="story" aria-labelledby="story-title">
    <div className="container">
      <header className="head reveal">
        <h2 id="story-title" className="title">Tiga prinsip, satu rasa.</h2>
      </header>
      <div className="story-grid">
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className={`step${active === i ? ' on' : ''}`}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="device-wrap" aria-hidden="true">
          <div className="device">
            <div className={`screen s0${active === 0 ? ' on' : ''}`}>
              <b style={{ width: '70%' }} /><b style={{ width: '92%' }} /><b style={{ width: '54%' }} /><b style={{ width: '80%' }} />
            </div>
            <div className={`screen s1${active === 1 ? ' on' : ''}`}>
              <svg viewBox="0 0 200 200" width="100%" height="100%">
                <path className="axis" d="M20 180 H180 M20 180 V20" />
                <path className="curve" pathLength={100} d="M20 180 C52 180 20 20 180 20" />
              </svg>
            </div>
            <div className={`screen s2${active === 2 ? ' on' : ''}`}>
              <div className="row">
                <span>Kurangi gerakan</span>
                <span className="switch"><i /></span>
              </div>
              <small>Animasi dimatikan, konten tetap utuh.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
