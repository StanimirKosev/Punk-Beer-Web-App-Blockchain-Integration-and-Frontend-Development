import { useEffect, useState } from "react";
import useThrowAsyncError from "./useThrowAsyncError";
import { Beer } from "../types/Beer";
import { getFavoriteBeers } from "../utils/utils";
import { isEqual } from "lodash";
import { API_ROOT } from "../main";

const useCompareFavoriteBeersToApi = (inFavoritesDashboard: boolean) => {
  const throwAsyncError = useThrowAsyncError();
  const [favoriteBeerChangesMap, setFavoriteBeerChangesMap] = useState<
    Map<number, "changed" | "unchanged"> | undefined
  >(undefined);

  const handleFetchFavoriteBeers = async () => {
    try {
      const ids = getFavoriteBeers().map((beer) => beer.id);
      const response = await fetch(`${API_ROOT}?ids=${ids.join("|")}`);
      const fetchedFavoriteBeers: Beer[] = await response.json();
      return fetchedFavoriteBeers;
    } catch (e) {
      throwAsyncError(e);
    }
  };

  const compareFavoriteBeersToApi = async () => {
    const changesMap = new Map<number, "changed" | "unchanged">();
    const fetchedFavoriteBeers = await handleFetchFavoriteBeers();
    const favoriteBeers = getFavoriteBeers();

    favoriteBeers.forEach((favBeer) => {
      const correspondingBeerFromApi = fetchedFavoriteBeers?.find(
        (beerFromApi) => beerFromApi.id === favBeer.id,
      );

      const changeIndicator = isEqual(favBeer, correspondingBeerFromApi)
        ? "unchanged"
        : "changed";

      changesMap.set(favBeer.id, changeIndicator);
    });

    setFavoriteBeerChangesMap(changesMap);
  };

  useEffect(() => {
    if (inFavoritesDashboard) compareFavoriteBeersToApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inFavoritesDashboard]);

  return favoriteBeerChangesMap;
};

export default useCompareFavoriteBeersToApi;
