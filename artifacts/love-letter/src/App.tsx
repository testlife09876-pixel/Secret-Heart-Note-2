import { useEffect, useRef, useState } from 'react';
import { Heart, ChevronDown, ChevronRight, X, Volume2, VolumeX, Sparkles, ArrowDown, Quote } from 'lucide-react';

// ================= EDIT YOUR LOVE LETTER HERE =================
// This is the only section you need to edit. Replace the names, words, dates,
// photos, wishes, and optional music URL below; the experience updates itself.
const letterContent = {
  recipientName: 'Clara',
  senderName: 'Julian',
  date: 'October 14, 2024',
  letterTitle: 'A few things I hope you never forget',
  loveLetter: [
    'There are people who enter your life like a season, and then there are the rare ones who make the whole world feel like home. You are the second kind.',
    'I love the way you make ordinary Tuesdays feel worth remembering. The way you listen with your whole face. The quiet courage you carry. The little laugh you try to hide when something catches you off guard.',
    'I do not love you because life is always easy with you. I love you because beside you, even the difficult days feel honest, and the good ones feel like they have somewhere beautiful to land.',
    'If I could give you one thing, it would be the ability to see yourself through my eyes — just once. You would understand why I keep choosing you, in every room, in every version of our future.',
  ],
  reasons: [
    { title: 'Your brave softness', detail: 'You care deeply without making a performance of it. That quiet tenderness changes every room you enter.' },
    { title: 'The way you notice', detail: 'You remember the small things: how I take my tea, the song I skipped, the story I almost did not tell.' },
    { title: 'Our ordinary magic', detail: 'A grocery run, a shared look across a crowded table, your hand finding mine without thinking — it is all enough.' },
    { title: 'You make room', detail: 'With you, I never have to be less complicated, less hopeful, or less myself.' },
  ],
  memories: [
    { image: 'https://placehold.co/1000x1200/e8d8cf/6d3047?text=Sunday+light', caption: 'Sunday light', alt: 'Soft morning light over a quiet table' },
    { image: 'https://placehold.co/1200x900/dccbc1/522033?text=The+long+way+home', caption: 'The long way home', alt: 'A winding road in warm evening tones' },
    { image: 'https://placehold.co/900x1200/eadfc8/7b5c4b?text=Two+coffees', caption: 'Two coffees, always', alt: 'Two warm cups beside an open notebook' },
    { image: 'https://placehold.co/1200x1000/d8c4c4/713049?text=Little+celebrations', caption: 'Little celebrations', alt: 'A small table set for a quiet celebration' },
    { image: 'https://placehold.co/1000x1200/e6d6bf/5e3e43?text=Where+we+wander', caption: 'Where we wander', alt: 'A path through tall grass under pale skies' },
    { image: 'https://placehold.co/1200x900/e1d0cf/6f263d?text=Still+my+favorite', caption: 'Still my favorite view', alt: 'A gentle sunset through a window' },
  ],
  storyTimeline: [
    { date: 'The beginning', title: 'The first hello', detail: 'Somehow, a simple hello became the start of my favorite conversation.' },
    { date: 'The little things', title: 'When it became us', detail: 'It was not one grand moment. It was a hundred tiny ones, quietly adding up.' },
    { date: 'Right now', title: 'The life we are making', detail: 'Somewhere between the plans and the detours, we built a place that feels like ours.' },
    { date: 'Always ahead', title: 'More chapters', detail: 'There is so much still to see, and I want the front-row seat beside you.' },
  ],
  wishes: [
    'More mornings where the coffee goes cold because we are talking.',
    'A home full of music, books, and reasons to stay in.',
    'The courage to keep choosing wonder, even on the unremarkable days.',
  ],
  finalMessage: 'In every lifetime I would still find my way back to you.',
  musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
};

