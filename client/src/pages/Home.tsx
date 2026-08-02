import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';

// Gallery data
const galleryImages = [
  'https://media1.tenor.com/m/aOi3KTDW8aAAAAAC/cute-so-cute.gif',
  'https://media.tenor.com/zHk9ZfeUNyIAAAAi/cat-blush.gif',
  'https://i.pinimg.com/236x/cf/72/55/cf7255ae7344ce44e62f784fe160ca0d.jpg',
  'https://godwinks.com/cdn/shop/articles/Screen_Shot_2020-02-09_at_6.02.51_AM_1024x1024.png?v=1581247204',
  'https://media1.tenor.com/m/9EWwYOJnM_oAAAAC/cute-cats.gif',
  'https://static.vecteezy.com/system/resources/thumbnails/069/826/496/small/cute-gray-kitten-wearing-a-pink-bow-sits-inside-a-paper-bag-photo.jpg',
  'https://img.freepik.com/premium-photo/cute-dogs-couple-love-with-hearts-3d-render-illustration_691560-7135.jpg',
  'https://ichef.bbci.co.uk/images/ic/640x360/p0hjd8f0.jpg',
  'https://i.pinimg.com/736x/a3/98/97/a39897813f0ea964ef8cf69c6976322a.jpg',
];

const galleryGifs = [
  'https://media.tenor.com/mfWIcgf_ao8AAAAi/minions-minion.gif',
  'https://media.tenor.com/W_4cIjlMTZsAAAAi/cc.gif',
  'https://media.tenor.com/SFy5Za0DyMEAAAAi/erm-fingers.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpwaGZicWxqbmR6Z3Z2Z3Znbnh4Y2R0Z3VxeWZvY3p3emU1d2ZtOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/chzz1FQgqhytWRWbp3/giphy.gif',
  'https://media1.tenor.com/m/_WZy7E7hoTcAAAAd/cat-smile.gif',
  'https://media1.tenor.com/m/YonJHRH2-94AAAAd/cat-tiktok.gif',
  'https://media1.tenor.com/m/X-jA_vmTHUYAAAAd/yapapa-yapapa-cat.gif',
  'https://media.tenor.com/2KrmhQzy6mIAAAAi/cute-bear-silvia-emoji.gif',
  'https://media1.tenor.com/m/4HJ2V6mgJVQAAAAC/cute-cats-dancing.gif',
  'https://media1.tenor.com/m/YFolBZSo8UIAAAAd/123.gif',
  'https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXN6bjF6bm56bm56bm56bm56bm56bm56bm56bm56bm56bm56JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/111ebonMs90YLu/giphy.gif',
];

const galleryTexts = [
  'You are one in a Minion!',
  "You're the cat's pajamas.",
  "I'm bananas for you!",
  "You're absolutely purr-fect.",
  'Will you be my partner in crime?',
  'I love you more than a Minion loves "Bello!"',
  'Life without you would be a catastrophe.',
  "You're the sprinkles on my cupcake.",
  'Every day with you is a new adventure.',
  "I'd chase you across a thousand yarn balls.",
  "You're the reason my tail wags.",
  'Crazy for you, minion-style.',
  'You + Me = Fur-ever.',
  'You stole my heart, keep it warm.',
  "Let's cuddle like kittens all day.",
  'My love for you is louder than a Minion laugh.',
  "You're my favorite hello and hardest goodbye.",
  "Together we're the perfect pair.",
];

const colorCombos = [
  { bg: '#581c87', card: '#9333ea', text: '#ffffff', label: 'Evil Minion Purple' },
  { bg: '#fef3c7', card: '#fbbf24', text: '#451a03', label: 'Golden Ginger Cat' },
  { bg: '#171717', card: '#262626', text: '#facc15', label: 'Black Cat & Neon' },
  { bg: '#ecfeff', card: '#ffffff', text: '#0891b2', label: 'Fluffy Unicorn' },
  { bg: '#f0fdf4', card: '#ffffff', text: '#166534', label: 'Matcha Date' },
  { bg: '#fff1f2', card: '#ffe4e6', text: '#9f1239', label: 'Strawberry Cream' },
  { bg: '#faf5ff', card: '#ffffff', text: '#581c87', label: 'Soft Lavender' },
  { bg: '#0f172a', card: '#1e293b', text: '#38bdf8', label: 'Space Cadet' },
  { bg: '#4ade80', card: '#ffffff', text: '#064e3b', label: 'Lucky Clover' },
  { bg: '#fb7185', card: '#ffffff', text: '#881337', label: 'Bubblegum Pop' },
  { bg: '#ffedd5', card: '#fed7aa', text: '#7c2d12', label: 'Peach Cobbler' },
  { bg: '#2dd4bf', card: '#134e4a', text: '#ccfbf1', label: 'Retro Teal' },
  { bg: '#450a0a', card: '#7f1d1d', text: '#fca5a5', label: 'Velvet Rose' },
  { bg: '#064e3b', card: '#065f46', text: '#d1fae5', label: 'Emerald Love' },
  { bg: '#1e1b4b', card: '#312e81', text: '#e0e7ff', label: 'Midnight Serenade' },
  { bg: '#44403c', card: '#57534e', text: '#fafaf9', label: 'Warm Espresso' },
];

