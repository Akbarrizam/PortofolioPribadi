import { useState, useEffect } from 'react';

const gradients = [
  'linear-gradient(135deg, #0A0F1E 0%, #0D1B2A 50%, #0F172A 100%)',
  'linear-gradient(135deg, #0D1B2A 0%, #0A0F1E 40%, #111827 100%)',
  'linear-gradient(150deg, #0F172A 0%, #0A0F1E 50%, #0D1B2A 100%)',
  'linear-gradient(120deg, #111827 0%, #0D1B2A 40%, #0A0F1E 100%)',
];

export default function useGradientBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [opacity, setOpacity] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (transitioning) return;
      setTransitioning(true);
      setNextIndex((currentIndex + 1) % gradients.length);

      // Fade in next gradient
      let frame = 0;
      const steps = 60;
      const fadeIn = setInterval(() => {
        frame++;
        setOpacity(frame / steps);
        if (frame >= steps) {
          clearInterval(fadeIn);
          setCurrentIndex((prev) => (prev + 1) % gradients.length);
          setOpacity(0);
          setTransitioning(false);
        }
      }, 50); // 3s total fade
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [currentIndex, transitioning]);

  return {
    position: 'relative',
    backgroundImage: gradients[currentIndex],
    // Pseudo-layer via boxShadow trick is not enough; we use a wrapper overlay approach
    // Return both for the App to layer them
    '--next-gradient': gradients[nextIndex],
    '--overlay-opacity': opacity,
  };
}

export { gradients };
