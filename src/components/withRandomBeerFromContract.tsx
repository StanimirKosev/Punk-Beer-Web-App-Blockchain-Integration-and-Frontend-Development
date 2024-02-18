import { FC, useState } from "react";
import Card from "./Card";
import { useAccount } from "wagmi";
import useGetBeerCountFromContract from "../hooks/useGetBeerCountFromContract";
import beerAbi from "../abis/beerAbi";
import { CONTRACT_ADDRESS } from "../main";
import { sepolia } from "viem/chains";
import { sample } from "lodash";
import { WithRandomBeerProps } from "./withRandomBeer";
import { readContract } from "@wagmi/core";
import { config } from "../../config";
import randomBeerPlaceholder from "../assets/random-beer.avif";
import useThrowAsyncError from "../hooks/useThrowAsyncError";

/**
 *
 * Using HOCs here, but they contain highly specific information and won't be reused anywhere.
 * A normal component would suffice for this purpose.
 *
 * Higher-order component (HOC)
 *
 * This HOC serves as an Injector.
 * It injects a callback prop `onFetchRandomBeer`.
 * When triggered, this event initiates a re-render, updating the wrapped component with the random beer data.
 */
const withRandomBeerFromContract = <P extends WithRandomBeerProps>(
  Component: FC<P>,
): FC<P & WithRandomBeerProps> => {
  return (props) => {
    const { address } = useAccount();
    const throwAsyncError = useThrowAsyncError();
    const beerCount = useGetBeerCountFromContract();
    const [randomBeerFromContract, setRandomBeerFromContract] = useState<
      | readonly [
          string,
          string,
          string,
          number,
          string,
          number,
          number,
          number,
        ]
      | undefined
    >(undefined);

    const handleReadRandomBeerFromContract = async () => {
      try {
        const randomIndex = sample([...Array(beerCount).keys()]);

        if (!randomIndex) return;

        const randomBeer = await readContract(config, {
          abi: beerAbi,
          address: CONTRACT_ADDRESS,
          functionName: "beers",
          account: address,
          chainId: sepolia.id,
          args: [BigInt(randomIndex)],
        });
        setRandomBeerFromContract(randomBeer);
      } catch (e) {
        throwAsyncError(e);
      }
    };

    const beer = {
      name: randomBeerFromContract?.[0] || "Random Beer from smart contract!",
      image_url:
        randomBeerFromContract &&
        !randomBeerFromContract?.[1].includes("base64")
          ? randomBeerFromContract?.[1]
          : randomBeerPlaceholder,
      description: `Explore craft brews from our smart contract! Get your random pick from ${beerCount} beers now!`,
    };

    return (
      <Component
        {...props}
        beer={beer}
        onFetchRandomBeer={handleReadRandomBeerFromContract}
      />
    );
  };
};

export const CardWithRandomBeerFromContract = withRandomBeerFromContract(Card);
