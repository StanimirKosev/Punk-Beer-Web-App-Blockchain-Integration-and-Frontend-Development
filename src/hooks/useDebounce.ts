import { debounce } from "lodash";
import { useEffect, useMemo, useRef } from "react";

/**
 * Custom hook for debouncing a callback function.
 *
 * This hook provides a function that is stable between re-renders but also has access to the latest state.
 * @description
 *
 * 1. Initializes a mutable object (`ref`) using `useRef`, providing stability between re-renders.
 * 2. Updates `ref.current` inside `useEffect` to ensure access to the latest state without re-creating the function.
 * 3. Creates the debounced callback function using `useMemo` with `debounce`, ensuring it's only created once on mount.
 */
const useDebounce = (callback: () => void) => {
  const ref = useRef<(() => void) | null>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(
    () => debounce(() => ref.current?.(), 500),
    [],
  );

  return debouncedCallback;
};

export default useDebounce;
