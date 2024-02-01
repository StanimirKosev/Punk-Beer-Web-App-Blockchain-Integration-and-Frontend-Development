import { FC, useEffect } from "react";
import useFetchBeers from "../hooks/useFetchBeers";
import Card from "./Card";
import "../styles/Grid.css";

const Grid: FC = () => {
  const { beers, fetchBeers } = useFetchBeers();

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers]);

  return (
    <div className="grid">
      {beers?.map(({ name, description, image_url }) => (
        <Card title={name} text={description} image={image_url} />
      ))}
    </div>
  );
};

export default Grid;
