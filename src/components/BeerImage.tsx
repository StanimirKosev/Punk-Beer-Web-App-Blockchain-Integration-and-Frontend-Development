import { FC, useState } from "react";
import "../styles/BeerImage.css";
import { Howl } from "howler";
import frankieScreamingBitcoin from "../assets/frankie-macdonald-screaming-bitcoin.mp3";
import saylorThereIsNoSecondBest from "../assets/saylor-there-is-no-second-best.mp3";
import { sample } from "lodash";

interface Props {
  name: string | undefined;
  image_url: string | undefined;
}

const BeerImage: FC<Props> = ({ name, image_url }) => {
  const [shouldShake, setShouldShake] = useState<boolean>(false);

  const handleClickBeer = () => {
    if (!image_url || image_url.includes("random-beer.avif")) return;
    setShouldShake(true);

    Howler.stop();
    new Howl({
      src: [sample([saylorThereIsNoSecondBest, frankieScreamingBitcoin])],
      volume: 0.1,
    }).play();
  };

  return (
    <img
      onClick={handleClickBeer}
      onAnimationEnd={() => setShouldShake(false)}
      className={`card-container__image ${shouldShake ? "shake" : ""}`}
      alt={name}
      src={image_url}
    />
  );
};

export default BeerImage;
