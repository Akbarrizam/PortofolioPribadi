import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth ring position using RAF
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Snap the dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const onEnter = (e) => {
      const tag = e.target.tagName.toLowerCase();
      const role = e.target.getAttribute('role');
      if (
        tag === 'a' || tag === 'button' || tag === 'input' ||
        tag === 'textarea' || tag === 'select' ||
        role === 'button' || e.target.style.cursor === 'pointer' ||
        e.target.closest('a') || e.target.closest('button')
      ) {
        setIsHovering(true);
      }
    };

    const onLeave = () => setIsHovering(false);
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onHide = () => setIsVisible(false);
    const onShow = () => setIsVisible(true);


    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onHide);
    document.addEventListener('mouseenter', onShow);

    // Smooth ring follow with lerp
    const animateRing = () => {
      const lerp = isHovering ? 0.12 : 0.08;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        const offset = isHovering ? 20 : 14;
        ringRef.current.style.transform = `translate(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px)`;
      }

      rafRef.current = requestAnimationFrame(animateRing);
    };

    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onHide);
      document.removeEventListener('mouseenter', onShow);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isHovering, isVisible]);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          pointerEvents: 'none',
          width: '8px', height: '8px', borderRadius: '50%',
          background: isHovering ? '#6366F1' : '#0EA5E9',
          boxShadow: isHovering
            ? '0 0 10px rgba(99,102,241,0.6), 0 0 20px rgba(99,102,241,0.25)'
            : '0 0 8px rgba(14,165,233,0.6), 0 0 16px rgba(14,165,233,0.25)',
          transition: 'background 0.2s, box-shadow 0.2s, width 0.15s, height 0.15s',
          transform: 'translate(-100px, -100px)',
          opacity: isVisible ? 1 : 0,
          width: isClicking ? '6px' : '8px',
          height: isClicking ? '6px' : '8px',
        }}
      />

      {/* Ring — lags behind with lerp */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9998,
          pointerEvents: 'none',
          borderRadius: '50%',
          border: isHovering
            ? '1.5px solid rgba(99,102,241,0.5)'
            : '1.5px solid rgba(14,165,233,0.4)',
          width: isHovering ? '40px' : '28px',
          height: isHovering ? '40px' : '28px',
          transform: 'translate(-100px, -100px)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), height 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border 0.2s, opacity 0.3s',
          background: isHovering ? 'rgba(129,140,248,0.05)' : 'transparent',
          backdropFilter: isHovering ? 'blur(2px)' : 'none',
        }}
      />
    </>
  );
}
