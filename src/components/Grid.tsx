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
      {beers?.map(({ id, name, description, image_url }) => (
        <Card key={id} title={name} text={description} image={image_url} />
      ))}
    </div>
  );
};

export default Grid;
