import { useEffect, useState } from "react";
import { readOnlyProvider } from "../constants/providers";
import { ethers } from "ethers";
import abiStaking from "../constants/abiStaking.json"
import MulticallAbi from "../constants/multicall.json";

import { getStakingContract } from "../constants/contracts";

const useGetAllPools = () => {
  const [data, setData] = useState([]);
  const [numOfPool, setNumOfPool] = useState(0);

	const contract = getStakingContract(readOnlyProvider)

  useEffect(() => {
    (async () => {
      contract
        .id()
        .then((res) => setNumOfPool(Number(res)))
        .catch((err) => console.log(err));

      const poolIDs = [...Array.from({ length: numOfPool + 1 })].map(
        (_, index) => index
      );

      const itf = new ethers.Interface(abiStaking);
      const calls = poolIDs.map((x) => ({
        target: import.meta.env.VITE_staking_contract_address,
        callData: itf.encodeFunctionData("getPoolByID", [x]),
      }));

      //multicall
      const multicall = new ethers.Contract(
        import.meta.env.VITE_multicall_address,
        MulticallAbi,
        readOnlyProvider
      );

			const callResults = await multicall.tryAggregate.staticCall(
				false,
				calls
		);
		const validResponsesIndex = [];
		const validResponses = callResults.filter((x, i) => {
				if (x[0] === true) {
						validResponsesIndex.push(i);
						return true;
				}
				return false;
		});

		
		const decodedResponses = validResponses.map((x) =>
				itf.decodeFunctionResult("getPoolByID", x[1])
		);
    let returnedArray= decodedResponses.map((item, index)=>decodedResponses[index][0])
		setData(returnedArray);

    })();
  }, [numOfPool]);
	return data
};

export default useGetAllPools;