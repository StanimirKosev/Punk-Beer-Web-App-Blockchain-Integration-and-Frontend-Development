import { FC } from "react";
import Card from "./Card";
import "../styles/Grid.css";
import { Beer } from "../types/Beer";

interface Props {
  beers: Beer[] | undefined;
}

const Grid: FC<Props> = ({ beers }) => {
  return (
    <div className="grid">
      {beers && beers.length > 0 ? (
        beers.map(({ id, name, image_url, description }) => (
          <Card
            key={id}
            id={id}
            name={name}
            image_url={image_url}
            description={description}
          />
        ))
      ) : (
        <div className="not-found-message">
          <p>No beers found. Try refining your search.</p>
        </div>
      )}
    </div>
  );
};

export default Grid;
