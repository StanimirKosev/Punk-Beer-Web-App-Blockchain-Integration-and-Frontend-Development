import { FC } from "react";
import "../styles/Card.css";
import useThrowAsyncError from "../hooks/useThrowAsyncError";
import { getFavoriteBeersFromStorage } from "../utils/utils";
import { useParams } from "react-router-dom";
import { WithRandomBeerProps } from "./withRandomBeer";
import BeerImage from "./BeerImage";

interface Props extends WithRandomBeerProps {
  name: string;
  description: string;
  image_url: string;
  id: number;
}

const Card: FC<Props> = ({
  name,
  description,
  image_url,
  id,
  onFetchRandomBeer,
}) => {
  const { dashboardView } = useParams<{
    dashboardView: "favorites" | undefined;
  }>();
  const throwAsyncError = useThrowAsyncError();

  const handleAddBeerToFavorites: React.MouseEventHandler<HTMLImageElement> = (
    e,
  ) => {
    e.stopPropagation();
    try {
      const favoriteBeers = getFavoriteBeersFromStorage();

      const isAlreadyInFavorites = favoriteBeers?.some(
        (beer) => beer.id === id,
      );
      if (!isAlreadyInFavorites)
        favoriteBeers.unshift({ id, name, description, image_url });

      sessionStorage.setItem("favorites", JSON.stringify(favoriteBeers));
    } catch (e) {
      throwAsyncError(e);
    }
  };

  return (
    <div className="card-container">
      <div className="card-container__header">
        {!dashboardView && id && (
          <img src="/star.svg" alt="Star" onClick={handleAddBeerToFavorites} />
        )}
        {onFetchRandomBeer && (
          <img src="/dice.svg" alt="Star" onClick={onFetchRandomBeer} />
        )}
      </div>
      <div className="card-container__content">
        <BeerImage
          name={name}
          image_url={image_url}
          isUndefinedRandomBeer={!!id}
        />
        <div className="card-container__text">
          <div className="card-container__text__header">{name}</div>
          <div className="card-container__text__message">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
