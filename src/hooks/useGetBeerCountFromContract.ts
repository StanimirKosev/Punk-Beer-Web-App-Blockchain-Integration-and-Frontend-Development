import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../main";
import { sepolia } from "viem/chains";
import beerAbi from "../abis/beerAbi";

const useGetBeerCountFromContract = () => {
  const { address } = useAccount();

  const { data: bigIntCount } = useReadContract({
    abi: beerAbi,
    address: CONTRACT_ADDRESS,
    functionName: "getBeerCount",
    account: address,
    chainId: sepolia.id,
  });

  if (!bigIntCount) return null;

  return Number(bigIntCount);
};

export default useGetBeerCountFromContract;
