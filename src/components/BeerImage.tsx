import { FC, useImperativeHandle, useRef, useState } from "react";
import "../styles/BeerImage.css";

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
