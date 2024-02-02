import { debounce } from "lodash";
import { useEffect, useMemo, useRef } from "react";

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
