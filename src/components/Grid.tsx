import { FC } from "react";
import Card from "./Card";
import "../styles/Grid.css";
import { Beer } from "../types/Beer";
import { CardWithRandomBeer } from "./withRandomBeer";
import { useParams } from "react-router-dom";
import useCompareFavoriteBeersToApi from "../hooks/useCompareFavoriteBeersToApi";
import { CardWithRandomBeerFromContract } from "./withRandomBeerFromContract";

interface Props {
  beers: Beer[] | undefined;
}

const Grid: FC<Props> = ({ beers }) => {
  const { dashboardView } = useParams<{
    dashboardView: "favorites" | undefined;
  }>();

  const inFavorites = dashboardView === "favorites";

  const favoriteBeerChangesMap = useCompareFavoriteBeersToApi(inFavorites);

  return (
    <div className="grid">
      {!inFavorites && <CardWithRandomBeerFromContract />}
      {!inFavorites && <CardWithRandomBeer />}
      {beers?.map((beer) => (
        <Card
          key={beer.id}
          changedFavoriteBeerIndicator={
            inFavorites ? favoriteBeerChangesMap?.get(beer.id) : undefined
          }
          beer={beer}
        />
      ))}
    </div>
  );
};

export default Grid;
