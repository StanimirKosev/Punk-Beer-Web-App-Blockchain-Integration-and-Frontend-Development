import { FC } from "react";
import "../styles/Card.css";
import useThrowAsyncError from "../hooks/useThrowAsyncError";
import { generateHash, getMapFromStorage } from "../utils/utils";
import { WithRandomBeerProps } from "./withRandomBeer";
import BeerImage from "./BeerImage";
import { Beer } from "../types/Beer";

interface Props extends WithRandomBeerProps {
  beer?: Beer;
  changedFavoriteBeerIndicator?: "changed" | "unchanged" | undefined;
}

const Card: FC<Props> = ({
  beer,
  changedFavoriteBeerIndicator,
  onFetchRandomBeer,
}) => {
  const throwAsyncError = useThrowAsyncError();

  const handleAddBeerToFavorites = () => {
    if (!beer) return;
    try {
      const map = getMapFromStorage();
      const beerHash = generateHash(beer);

      if (!map.has(beerHash)) {
        map.set(beerHash, beer);
        sessionStorage.setItem("favorites", JSON.stringify([...map]));
      }
    } catch (e) {
      throwAsyncError(e);
    }
  };

  const { id, name, description, image_url } = beer || {};
  const favoriteBeerTitle =
    changedFavoriteBeerIndicator === "changed"
      ? "Updated since your last visit!"
      : changedFavoriteBeerIndicator === "unchanged"
        ? "No changes since your last visit."
        : null;

  return (
    <div className="card-container">
      <div className={`card-container__header ${changedFavoriteBeerIndicator}`}>
        {favoriteBeerTitle}
        {!changedFavoriteBeerIndicator && id && (
          <img src="/star.svg" alt="Star" onClick={handleAddBeerToFavorites} />
        )}
        {onFetchRandomBeer && (
          <img src="/dice.svg" alt="Star" onClick={onFetchRandomBeer} />
        )}
      </div>
      <div className="card-container__content">
        <BeerImage name={name} image_url={image_url} />
        <div className="card-container__text">
          <div className="card-container__text__header">{name}</div>
          <div className="card-container__text__message">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
