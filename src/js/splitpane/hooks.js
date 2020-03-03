
import { useEffect } from 'react';

import ResizeObserver from "resize-observer-polyfill";

export const useResizeObserver = (ref, onResize) => {
    useEffect(() => {
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(ref.current);
    }, []);
  };