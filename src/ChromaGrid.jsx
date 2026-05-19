import { useEffect, useRef } from 'react';
import './ChromaGrid.css';

const demo = [
  {
    image: 'https://i.pravatar.cc/300?img=1',
    title: 'Sarah Johnson',
    subtitle: 'Frontend Developer',
    handle: '@sarahjohnson',
    borderColor: '#3B82F6',
    gradient: 'linear-gradient(145deg, #3B82F6, #000)',
    url: 'https://github.com/sarahjohnson'
  },
  {
    image: 'https://i.pravatar.cc/300?img=2',
    title: 'Mike Chen',
    subtitle: 'Backend Engineer',
    handle: '@mikechen',
    borderColor: '#10B981',
    gradient: 'linear-gradient(180deg, #10B981, #000)',
    url: 'https://linkedin.com/in/mikechen'
  }
];

export default function ChromaGrid({
  items,
  className = '',
  radius = 300,
  columns = 3,
  damping = 0.45,
  fadeOut = 0.6
}) {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const frameRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    posRef.current = { x: rect.width / 2, y: rect.height / 2 };
    targetRef.current = { ...posRef.current };
    el.style.setProperty('--x', `${posRef.current.x}px`);
    el.style.setProperty('--y', `${posRef.current.y}px`);

    const tick = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * damping;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * damping;
      el.style.setProperty('--x', `${posRef.current.x}px`);
      el.style.setProperty('--y', `${posRef.current.y}px`);
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [damping]);

  const handleMove = (event) => {
    const rect = rootRef.current.getBoundingClientRect();
    targetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    if (fadeRef.current) fadeRef.current.style.opacity = '0';
  };

  const handleLeave = () => {
    if (fadeRef.current) {
      fadeRef.current.style.transitionDuration = `${fadeOut}s`;
      fadeRef.current.style.opacity = '1';
    }
  };

  const handleCardClick = (url) => {
    if (!url) return;
    if (url.startsWith('#')) {
      window.location.hash = url;
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{ '--r': `${radius}px`, '--cols': columns }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((card, index) => (
        <article
          className={`chroma-card ${card.more ? 'chroma-more-card' : ''}`}
          key={index}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(card.url)}
          style={{
            '--card-border': card.borderColor || 'transparent',
            '--card-gradient': card.gradient,
            cursor: card.url ? 'pointer' : 'default'
          }}
        >
          {card.more ? (
            <span className="chroma-more-text">点击查看更多</span>
          ) : (
            <>
              <div className="chroma-img-wrapper">
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
              <footer className="chroma-info">
                <h3 className="name">{card.title}</h3>
                {card.handle && <span className="handle">{card.handle}</span>}
                <p className="role">{card.subtitle}</p>
                {card.location && <span className="location">{card.location}</span>}
              </footer>
            </>
          )}
        </article>
      ))}
    </div>
  );
}
