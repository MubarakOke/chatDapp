import { useEffect, useState } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getStakingContract } from "../constants/contracts";

import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useGetPoolId = () => {
    const [poolId, setPoolId]= useState(null)
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    useEffect(() => {
        (async function obtainData(){if (!isSupportedChain(chainId)) return console.error("Wrong network");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contract = getStakingContract(signer);

        contract.id().then((res) => {
            setPoolId(res)
        })
        .catch((err) => {
            console.log(`error: ${err.reason}`)
        });
        })()
        
    }, []);

    return poolId
};

export default useGetPoolId;
