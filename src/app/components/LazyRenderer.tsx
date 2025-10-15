'use client';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  threshold?: number;
};

export default function LazyRenderer({ children, threshold = 0.1 }: Props) {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { ref, inView } = useInView({ threshold });

  useEffect(() => {
    if (inView && !hasBeenVisible) {
      setHasBeenVisible(true);

      // Wait a tick to trigger the animation
      requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
    }
  }, [inView, hasBeenVisible]);

  if (!hasBeenVisible) return <div className='hidden' ref={ref} />;

  return (
    <div ref={ref} className={`${shouldAnimate && inView ? 'fade-in' : 'hidden'}`}>
      {children}
    </div>
  );
}
