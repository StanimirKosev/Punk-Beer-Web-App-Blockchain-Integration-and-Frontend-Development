import { Beer } from "../types/Beer";

export const getFavoriteBeersFromStorage = (): Beer[] => {
  const favoritesFromStorage = sessionStorage.getItem("favorites");
  let favoriteBeers: Beer[] = [];

  if (favoritesFromStorage) {
    favoriteBeers = JSON.parse(favoritesFromStorage) as Beer[];
  }

  return favoriteBeers;
};
