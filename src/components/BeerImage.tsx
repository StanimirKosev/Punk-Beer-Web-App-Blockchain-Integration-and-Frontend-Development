import { FC, useImperativeHandle, useRef, useState } from "react";
import "../styles/BeerImage.css";
import { Howl } from "howler";
import frankieScreamingBitcoin from "../assets/frankie-macdonald-screaming-bitcoin.mp3";
import saylorThereIsNoSecondBest from "../assets/saylor-there-is-no-second-best.mp3";
import { sample } from "lodash";

interface Props {
  name: string;
  image_url: string;
  isUndefinedRandomBeer: boolean;
}

const BeerImage: FC<Props> = ({ name, image_url, isUndefinedRandomBeer }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any | null>(null);
  const [shouldShake, setShouldShake] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => ({
      openBeer: () => {
        if (!isUndefinedRandomBeer || !image_url) return;
        setShouldShake(true);

        Howler.stop();
        new Howl({
          src: [sample([saylorThereIsNoSecondBest, frankieScreamingBitcoin])],
          volume: 0.1,
        }).play();
      },
    }),
    [isUndefinedRandomBeer, image_url],
  );

  return (
    <img
      onClick={() => ref.current?.openBeer()}
      onAnimationEnd={() => setShouldShake(false)}
      ref={ref}
      className={`card-container__image ${shouldShake ? "shake" : ""}`}
      alt={name}
      src={image_url}
    />
  );
};

export default BeerImage;