const noTexts = ['No', 'Are you sure?', 'Think again', 'Pretty please?', "Don't break my heart", 'Okay, last chance', 'You mean yes, right?'];

export default function Home() {
  const [noIndex, setNoIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [title, setTitle] = useState('Will you be my valentine?');
  const [celebration, setCelebration] = useState('Yay! You just made this day sparkly.');
  const [imageBefore, setImageBefore] = useState('');
  const [imageAfter, setImageAfter] = useState('');
  const [bgColor, setBgColor] = useState('#fff1f5');
  const [cardColor, setCardColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#2a0e13');
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeGallery, setActiveGallery] = useState('gifs');
  const [isShareMode, setIsShareMode] = useState(false);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  const yesGrowStep = 0.4;

  // Load from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.size > 0) {
      setIsShareMode(true);
      setTitle(params.get('title') || 'Will you be my valentine?');
      setCelebration(params.get('celebrate') || 'Yay! You just made this day sparkly.');
      setImageBefore(params.get('imageBefore') || '');
      setImageAfter(params.get('imageAfter') || '');
      setBgColor(params.get('bg') || '#fff1f5');
      setCardColor(params.get('card') || '#ffffff');
      setTextColor(params.get('text') || '#2a0e13');
    }
  }, []);

  const handleNoClick = () => {
    setNoIndex((prev) => (prev + 1) % noTexts.length);
    if (yesButtonRef.current && noButtonRef.current) {
      const yesRect = yesButtonRef.current.getBoundingClientRect();
      const noRect = noButtonRef.current.getBoundingClientRect();
      const yesRadius = Math.max(yesButtonRef.current.offsetWidth, yesButtonRef.current.offsetHeight) / 2;
      const noRadius = Math.max(noButtonRef.current.offsetWidth, noButtonRef.current.offsetHeight) / 2;
      const dx = noRect.left + noRect.width / 2 - (yesRect.left + yesRect.width / 2);
      const dy = noRect.top + noRect.height / 2 - (yesRect.top + yesRect.height / 2);
      const distance = Math.hypot(dx, dy);
      const targetScale = Math.max(1, (distance + noRadius) / yesRadius);
      setYesScale((prev) => Math.max(prev, Math.min(prev + yesGrowStep, targetScale)));
    }
  };

  const handleYesClick = () => {
    setShowCelebration(true);
    launchConfetti();
  };

  const launchConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ff5d7c', '#ffd166', '#7bdff2', '#b9fbc0', '#ff9f1c'];
    const pieces = Array.from({ length: 220 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 1.8 + Math.random() * 3.5,
      sway: Math.random() * 2 - 1,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
    }));

    let frame = 0;
    const maxFrames = 360;
    const gravity = 0.06;

    const animate = () => {
      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.speed += gravity;
        p.y += p.speed;
        p.x += p.sway;
        p.rotation += p.spin;
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
        if (p.y > canvas.height + 40) {
          p.y = -20 - Math.random() * canvas.height * 0.3;
          p.x = Math.random() * canvas.width;
          p.speed = 1.8 + Math.random() * 3.5;
        }
      });
      if (frame < maxFrames) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animate();
  };

  const generateLink = () => {
    const params = new URLSearchParams({
      title: title || 'Will you be my valentine?',
      celebrate: celebration || '',
      imageBefore: imageBefore || 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
      imageAfter: imageAfter || 'https://media.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif',
      bg: bgColor,
      card: cardColor,
      text: textColor,
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    setShareUrl(url);
  };

  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const useMedia = (url: string, type: 'before' | 'after') => {
    if (type === 'before') {
      setImageBefore(url);
    } else {
      setImageAfter(url);
    }
    scrollToSection('create-panel');
  };

  const useText = (text: string, type: 'before' | 'after') => {
    if (type === 'before') {
      setTitle(text);
    } else {
      setCelebration(text);
    }
    scrollToSection('create-panel');
  };

  const useColors = (combo: typeof colorCombos[0]) => {
    setBgColor(combo.bg);
    setCardColor(combo.card);
    setTextColor(combo.text);
    scrollToSection('create-panel');
  };

  if (isShareMode) {
    return (
      <div style={{ backgroundColor: bgColor, color: textColor, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <canvas ref={confettiCanvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }} />
        <a
          href={window.location.pathname}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 20,
            padding: '10px 16px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.9)',
            color: textColor,
            textDecoration: 'none',
            fontWeight: '600',
            border: `1px solid rgba(42, 14, 19, 0.15)`,
            boxShadow: '0 10px 24px rgba(42, 14, 19, 0.12)',
          }}
        >
          Create
        </a>
        <Card
          style={{
            backgroundColor: cardColor,
            color: textColor,
            width: 'min(620px, 94vw)',
            padding: '28px',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(42, 14, 19, 0.15)',
          }}
        >
          <div style={{ display: 'grid', gap: '24px', justifyItems: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '600' }}>
              {showCelebration ? 'Yay! You said yes!' : title}
            </div>
            {imageBefore && !showCelebration && (
              <img
                src={imageBefore}
                alt="Before"
                style={{
                  maxWidth: '80%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  marginTop: '12px',
                }}
              />
            )}
            {imageAfter && showCelebration && (
              <img
                src={imageAfter}
                alt="After"
                style={{
                  maxWidth: '80%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  marginTop: '12px',
                }}
              />
            )}
            {!showCelebration && (
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <button
                  ref={yesButtonRef}
                  onClick={handleYesClick}
                  style={{
                    background: 'rgb(0, 255, 42)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '120px',
                    boxShadow: '0 12px 28px rgba(0, 255, 47, 0.4)',
                    transform: `scale(${yesScale})`,
                    transition: 'transform 0.2s ease',
                  }}
                >
                  Yes
                </button>
                <button
                  ref={noButtonRef}
                  onClick={handleNoClick}
                  style={{
                    background: '#ff0000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '120px',
                    boxShadow: '0 12px 28px rgba(255, 0, 0, 0.4)',
                  }}
                >
                  {noTexts[noIndex]}
                </button>
              </div>
            )}
            {showCelebration && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: 'linear-gradient(120deg, #fff1b8, #ffd6e7)',
                  fontWeight: '700',
                  color: '#6b1b3a',
                  boxShadow: '0 12px 28px rgba(255, 93, 124, 0.2)',
                }}
              >
                {celebration}
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, minHeight: '100vh', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      <canvas ref={confettiCanvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }} />

      <header style={{ padding: '32px 7vw 0' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem', letterSpacing: '0.02em' }}>
          Valentine Studio
        </div>
      </header>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '32px',
          padding: '48px 7vw 40px',
          alignItems: 'center',
        }}
      >
        <Card
          style={{
            backgroundColor: cardColor,
            color: textColor,
            padding: '32px',
            boxShadow: '0 20px 60px rgba(42, 14, 19, 0.15)',
            borderRadius: '24px',
          }}
        >
          <div style={{ display: 'grid', gap: '24px', justifyItems: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '600' }}>
              {showCelebration ? 'Yay! You said yes!' : title}
            </div>
            {imageBefore && !showCelebration && (
              <img
                src={imageBefore}
                alt="Before"
                style={{
                  maxWidth: '80%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  marginTop: '12px',
                }}
              />
            )}
            {imageAfter && showCelebration && (
              <img
                src={imageAfter}
                alt="After"
                style={{
                  maxWidth: '80%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  marginTop: '12px',
                }}
              />
            )}
            {!showCelebration && (
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <button
                  ref={yesButtonRef}
                  onClick={handleYesClick}
                  style={{
                    background: 'rgb(0, 255, 42)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '120px',
                    boxShadow: '0 12px 28px rgba(0, 255, 47, 0.4)',
                    transform: `scale(${yesScale})`,
                    transition: 'transform 0.2s ease',
                  }}
                >
                  Yes
                </button>
                <button
                  ref={noButtonRef}
                  onClick={handleNoClick}
                  style={{
                    background: '#ff0000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '120px',
                    boxShadow: '0 12px 28px rgba(255, 0, 0, 0.4)',
                  }}
                >
                  {noTexts[noIndex]}
                </button>
              </div>
            )}
            {showCelebration && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: 'linear-gradient(120deg, #fff1b8, #ffd6e7)',
                  fontWeight: '700',
                  color: '#6b1b3a',
                  boxShadow: '0 12px 28px rgba(255, 93, 124, 0.2)',
                }}
              >
                {celebration}
              </div>
            )}
          </div>
        </Card>

        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '0 0 12px' }}>
            Create a sharable valentine moment
          </h1>
          <p style={{ margin: '0 0 16px', color: '#6b4a52' }}>
            Customize the text, colors, and image. Save your favorite version and share it instantly.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Button onClick={() => scrollToSection('create-panel')} variant="outline">
              Start Creating
            </Button>
            <Button onClick={() => scrollToSection('gallery-section')} variant="outline">
              Explore Gallery
            </Button>
          </div>
        </div>
      </section>

      <section
        id="create-panel"
        style={{
          padding: '24px 7vw 64px',
          display: 'grid',
          gap: '28px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        <Card
          style={{
            backgroundColor: cardColor,
            color: textColor,
            padding: '24px',
            boxShadow: '0 20px 60px rgba(42, 14, 19, 0.15)',
            borderRadius: '24px',
          }}
        >
          <h2 style={{ fontFamily: "'Fraunces', serif", margin: '0 0 12px' }}>Create</h2>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Headline</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Will you be my valentine?" />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Message After Yes</label>
            <Input value={celebration} onChange={(e) => setCelebration(e.target.value)} placeholder="Yay! You just made this day sparkly." />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Image/GIF Before Yes</label>
            <Input value={imageBefore} onChange={(e) => setImageBefore(e.target.value)} placeholder="https://..." />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Image/GIF After Yes</label>
            <Input value={imageAfter} onChange={(e) => setImageAfter(e.target.value)} placeholder="https://..." />
          </div>

          <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Background Color</label>
              <Input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Card Color</label>
              <Input type="color" value={cardColor} onChange={(e) => setCardColor(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Text Color</label>
              <Input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', marginBottom: '12px' }}>
            <Button onClick={generateLink} style={{ background: 'linear-gradient(135deg, #ff7aa2, #ffb469)', color: '#fff' }}>
              Generate Link
            </Button>
            <Button variant="outline">Save</Button>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}>Shareable Link</label>
            <Input value={shareUrl} readOnly placeholder="Generate a link first" />
          </div>

          <Button
            onClick={copyLink}
            disabled={!shareUrl}
            variant="ghost"
            style={{
              background: 'transparent',
              border: '1px dashed rgba(42, 14, 19, 0.3)',
              color: textColor,
              boxShadow: 'none',
              width: '100%',
            }}
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </Card>

        <Card
          style={{
            backgroundColor: bgColor,
            color: textColor,
            padding: '24px',
            boxShadow: '0 20px 60px rgba(42, 14, 19, 0.15)',
            borderRadius: '24px',
          }}
        >
          <h2 style={{ fontFamily: "'Fraunces', serif", margin: '0 0 12px' }}>Preview</h2>
          <Card
            style={{
              backgroundColor: cardColor,
              color: textColor,
              padding: '32px',
              borderRadius: '24px',
              display: 'grid',
              gap: '16px',
            }}
          >
            <div style={{ display: 'grid', gap: '24px', justifyItems: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: '600' }}>{title}</div>
              {imageBefore && (
                <img
                  src={imageBefore}
                  alt="Preview"
                  style={{
                    maxWidth: '80%',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    marginTop: '12px',
                  }}
                />
              )}
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button
                  disabled
                  style={{
                    background: 'rgb(0, 255, 42)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'default',
                    width: '120px',
                    boxShadow: 'none',
                  }}
                >
                  Yes
                </button>
                <button
                  disabled
                  style={{
                    background: '#ff0000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'default',
                    width: '120px',
                    boxShadow: 'none',
                  }}
                >
                  No
                </button>
              </div>
              <div
                style={{
                  marginTop: '12px',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: 'linear-gradient(120deg, #fff1b8, #ffd6e7)',
                  fontWeight: '700',
                  color: '#6b1b3a',
                  boxShadow: '0 12px 28px rgba(255, 93, 124, 0.2)',
                  opacity: 0.9,
                }}
              >
                {celebration}
              </div>
            </div>
          </Card>
        </Card>
      </section>

      <section
        id="gallery-section"
        style={{
          padding: '24px 7vw 80px',
          display: 'grid',
          gap: '24px',
        }}
      >
        <div>
          <h2 style={{ fontFamily: "'Fraunces', serif", margin: '0 0 8px' }}>Gallery</h2>
          <p style={{ margin: '0', color: '#6b4a52' }}>
            Explore images, GIFs, texts, and color palettes. Copy what you love or tap Use for colors.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['gifs', 'images', 'texts', 'colors'].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveGallery(tab)}
              variant={activeGallery === tab ? 'default' : 'outline'}
              style={
                activeGallery === tab
                  ? { background: 'linear-gradient(135deg, #ff7aa2, #ffb469)', color: '#fff', border: 'none' }
                  : {}
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </div>

        {activeGallery === 'gifs' && (
          <div style={{ display: 'grid', gap: '14px' }}>
            <h3 style={{ margin: '0', fontSize: '1.1rem' }}>GIFs</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {galleryGifs.map((gif, idx) => (
                <Card
                  key={idx}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '20px',
                    border: '1px solid rgba(42, 14, 19, 0.08)',
                    boxShadow: '0 16px 34px rgba(42, 14, 19, 0.08)',
                    overflow: 'hidden',
                    display: 'grid',
                    gap: '12px',
                    padding: '14px',
                  }}
                >
                  <img src={gif} alt="GIF" style={{ width: '100%', height: '160px', borderRadius: '14px', objectFit: 'cover' }} />
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <Input readOnly value={gif} style={{ fontSize: '0.82rem', margin: '0' }} />
                    <Button onClick={() => useMedia(gif, 'before')} variant="outline" size="sm">
                      Use Before Yes
                    </Button>
                    <Button onClick={() => useMedia(gif, 'after')} variant="outline" size="sm">
                      Use After Yes
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeGallery === 'images' && (
          <div style={{ display: 'grid', gap: '14px' }}>
            <h3 style={{ margin: '0', fontSize: '1.1rem' }}>Images</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {galleryImages.map((img, idx) => (
                <Card
                  key={idx}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '20px',
                    border: '1px solid rgba(42, 14, 19, 0.08)',
                    boxShadow: '0 16px 34px rgba(42, 14, 19, 0.08)',
                    overflow: 'hidden',
                    display: 'grid',
                    gap: '12px',
                    padding: '14px',
                  }}
                >
                  <img src={img} alt="Image" style={{ width: '100%', height: '160px', borderRadius: '14px', objectFit: 'cover' }} />
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <Input readOnly value={img} style={{ fontSize: '0.82rem', margin: '0' }} />
                    <Button onClick={() => useMedia(img, 'before')} variant="outline" size="sm">
                      Use Before Yes
                    </Button>
                    <Button onClick={() => useMedia(img, 'after')} variant="outline" size="sm">
                      Use After Yes
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeGallery === 'texts' && (
          <div style={{ display: 'grid', gap: '14px' }}>
            <h3 style={{ margin: '0', fontSize: '1.1rem' }}>Texts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {galleryTexts.map((text, idx) => (
                <Card
                  key={idx}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '20px',
                    border: '1px solid rgba(42, 14, 19, 0.08)',
                    boxShadow: '0 16px 34px rgba(42, 14, 19, 0.08)',
                    overflow: 'hidden',
                    display: 'grid',
                    gap: '12px',
                    padding: '14px',
                  }}
                >
                  <div style={{ fontWeight: '600', fontSize: '1rem', lineHeight: '1.4' }}>{text}</div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <Button onClick={() => useText(text, 'before')} variant="outline" size="sm">
                      Use Before Yes
                    </Button>
                    <Button onClick={() => useText(text, 'after')} variant="outline" size="sm">
                      Use After Yes
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeGallery === 'colors' && (
          <div style={{ display: 'grid', gap: '14px' }}>
            <h3 style={{ margin: '0', fontSize: '1.1rem' }}>Color Combos</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {colorCombos.map((combo, idx) => (
                <Card
                  key={idx}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '20px',
                    border: '1px solid rgba(42, 14, 19, 0.08)',
                    boxShadow: '0 16px 34px rgba(42, 14, 19, 0.08)',
                    overflow: 'hidden',
                    display: 'grid',
                    gap: '12px',
                    padding: '14px',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    <div style={{ height: '42px', borderRadius: '12px', backgroundColor: combo.bg, border: '1px solid rgba(42, 14, 19, 0.12)' }} />
                    <div style={{ height: '42px', borderRadius: '12px', backgroundColor: combo.card, border: '1px solid rgba(42, 14, 19, 0.12)' }} />
                    <div style={{ height: '42px', borderRadius: '12px', backgroundColor: combo.text, border: '1px solid rgba(42, 14, 19, 0.12)' }} />
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#6b4a52' }}>{combo.label}</div>
                  <Button onClick={() => useColors(combo)} variant="outline" size="sm">
                    Use Colors
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer style={{ padding: '24px 7vw 40px', color: '#6b4a52' }}>
        Built for sweet moments. Customize, save, and share.
      </footer>
    </div>
  );
}
