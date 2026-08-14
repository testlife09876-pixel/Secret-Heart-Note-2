 // ================= EDIT YOUR LOVE LETTER HERE =================
// This is the only place to change personal content.

const recipientName = "Kulsum";

const loveLetter = `
میری جان،

تمہاری موجودگی میری زندگی کی سب سے خوبصورت نعمت ہے۔ تمہاری مسکراہٹ میرے دن کو روشن کر دیتی ہے اور تمہاری باتیں میرے دل کو سکون دیتی ہیں۔

میں چاہتا ہوں کہ ہر خوشی میں تم میرے ساتھ رہو اور ہر مشکل میں ہم ایک دوسرے کا سہارا بنیں۔

تم میری زندگی کا سب سے خوبصورت حصہ ہو۔ ❤️

ہمیشہ تمہارا۔
`;


// ================= IMPORTS =================

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Heart,
  QrCode,
  RotateCcw,
  Smile,
  Sparkles
} from "lucide-react";


// ================= SCREENS =================

type Screen =
  | "qr"
  | "question"
  | "knowit"
  | "envelope"
  | "letter";

type EscapePosition = {
  x: number;
  y: number;
};


// ================= TEDDY GIF =================

const teddyGifUrl =
  "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif";


// ================= QR =================

function createQrImageUrl() {
  const surpriseUrl = new URL(window.location.href);

  surpriseUrl.searchParams.set("surprise", "1");

  return `https://api.qrserver.com/v1/create-qr-code/?size=600x600&margin=20&color=7a294c&bgcolor=fff9f4&data=${encodeURIComponent(
    surpriseUrl.toString()
  )}`;
}


// ================= FLOATING HEARTS =================

function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      <Heart className="float-heart heart-one" fill="currentColor" />
      <Heart className="float-heart heart-two" fill="currentColor" />
      <Heart className="float-heart heart-three" fill="currentColor" />
      <Heart className="float-heart heart-four" fill="currentColor" />
    </div>
  );
}


// ================= CELEBRATION =================

function Celebration() {
  return (
    <div className="celebration-layer" aria-hidden="true">
      {Array.from({ length: 14 }, (_, index) => (
        <Heart
          key={index}
          className={`celebration-heart celebration-heart-${index + 1}`}
          fill="currentColor"
        />
      ))}
    </div>
  );
}


// ================= ENVELOPE =================

type EnvelopeProps = {
  isOpening: boolean;
  onOpen: () => void;
};

function Envelope({ isOpening, onOpen }: EnvelopeProps) {
  return (
    <div className={`envelope-wrap ${isOpening ? "opening" : ""}`}>
      <div className="envelope-shadow" />

      <div className="envelope">
        <div className="letter-peek">
          <span />
          <span />
          <span />
        </div>

        <div className="envelope-pocket" />

        <div className="envelope-fold left" />
        <div className="envelope-fold right" />

        <div className="envelope-flap" />

        <button
          type="button"
          className="envelope-seal"
          onClick={onOpen}
          disabled={isOpening}
          aria-label="Open love letter"
        >
          <Heart fill="currentColor" />
        </button>
      </div>
    </div>
  );
}


// ================= LETTER TEXT HIGHLIGHT =================

function highlightImportantWords(text: string) {
  const importantWords = [
    "خوبصورت",
    "مسکراہٹ",
    "خاص",
    "خوشی",
    "محبت",
    "زندگی",
    "حصہ",
    "مسکراتی"
  ];

  const pattern = new RegExp(
    `(${importantWords.join("|")})`,
    "g"
  );

  return text.split(pattern).map((part, index) => {
    if (importantWords.includes(part)) {
      return (
        <mark key={index}>
          {part}
        </mark>
      );
    }

    return <span key={index}>{part}</span>;
  });
}


// ================= APP =================

