import { FC, useEffect } from "react";

import useFetchBeers from "../hooks/useFetchBeers";

const Grid: FC = () => {
  const { fetchBeers } = useFetchBeers();

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers]);

  return <></>;
};

export default Grid;
