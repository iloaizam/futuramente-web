import { useEffect, useRef, useState } from 'react';

export function useInViewOnce(options = { rootMargin: '0px 0px -15% 0px', threshold: 0.1 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const obs = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    obs.observe(el);

    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}