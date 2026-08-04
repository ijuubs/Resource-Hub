import { useEffect, useState, useRef, RefObject } from 'react';

export function useIntersectionObserver(
  options: IntersectionObserverInit = { rootMargin: '200px' }
): [RefObject<HTMLDivElement | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(target); // Only observe once
      }
    }, options);

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [options.rootMargin, options.threshold]);

  return [targetRef, isIntersecting];
}