function App() {
  const [screen, setScreen] = useState<Screen>(() =>
    new URLSearchParams(window.location.search).get("surprise") === "1"
      ? "question"
      : "qr"
  );

  const [celebrating, setCelebrating] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const [noPosition, setNoPosition] =
    useState<EscapePosition | null>(null);

  const [escapeCount, setEscapeCount] = useState(0);

  const questionActionsRef =
    useRef<HTMLDivElement>(null);

  const noButtonRef =
    useRef<HTMLButtonElement>(null);

  const qrImageUrl = useMemo(
    () => createQrImageUrl(),
    []
  );


  // YES → I KNEW IT PAGE

  useEffect(() => {
    if (!celebrating) return;

    const timer = window.setTimeout(() => {
      setCelebrating(false);
      setScreen("knowit");
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [celebrating]);


  // I KNEW IT → ENVELOPE

  const continueToEnvelope = () => {
    setScreen("envelope");
  };


  // ENVELOPE OPENING

  useEffect(() => {
    if (!isOpening) return;

    const timer = window.setTimeout(() => {
      setIsOpening(false);
      setScreen("letter");
    }, 1250);

    return () => window.clearTimeout(timer);
  }, [isOpening]);


  // NO BUTTON ESCAPE

  const evadeNo = () => {
    const container =
      questionActionsRef.current;

    const button =
      noButtonRef.current;

    if (!container || !button) return;

    const width =
      container.getBoundingClientRect().width;

    const height =
      container.getBoundingClientRect().height;

    const buttonWidth =
      button.offsetWidth || 100;

    const buttonHeight =
      button.offsetHeight || 52;

    const maxX =
      Math.max(
        25,
        (width - buttonWidth) / 2 - 10
      );

    const maxY =
      Math.max(
        20,
        (height - buttonHeight) / 2 - 10
      );

    const position = {
      x:
        (Math.random() * 2 - 1) *
        maxX,

      y:
        (Math.random() * 2 - 1) *
        maxY
    };

    setNoPosition(position);

    setEscapeCount(
      count => count + 1
    );
  };


  // YES

  const handleYes = () => {
    if (celebrating) return;

    setCelebrating(true);
  };


  // RESTART

  const restart = () => {
    setCelebrating(false);
    setIsOpening(false);
    setNoPosition(null);
    setEscapeCount(0);
    setScreen("qr");
  };


  return (
    <div className={`love-app screen-${screen}`}>

      <FloatingHearts />


      {/* ================= QR PAGE ================= */}

      {screen === "qr" && (
        <main className="screen qr-screen">

          <div className="qr-content">

            <p className="eyebrow">
              <QrCode size={16} />
              A little surprise
            </p>

            <h1>
              Scan Me
              <Heart
                className="heading-heart"
                fill="currentColor"
              />
            </h1>

            <p className="subtitle">
              Something special is waiting for you.
            </p>

            <div className="qr-frame">
              <img
                src={qrImageUrl}
                alt="Love surprise QR code"
              />
            </div>

            <button
              className="primary-button"
              type="button"
              onClick={() =>
                setScreen("question")
              }
            >
              I scanned it
              <ArrowRight size={18} />
            </button>

          </div>

        </main>
      )}


      {/* ================= QUESTION PAGE ================= */}

      {screen === "question" && (
        <main className="screen question-screen">

          <div className="question-content">

            <p className="eyebrow">
              <Heart
                size={15}
                fill="currentColor"
              />
              Just one thing
            </p>

            <h1>
              Do you <span>love me?</span>
              <Heart
                className="heading-heart"
                fill="currentColor"
              />
            </h1>

            <p className="subtitle">
              Be honest...
            </p>

            <div
              ref={questionActionsRef}
              className="question-actions"
            >

              <button
                className="yes-button"
                type="button"
                onClick={handleYes}
              >
                YES
                <Heart
                  size={18}
                  fill="currentColor"
                />
              </button>


              <button
                ref={noButtonRef}
                className={`no-button ${
                  noPosition ? "escaped" : ""
                }`}
                type="button"
                style={
                  noPosition
                    ? ({
                        "--escape-x":
                          `${noPosition.x}px`,
                        "--escape-y":
                          `${noPosition.y}px`
                      } as React.CSSProperties)
                    : undefined
                }
                onPointerEnter={evadeNo}
                onPointerDown={event => {
                  event.preventDefault();
                  evadeNo();
                }}
                onTouchStart={event => {
                  event.preventDefault();
                  evadeNo();
                }}
                onClick={event => {
                  event.preventDefault();
                  evadeNo();
                }}
              >
                NO
                <Smile size={18} />
              </button>

            </div>

            <p className="small-romantic-text">
              {escapeCount > 0
                ? "Nice try... ❤️"
                : "Choose wisely."}
            </p>

          </div>

        </main>
      )}


      {/* ================= I KNEW IT PAGE ================= */}

      {screen === "knowit" && (
        <main className="screen knowit-screen">

          <div className="knowit-content">

            <div className="teddy-frame">

              <img
                src={teddyGifUrl}
                alt="Cute romantic teddy bears"
              />

            </div>

            <p className="eyebrow">
              <Heart
                size={15}
                fill="currentColor"
              />
              I knew it
            </p>

            <h1>
              I knew it.
              <span> ❤️</span>
            </h1>

            <p className="knowit-message">
              My heart already knew
              <br />
              the answer.
            </p>

            <button
              className="primary-button"
              type="button"
              onClick={continueToEnvelope}
            >
              There is something for you
              <ArrowRight size={18} />
            </button>

          </div>

        </main>
      )}


      {/* ================= ENVELOPE PAGE ================= */}

      {screen === "envelope" && (
        <main className="screen envelope-screen">

          <div className="envelope-content">

            <p className="eyebrow">
              <Sparkles size={15} />
              Made just for you
            </p>

            <h1>
              A special
              <span> letter</span>
            </h1>

            <p className="subtitle">
              For <strong>{recipientName}</strong>
            </p>


            <Envelope
              isOpening={isOpening}
              onOpen={() =>
                !isOpening &&
                setIsOpening(true)
              }
            />


            <p className="open-text">
              {isOpening
                ? "Opening your letter..."
                : "Tap the heart"}
            </p>

          </div>

        </main>
      )}


      {/* ================= LOVE LETTER ================= */}

      {screen === "letter" && (
        <main className="screen letter-screen">

          <article className="letter-card">

            <div className="letter-inner">

              <p className="letter-kicker">
                FOR YOU, ALWAYS
              </p>


              <h1
                className="letter-title"
                id="letter-title"
              >
                Dear <span>{recipientName}</span>
              </h1>


              <div className="letter-divider">
                <span />
                <Heart
                  size={17}
                  fill="currentColor"
                />
                <span />
              </div>


              <div className="letter-copy">

                {loveLetter
                  .split("\n")
                  .map((line, index) => (
                    <p key={index}>
                      {line
                        ? highlightImportantWords(line)
                        : "\u00A0"}
                    </p>
                  ))}

              </div>


              <div className="letter-ending">

                <span>
                  With all my love
                </span>

                <Heart
                  size={20}
                  fill="currentColor"
                />

              </div>

            </div>

          </article>


          <button
            type="button"
            className="restart-button"
            onClick={restart}
          >
            <RotateCcw size={14} />
            Start again
          </button>

        </main>
      )}


      {celebrating && <Celebration />}

    </div>
  );
}


export default App;
