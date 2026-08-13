import { useRef, useState } from 'react';
import { Heart } from 'lucide-react';

// ================= EDIT YOUR LOVE LETTER HERE =================
// This is the only place to edit: replace the three values with your own words.
const loveLetter = {
  recipientName: '[RECIPIENT_NAME]',
  letterContent: '[LETTER_CONTENT]',
  yourName: '[YOUR_NAME]',
};

type EnvelopeProps = {
  isOpen: boolean;
  onOpen: () => void;
};

function Envelope({ isOpen, onOpen }: EnvelopeProps) {
  return (
    <button
      type="button"
      className={`envelope-trigger ${isOpen ? 'is-open' : ''}`}
      onClick={onOpen}
      aria-label={isOpen ? 'Opened love letter envelope' : 'Open love letter envelope'}
      aria-pressed={isOpen}
    >
      <span className="envelope" aria-hidden="true">
        <span className="envelope-shadow" />
        <span className="envelope-body">
          <span className="envelope-letter-peek">
            <span className="peek-line peek-line-short" />
            <span className="peek-line" />
            <span className="peek-line peek-line-medium" />
          </span>
          <span className="envelope-pocket" />
          <span className="envelope-fold envelope-fold-left" />
          <span className="envelope-fold envelope-fold-right" />
          <span className="envelope-flap" />
          <span className="envelope-seal">
            <Heart size={25} fill="currentColor" strokeWidth={1.5} />
          </span>
        </span>
      </span>
    </button>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const letterRef = useRef<HTMLElement>(null);

  const openEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    window.setTimeout(() => {
      letterRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 680);
  };

  return (
    <div className="love-app">
      <main>
        <section className={`landing-screen ${isOpen ? 'has-opened' : ''}`} aria-labelledby="landing-title">
          <div className="petal petal-one" aria-hidden="true" />
          <div className="petal petal-two" aria-hidden="true" />
          <div className="petal petal-three" aria-hidden="true" />
          <div className="landing-content">
            <p id="landing-title" className="landing-title">A little letter for you</p>
            <p className="recipient-line">For <span>{loveLetter.recipientName}</span></p>

            <div className="envelope-area">
              <Envelope isOpen={isOpen} onOpen={openEnvelope} />
            </div>

            {!isOpen && <p className="open-prompt">Tap the envelope to open</p>}
          </div>
          <div className="landing-mark" aria-hidden="true">
            <span />
            <Heart size={14} fill="currentColor" strokeWidth={1.4} />
            <span />
          </div>
        </section>

        <section
          ref={letterRef}
          className={`letter-stage ${isOpen ? 'is-revealed' : ''}`}
          aria-label={`Love letter for ${loveLetter.recipientName}`}
          aria-hidden={!isOpen}
        >
          <article className="letter-paper">
            <div className="letter-inner">
              <p className="letter-greeting">Dear {loveLetter.recipientName},</p>
              <p className="letter-copy">{loveLetter.letterContent}</p>
              <div className="letter-closing">
                <p>With all my love,</p>
                <p className="signature">{loveLetter.yourName}</p>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;