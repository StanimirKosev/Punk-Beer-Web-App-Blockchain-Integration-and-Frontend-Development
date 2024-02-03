import { FC } from "react";
import "../styles/Card.css";
import useThrowAsyncError from "../hooks/useThrowAsyncError";
import { getFavoriteBeersFromStorage } from "../utils/utils";
import { useParams } from "react-router-dom";

interface Props {
  name: string;
  description: string;
  image_url: string;
  id: number;
}

const Card: FC<Props> = ({ name, description, image_url, id }) => {
  const { dashboardView } = useParams<{
    dashboardView: "favorites" | undefined;
  }>();
  const throwAsyncError = useThrowAsyncError();

  const handleAddBeerToFavorites = () => {
    try {
      const favoriteBeers = getFavoriteBeersFromStorage();

      const isAlreadyInFavorites = favoriteBeers?.some(
        (beer) => beer.id === id,
      );
      if (!isAlreadyInFavorites)
        favoriteBeers.push({ id, name, description, image_url });

      sessionStorage.setItem("favorites", JSON.stringify(favoriteBeers));
    } catch (e) {
      throwAsyncError(e);
    }
  };

  return (
    <div className="card-container">
      <div className="card-container__header">
        {!dashboardView ? (
          <img src="/star.svg" alt="Star" onClick={handleAddBeerToFavorites} />
        ) : null}
      </div>
      <div className="card-container__content">
        <img className="card-container__image" alt={name} src={image_url} />
        <div className="card-container__text">
          <div className="card-container__text__header">{name}</div>
          <div className="card-container__text__message">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
