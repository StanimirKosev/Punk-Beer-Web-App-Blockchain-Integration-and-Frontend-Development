import { Beer } from "../types/Beer";
import { SHA256 } from "crypto-js";

export const getFavoriteBeers = (): Beer[] => {
  return Array.from(getMapFromStorage().values());
};

export const getMapFromStorage = (): Map<string, Beer> => {
  const serializedMap = sessionStorage.getItem("favorites");

  if (serializedMap) return new Map(JSON.parse(serializedMap));
  return new Map();
};

export const generateHash = (data: Beer): string => {
  return SHA256(JSON.stringify(data)).toString();
};
