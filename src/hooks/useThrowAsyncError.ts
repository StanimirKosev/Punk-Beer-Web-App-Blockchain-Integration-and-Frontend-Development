import { useCallback, useState } from "react";

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
