import { FC, useCallback, useEffect, useState } from "react";
import Grid from "./Grid";
import useThrowAsyncError from "../hooks/useThrowAsyncError";
import { Beer } from "../types/Beer";
import { API_ROOT, PER_PAGE_REGEX } from "../main";
import SearchInput from "./ui/SearchInput";

const Dashboard: FC = () => {
  const throwAsyncError = useThrowAsyncError();
  const [beers, setBeers] = useState<Beer[] | undefined>();

  const handleFetchBeers = useCallback(
    async (query?: string) => {
      try {
        let url = `${API_ROOT}?per_page=78`;
        if (query) url = url.replace(PER_PAGE_REGEX, `?beer_name=${query}`);

        const response = await fetch(url);
        const beers = await response.json();
        setBeers(beers);
      } catch (e) {
        throwAsyncError(e);
      }
    },
    [throwAsyncError],
  );

  useEffect(() => {
    handleFetchBeers();
  }, [handleFetchBeers]);

  return (
    <>
      <SearchInput onSearch={handleFetchBeers} />
      <Grid beers={beers} />
    </>
  );
};

export default Dashboard;
