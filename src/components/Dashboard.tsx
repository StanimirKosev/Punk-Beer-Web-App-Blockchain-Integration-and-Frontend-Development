import { FC, useEffect, useState } from "react";
import Grid from "./Grid";
import useThrowAsyncError from "../hooks/useThrowAsyncError";
import { Beer } from "../types/Beer";
import { API_ROOT, PER_PAGE_REGEX } from "../main";
import SearchInput from "./ui/SearchInput";
import { useParams } from "react-router-dom";
import { getFavoriteBeers } from "../utils/utils";

const Dashboard: FC = () => {
  const { dashboardView } = useParams<{
    dashboardView: "favorites" | undefined;
  }>();
  const throwAsyncError = useThrowAsyncError();
  const [beers, setBeers] = useState<Beer[] | undefined>(undefined);

  const handleFetchBeers = async (query?: string) => {
    try {
      let url = `${API_ROOT}?per_page=77`;
      if (query) url = url.replace(PER_PAGE_REGEX, `?beer_name=${query}`);

      const response = await fetch(url);
      const beers = await response.json();
      setBeers(beers);
    } catch (e) {
      throwAsyncError(e);
    }
  };

  const handleSearchFavoriteBeers = (query: string) =>
    setBeers((beers) => {
      if (!query) return getFavoriteBeers();
      return beers?.filter((beer) =>
        beer.name.toLowerCase().includes(query.toLowerCase()),
      );
    });

  useEffect(() => {
    if (dashboardView) {
      setBeers(getFavoriteBeers());
    } else {
      handleFetchBeers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardView]);

  return (
    <>
      <SearchInput
        onSearch={!dashboardView ? handleFetchBeers : handleSearchFavoriteBeers}
      />
      <Grid beers={beers} />
    </>
  );
};

export default Dashboard;
