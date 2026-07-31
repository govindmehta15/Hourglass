// Copy this file into your React project (e.g. src/hooks/useHourglass.jsx).
// Requires hourglass.js to already be loaded/registered on the page —
// see the main README for how to load it via CDN or self-hosted.
//
// Usage:
//   import { Hourglass } from './useHourglass.jsx';
//   <Hourglass duration={12} color="#e6b93d" />
//
// Or, if you want to keep your own <hour-glass> markup and just drive it
// from state:
//   const ref = useHourglass({ duration, color });
//   <hour-glass ref={ref}></hour-glass>

import { useEffect, useRef } from 'react';

/**
 * Imperatively syncs React state onto an <hour-glass> element's
 * live-updatable attributes. Returns a ref to attach to the element.
 */
export function useHourglass({ duration, color, paused, glow, width } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && duration != null) ref.current.setAttribute('duration', String(duration));
  }, [duration]);

  useEffect(() => {
    if (ref.current && color != null) ref.current.setAttribute('sand-color', color);
  }, [color]);

  useEffect(() => {
    if (ref.current && paused != null) ref.current.setAttribute('paused', String(paused));
  }, [paused]);

  useEffect(() => {
    if (ref.current && glow != null) ref.current.setAttribute('glow', String(glow));
  }, [glow]);

  useEffect(() => {
    if (ref.current && width != null) ref.current.setAttribute('width', String(width));
  }, [width]);

  return ref;
}

/**
 * Friendly camelCase wrapper around <hour-glass>.
 * Usage: <Hourglass duration={12} color="#e6b93d" />
 */
export function Hourglass({ duration = 12, color = '#e6b93d', paused = false, glow = true, width = 260, ...rest }) {
  const ref = useHourglass({ duration, color, paused, glow, width });
  // eslint-disable-next-line react/no-unknown-property
  return <hour-glass ref={ref} {...rest}></hour-glass>;
}
