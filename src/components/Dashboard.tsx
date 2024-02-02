import { FC, useCallback, useEffect, useState } from "react";
import Grid from "./Grid";
import useThrowAsyncError from "../hooks/useThrowAsyncError";
import { Beer } from "../types/Beer";
import { API_ROOT } from "../main";
import SearchInput from "./ui/SearchInput";

const Dashboard: FC = () => {
  const throwAsyncError = useThrowAsyncError();
  const [beers, setBeers] = useState<Beer[] | undefined>();

  const fetchBeers = useCallback(async () => {
    try {
      const response = await fetch(`${API_ROOT}beers`);
      const beers = await response.json();
      setBeers(beers);
    } catch (e) {
      throwAsyncError(e);
    }
  }, [throwAsyncError]);

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers]);

  return (
    <>
      <SearchInput />
      <Grid beers={beers} />
    </>
  );
};

export default Dashboard;
