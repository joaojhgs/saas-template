'client-only';

import { useEffect, useState } from 'react';

/*
    This is a hook to be used in the client side to match media queries programatically
    it works exactly like css media query, but allow for programatic usage
*/
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

/*
    This hooks just make it easier to separate mobile from desktop usage
*/
export function useIsClientMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}
