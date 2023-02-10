import { useCallback, useRef } from "react";
import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect =
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
