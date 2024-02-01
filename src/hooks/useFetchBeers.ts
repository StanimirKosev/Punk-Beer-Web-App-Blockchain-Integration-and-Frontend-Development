import { useCallback, useState } from "react";
import { Beer } from "../types/Beer";
import useThrowAsyncError from "./useThrowAsyncError";
import { API_ROOT } from "../main";

const useFetchBeers = () => {
  const throwAsyncError = useThrowAsyncError();
  const [beers, setBeers] = useState<Beer[] | undefined>();

  const fetchBeers = useCallback(async () => {
    try {
      const response = await fetch(`${API_ROOT}invalid-url`);
      const beers = await response.json();
      setBeers(beers);
    } catch (e) {
      throwAsyncError(e);
    }
  }, [throwAsyncError]);

  return { beers, fetchBeers };
};

export default useFetchBeers;
