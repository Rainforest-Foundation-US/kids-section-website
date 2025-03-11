import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Code from useEvent RFC https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
export function useEvent<T extends unknown[]>(handler: GenericFunction<T>) {
  const handlerRef = useRef<typeof handler | null>(null);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: readonly [...T]) => {
    const fn = handlerRef.current;
    return fn?.(...args);
  }, []);
}

interface Measure {
  left: number;
  top: number;
  width: number;
  bottom: number;
  right: number;
  x: number;
  y: number;
  height: number;
  offsetLeft: number;
  offsetTop: number;
  scrollHeight: number;
  scrollWidth: number;
}

const defaultValue: Measure = {
  left: 0,
  top: 0,
  width: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
  height: 0,
  offsetLeft: 0,
  offsetTop: 0,
  scrollHeight: 0,
  scrollWidth: 0,
};

interface UseMeasureProps {
  updateOnWindowResize?: boolean;
  onResize?: (a: Measure) => void;
}
export function useMeasure<E extends HTMLElement = HTMLElement>(
  props?: UseMeasureProps,
) {
  const ref = useRef<E>(null);
  const [bounds, setBounds] = useState<Measure>(defaultValue);
  const onResize = props?.onResize;
  const updateOnWindowResize = props?.updateOnWindowResize;

  const set = useCallback(
    (newBounds: Measure) => {
      if (onResize) onResize(newBounds);
      else setBounds(newBounds);
    },
    [setBounds, onResize],
  );

  const registerObserver = useCallback(
    (element: HTMLElement | null) => {
      if (!element) return;

      const observer = new ResizeObserver(() => {
        if (ref.current) {
          const bounds = ref.current.getBoundingClientRect();

          const nextMeasure: Measure = {
            left: bounds.left,
            top: bounds.top,
            width: bounds.width,
            height: bounds.height,
            bottom: bounds.bottom,
            right: bounds.right,
            x: bounds.x,
            y: bounds.y,
            scrollHeight: element.scrollHeight,
            scrollWidth: element.scrollWidth,
            offsetLeft: element.offsetLeft,
            offsetTop: element.offsetTop,
          };
          if (nextMeasure) set(nextMeasure);
        }
      });
      observer.observe(element);
      return () => observer.disconnect();
    },
    [set],
  );

  useEffect(() => {
    if (updateOnWindowResize) {
      return registerObserver(document.body);
    }
  }, [updateOnWindowResize, registerObserver]);

  useEffect(() => {
    return registerObserver(ref.current);
  }, [registerObserver]);

  return [ref, bounds] as const;
}
