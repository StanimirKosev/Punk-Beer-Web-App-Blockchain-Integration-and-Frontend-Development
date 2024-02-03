import { useCallback, useState } from "react";

/**
 * Custom hook for managing asynchronous errors in React components.
 * @description
 * A function to throw async errors back into React re-render lifecycle.
 */
const useThrowAsyncError = () => {
  const [, setState] = useState<unknown | undefined>(undefined);

  const throwAsyncError = useCallback(
    (error: unknown) =>
      setState(() => {
        throw error;
      }),
    [],
  );

  return throwAsyncError;
};
export default useThrowAsyncError;