type Memory = (typeof letterContent.memories)[number];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function useScrollReveals() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [letterExpanded, setLetterExpanded] = useState(false);
  const [lightboxMemory, setLightboxMemory] = useState<Memory | null>(null);
  const [isFinalRevealed, setIsFinalRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useScrollReveals();

  const openEnvelope = () => {
    setIsOpened(true);
    window.setTimeout(() => scrollToSection('letter'), 720);
  };

  const toggleMusic = () => {
    if (!audioRef.current || !letterContent.musicUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      void audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="love-app paper-grain min-h-[100dvh]">
      <audio ref={audioRef} src={letterContent.musicUrl} loop onEnded={() => setIsPlaying(false)} />

      <header className="relative flex min-h-[100dvh] flex-col px-5 pb-12 pt-5 md:px-10 md:pt-8">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between" aria-label="Main navigation">
          <button type="button" data-testid="button-home-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-mark text-3xl text-[#712f46]">
            {letterContent.senderName.charAt(0)} <span className="mx-1 text-[#c47a78]">/</span> {letterContent.recipientName.charAt(0)}
          </button>
          <div className="hidden items-center gap-8 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#713049] md:flex">
            <button type="button" data-testid="button-nav-letter" onClick={() => scrollToSection('letter')}>The letter</button>
            <button type="button" data-testid="button-nav-memories" onClick={() => scrollToSection('memories')}>Our memories</button>
            <button type="button" data-testid="button-nav-wishes" onClick={() => scrollToSection('wishes')}>For the future</button>
          </div>
          {letterContent.musicUrl && (
            <button
              type="button"
              data-testid="button-toggle-music-top"
              onClick={toggleMusic}
              aria-label={isPlaying ? 'Pause the music' : 'Play the music'}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#713049]/20 bg-[#fcf7ef]/60 text-[#713049] transition hover:border-[#713049]/50 hover:bg-[#fcf7ef]"
            >
              {isPlaying ? <Volume2 size={17} strokeWidth={1.7} /> : <VolumeX size={17} strokeWidth={1.7} />}
            </button>
          )}
        </nav>

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center text-center">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <Heart className="float-heart absolute left-[5%] top-[18%] h-5 w-5 rotate-[-15deg] text-[#c47a78]/60" strokeWidth={1} />
            <Heart className="float-heart absolute right-[8%] top-[27%] h-4 w-4 text-[#b4945f]/65" strokeWidth={1.5} />
            <Heart className="float-heart absolute bottom-[12%] left-[18%] h-3 w-3 text-[#713049]/35" strokeWidth={1.5} />
          </div>
          <p className="eyebrow mb-6">A private little keepsake</p>
          <h1 className="font-display max-w-3xl text-[clamp(3.4rem,16vw,8.8rem)] leading-[.78] tracking-[-.045em] text-[#522033]">
            For {letterContent.recipientName}
          </h1>
          <p className="mt-7 max-w-md font-display text-xl italic leading-relaxed text-[#713049]/75 md:text-2xl">
            Something I wrote down so you could keep it.
          </p>

          <div className={`envelope-wrap mt-14 w-[min(82vw,23rem)] md:mt-16 ${isOpened ? 'is-open' : ''}`}>
            <div className={`envelope relative aspect-[1.42] ${isOpened ? 'is-open' : ''}`} aria-label={isOpened ? 'Opened envelope' : 'Sealed envelope'}>
              <div className="absolute inset-0 rounded-[0.2rem] bg-[#c88478] shadow-[0_22px_36px_rgba(82,32,51,.18)]" />
              <div className="absolute inset-0 z-[1] overflow-hidden rounded-[0.2rem]">
                <div className="absolute inset-0 bg-[#b9706e]" style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }} />
                <div className="absolute inset-0 bg-[#d69485]" style={{ clipPath: 'polygon(0 100%, 34% 48%, 50% 65%, 66% 48%, 100% 100%)' }} />
              </div>
              <div className="envelope-letter absolute left-[8%] right-[8%] top-[4%] z-0 flex aspect-[.7] items-start justify-center bg-[#fcf7ef] p-4 shadow-[0_4px_10px_rgba(82,32,51,.15)] md:p-6">
                <span className="font-display text-lg italic text-[#713049]">for you, always</span>
              </div>
              <div className="envelope-flap absolute left-0 right-0 top-0 z-[3] aspect-[2] bg-[#da9487] shadow-[0_4px_6px_rgba(82,32,51,.08)]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
              <div className="envelope-seal absolute left-1/2 top-1/2 z-[4] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#712f46] text-[#f6dfd1] shadow-[0_4px_10px_rgba(82,32,51,.2)]">
                <Heart size={20} fill="currentColor" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {!isOpened ? (
            <button type="button" data-testid="button-open-envelope" onClick={openEnvelope} className="wax-button mt-10 flex min-h-14 items-center gap-3 rounded-full bg-[#712f46] px-7 text-sm font-semibold tracking-[.04em] text-[#fcf7ef]">
              Open your letter <ChevronRight size={17} />
            </button>
          ) : (
            <button type="button" data-testid="button-scroll-to-letter" onClick={() => scrollToSection('letter')} className="mt-9 flex items-center gap-2 text-sm font-semibold text-[#712f46]">
              Read on <ArrowDown size={16} />
            </button>
          )}
        </div>
        <div className="flex items-center justify-center gap-3 text-[#713049]/45">
          <span className="h-px w-9 bg-current" />
          <span className="text-[0.62rem] font-bold uppercase tracking-[.2em]">Take your time</span>
          <span className="h-px w-9 bg-current" />
        </div>
      </header>

      <main>
        <section id="letter" className="scroll-mt-8 px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-3xl">
            <div className="reveal mb-12 flex items-center justify-between">
              <p className="eyebrow">{letterContent.date}</p>
              <Heart className="h-5 w-5 text-[#c47a78]" fill="currentColor" strokeWidth={1} />
            </div>
            <article className="letter-paper reveal rounded-[.2rem] px-8 py-12 md:px-24 md:py-20">
              <div className="relative">
                <p className="font-mark text-5xl text-[#712f46] md:text-6xl">Dear {letterContent.recipientName},</p>
                <h2 data-testid="text-letter-title" className="font-display mt-10 max-w-xl text-4xl leading-[.95] text-[#522033] md:text-6xl">{letterContent.letterTitle}</h2>
                <div className={`mt-9 space-y-6 font-display text-[1.34rem] leading-[1.48] text-[#482633]/85 md:text-[1.5rem] ${letterExpanded ? '' : 'max-h-[18.6rem] overflow-hidden'}`}>
                  {letterContent.loveLetter.map((paragraph, index) => (
                    <p key={paragraph} data-testid={`text-letter-paragraph-${index}`}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <button type="button" data-testid="button-letter-read-more" onClick={() => setLetterExpanded((current) => !current)} className="flex min-h-11 items-center gap-2 text-sm font-semibold text-[#712f46]">
                    {letterExpanded ? 'Fold it back up' : 'Read the whole thing'} <ChevronDown className={`transition-transform ${letterExpanded ? 'rotate-180' : ''}`} size={16} />
                  </button>
                  <span className="text-[#713049]/30">/</span>
                  <span className="font-display text-xl italic text-[#713049]/70">With all my love,</span>
                </div>
                <p className="font-mark mt-3 text-4xl text-[#712f46]">{letterContent.senderName}</p>
              </div>
            </article>
          </div>
        </section>

        <section id="reasons" className="scroll-mt-8 border-t border-[#713049]/10 px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="reveal max-w-xl">
              <p className="eyebrow">A non-exhaustive list</p>
              <h2 className="font-display mt-4 text-5xl leading-[.9] text-[#522033] md:text-7xl">Reasons I keep<br /><em>falling for you.</em></h2>
            </div>
            <div className="mt-14 grid gap-x-12 gap-y-0 md:mt-20 md:grid-cols-2">
              {letterContent.reasons.map((reason, index) => (
                <article key={reason.title} className="reveal flex gap-5 border-t border-[#713049]/15 py-7 md:py-9" style={{ transitionDelay: `${index * 80}ms` }}>
                  <span className="font-display text-2xl italic text-[#c47a78]">0{index + 1}</span>
                  <div>
                    <h3 data-testid={`text-reason-title-${index}`} className="font-display text-3xl text-[#712f46]">{reason.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-7 text-[#482633]/70">{reason.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="memories" className="scroll-mt-8 bg-[#713049] px-5 py-24 text-[#f7eee4] md:px-10 md:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="reveal flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <p className="eyebrow !text-[#e4ae99]">Saved in my mind</p>
                <h2 className="font-display mt-4 text-5xl leading-[.9] md:text-7xl">The little<br /><em>evidence.</em></h2>
              </div>
              <p className="max-w-xs text-sm leading-7 text-[#f7eee4]/65">Not every beautiful moment needs a photograph. These are the ones I wish I could press between the pages.</p>
            </div>
            <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-3 md:gap-5">
              {letterContent.memories.map((memory, index) => (
                <button type="button" data-testid={`button-memory-${index}`} key={memory.caption} onClick={() => setLightboxMemory(memory)} className={`memory-card group relative overflow-hidden text-left ${index === 1 || index === 4 ? 'md:translate-y-12' : ''} ${index === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
                  <div className={`overflow-hidden bg-[#522033] ${index === 2 ? 'aspect-[1.7] md:aspect-[.8]' : 'aspect-[.82]'}`}>
                    <img src={memory.image} alt={memory.alt} className="memory-image h-full w-full object-cover opacity-90" />
                  </div>
                  <span className="absolute inset-x-3 bottom-3 font-display text-lg text-[#fff7ee] drop-shadow-md md:inset-x-5 md:bottom-5 md:text-2xl">{memory.caption}</span>
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f7eee4]/90 text-[#713049] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true"><Sparkles size={15} /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="scroll-mt-8 px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-5xl">
            <div className="reveal text-center">
              <p className="eyebrow">Our story, in a few scenes</p>
              <h2 className="font-display mt-4 text-5xl leading-[.9] text-[#522033] md:text-7xl">It was always<br /><em>the small things.</em></h2>
            </div>
            <div className="relative mt-16 md:mt-24">
              <div className="timeline-line absolute bottom-0 left-4 top-0 w-px md:left-1/2 md:-translate-x-1/2" />
              <div className="space-y-12 md:space-y-0">
                {letterContent.storyTimeline.map((moment, index) => (
                  <article key={moment.title} className={`reveal relative flex pl-12 md:w-1/2 md:pl-0 ${index % 2 === 0 ? 'md:pr-20' : 'md:ml-auto md:pl-20'}`} style={{ transitionDelay: `${index * 120}ms` }}>
                    <span className="absolute left-[.58rem] top-1 h-3 w-3 rounded-full border-2 border-[#f5eadc] bg-[#c47a78] shadow-[0_0_0_1px_#c47a78] md:left-auto md:right-[-.35rem]">
                      {index % 2 === 1 && <span className="hidden md:block" />}
                    </span>
                    <div className="border-t border-[#713049]/15 pt-4">
                      <p className="eyebrow !text-[#c47a78]">{moment.date}</p>
                      <h3 className="font-display mt-2 text-3xl text-[#712f46] md:text-4xl">{moment.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#482633]/70">{moment.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="wishes" className="scroll-mt-8 bg-[#ead6c5] px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">A few wishes</p>
                <h2 className="font-display mt-4 max-w-xl text-5xl leading-[.9] text-[#522033] md:text-7xl">For all the days<br /><em>still waiting.</em></h2>
              </div>
              <Quote className="hidden h-12 w-12 text-[#c47a78]/65 md:block" strokeWidth={1} />
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
              {letterContent.wishes.map((wish, index) => (
                <article key={wish} className="wish-card reveal flex min-h-56 flex-col justify-between border border-[#713049]/15 bg-[#fcf7ef]/75 p-7 shadow-[0_12px_30px_rgba(82,32,51,.06)]" style={{ transitionDelay: `${index * 100}ms` }}>
                  <Heart className="h-5 w-5 text-[#c47a78]" fill={index === 1 ? 'currentColor' : 'none'} strokeWidth={1.3} />
                  <p className="font-display text-[1.65rem] leading-tight text-[#712f46]">{wish}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="final" className="relative overflow-hidden bg-[#522033] px-5 py-28 text-center text-[#f7eee4] md:py-44">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e4ae99]/15" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e4ae99]/10" />
          {!isFinalRevealed ? (
            <div className="reveal relative">
              <p className="eyebrow !text-[#e4ae99]">One last thing</p>
              <h2 className="font-display mx-auto mt-5 max-w-2xl text-5xl leading-[.9] md:text-8xl">There is something<br /><em>I want you to know.</em></h2>
              <button type="button" data-testid="button-reveal-final" onClick={() => setIsFinalRevealed(true)} className="wax-button mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#e4ae99] px-8 text-sm font-semibold text-[#522033]">
                Open the final note <ChevronRight size={17} />
              </button>
            </div>
          ) : (
            <div className="reveal is-visible relative">
              <Heart className="mx-auto h-7 w-7 text-[#e4ae99]" fill="currentColor" strokeWidth={1} />
              <p data-testid="text-final-message" className="font-display mx-auto mt-8 max-w-3xl text-5xl leading-[.9] md:text-8xl">{letterContent.finalMessage}</p>
              <p className="mt-9 font-mark text-4xl text-[#e4ae99]">{letterContent.senderName}</p>
              <button type="button" data-testid="button-close-final" onClick={() => setIsFinalRevealed(false)} className="mt-9 text-xs font-bold uppercase tracking-[.2em] text-[#f7eee4]/55 underline decoration-[#e4ae99]/50 underline-offset-4">Keep this moment folded</button>
            </div>
          )}
        </section>
      </main>

      <footer className="flex flex-col items-center gap-5 bg-[#522033] px-5 pb-10 text-center text-[#f7eee4]/55">
        <div className="h-px w-16 bg-[#e4ae99]/40" />
        <p className="font-display text-2xl italic">Made for one person, in particular.</p>
        <p className="text-[0.62rem] font-bold uppercase tracking-[.2em]">{letterContent.date} · {letterContent.senderName}</p>
      </footer>

      {letterContent.musicUrl && (
        <button type="button" data-testid="button-toggle-music-floating" onClick={toggleMusic} aria-label={isPlaying ? 'Pause the music' : 'Play the music'} className="fixed bottom-5 left-5 z-30 flex min-h-12 items-center gap-2 rounded-full border border-[#713049]/20 bg-[#fcf7ef]/90 px-4 text-xs font-semibold text-[#713049] shadow-[0_8px_22px_rgba(82,32,51,.12)] backdrop-blur-sm">
          {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span className="hidden sm:inline">{isPlaying ? 'Playing softly' : 'Play the soundtrack'}</span>
        </button>
      )}

      {lightboxMemory && (
        <div className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[#2d1420]/90 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={lightboxMemory.caption}>
          <button type="button" data-testid="button-close-lightbox" onClick={() => setLightboxMemory(null)} aria-label="Close memory" className="absolute right-5 top-5 flex min-h-12 min-w-12 items-center justify-center rounded-full border border-[#f7eee4]/30 text-[#f7eee4] transition hover:bg-[#f7eee4]/10">
            <X size={20} />
          </button>
          <figure className="max-h-[90dvh] max-w-3xl">
            <img src={lightboxMemory.image} alt={lightboxMemory.alt} className="max-h-[78dvh] w-auto max-w-full object-contain shadow-[0_18px_60px_rgba(0,0,0,.3)]" />
            <figcaption className="mt-4 text-center font-display text-2xl italic text-[#f7eee4]">{lightboxMemory.caption}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

export default App;