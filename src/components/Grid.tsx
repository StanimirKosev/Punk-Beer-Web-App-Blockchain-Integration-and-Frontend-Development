import { FC } from "react";
import Card from "./Card";
import "../styles/Grid.css";
import { Beer } from "../types/Beer";
import { CardWithRandomBeer } from "./withRandomBeer";
import { useParams } from "react-router-dom";

interface Props {
  beers: Beer[] | undefined;
}

const Grid: FC<Props> = ({ beers }) => {
  const { dashboardView } = useParams<{
    dashboardView: "favorites" | undefined;
  }>();

  return (
    <div className="grid">
      {beers && beers.length > 0 ? (
        beers.map(({ id, name, image_url, description }, index) =>
          index === 0 && !dashboardView ? (
            <CardWithRandomBeer
              key={id}
              id={id}
              name={name}
              image_url={image_url}
              description={description}
            />
          ) : (
            <Card
              key={id}
              id={id}
              name={name}
              image_url={image_url}
              description={description}
            />
          ),
        )
      ) : (
        <div className="not-found-message">
          <p>No beers found. Try refining your search.</p>
        </div>
      )}
    </div>
  );
};

export default Grid;
