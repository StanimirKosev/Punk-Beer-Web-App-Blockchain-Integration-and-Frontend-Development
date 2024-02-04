import { FC, useState } from "react";
import useThrowAsyncError from "../hooks/useThrowAsyncError";
import { API_ROOT } from "../main";
import { Beer } from "../types/Beer";
import Card from "./Card";
import randomBeerPlaceholder from "../assets/random-beer.avif";

export interface WithRandomBeerProps {
  onFetchRandomBeer?: () => void;
}

/**
 *
 * Higher-order component (HOC)
 *
 * This HOC serves as an Injector.
 * It injects a callback prop `onFetchRandomBeer`.
 * When triggered, this event initiates a re-render, updating the wrapped component with the random beer data.
 */
const withRandomBeer = <P extends WithRandomBeerProps>(
  Component: FC<P>,
): FC<P & WithRandomBeerProps> => {
  return (props) => {
    const throwAsyncError = useThrowAsyncError();
    const [randomBeer, setRandomBeer] = useState<Beer | undefined>(undefined);

    const handleFetchRandomBeer = async () => {
      try {
        const response = await fetch(`${API_ROOT}/random`);
        const randomBeer = await response.json();
        setRandomBeer(randomBeer[0]);
      } catch (e) {
        throwAsyncError(e);
      }
    };

    const beer = {
      ...randomBeer,
      name: randomBeer?.name || "Random Beer",
      image_url: randomBeer ? randomBeer?.image_url : randomBeerPlaceholder,
      description:
        randomBeer?.description ||
        "Uncover the mystery! Roll the dice to explore the world of craft brews.",
    };

    return (
      <Component
        {...props}
        onFetchRandomBeer={handleFetchRandomBeer}
        beer={beer}
      />
    );
  };
};

export const CardWithRandomBeer = withRandomBeer(Card);
