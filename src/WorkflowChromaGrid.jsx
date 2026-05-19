import { useEffect, useRef } from 'react';
import './WorkflowChromaGrid.css';

export default function WorkflowChromaGrid({
  items,
  className = '',
  radius = 300,
  columns = 4,
  damping = 0.45
}) {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

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
  };

  const handleCardMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };

  const handleCardClick = (url) => {
    if (!url) return;

    if (url.startsWith('#')) {
      window.location.hash = url;
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={rootRef}
      className={`workflow-grid ${className}`}
      style={{ '--r': `${radius}px`, '--cols': columns }}
      onPointerMove={handleMove}
    >
      {items.map((card, index) => (
        <article
          className="workflow-card"
          key={index}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(card.url)}
          style={{
            '--card-border': card.borderColor || 'transparent',
            '--card-gradient': card.gradient,
            cursor: card.url ? 'pointer' : 'default'
          }}
        >
          <div className="workflow-img-wrapper">
            <img src={card.image} alt={card.title} loading="lazy" />
          </div>
          <footer className="workflow-info">
            <h3 className="name">{card.title}</h3>
            {card.handle && <span className="handle">{card.handle}</span>}
            <p className="role">{card.subtitle}</p>
          </footer>
        </article>
      ))}
    </div>
  );
}
