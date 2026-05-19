import { useEffect, useMemo, useRef } from 'react';

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  from = { opacity: 0, y: 40 },
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) {
  const completedRef = useRef(false);
  const chars = useMemo(() => Array.from(text || ''), [text]);
  const lastAnimatedIndex = chars.reduce((last, char, index) => (char.trim() ? index : last), -1);
  const Tag = tag || 'p';

  useEffect(() => {
    completedRef.current = false;
  }, [text]);

  const handleAnimationEnd = (index) => {
    if (index !== lastAnimatedIndex || completedRef.current) return;
    completedRef.current = true;
    onLetterAnimationComplete?.();
  };

  return (
    <Tag
      className={`split-parent ${className}`}
      style={{
        textAlign,
        '--split-duration': `${duration}s`,
        '--split-from-y': `${from?.y ?? 40}px`
      }}
    >
      {chars.map((char, index) => {
        const isSpace = char === ' ';

        return (
          <span
            className={isSpace ? 'split-space' : 'split-char'}
            key={`${char}-${index}`}
            style={{ '--split-delay': `${index * delay}ms` }}
            aria-hidden="true"
            onAnimationEnd={() => handleAnimationEnd(index)}
          >
            {isSpace ? '\u00a0' : char}
          </span>
        );
      })}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
