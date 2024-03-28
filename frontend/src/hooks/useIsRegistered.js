import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getChatContract } from "../constants/contracts";
import { useEffect, useState } from "react";

import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useIsRegistered = (poolId) => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider, address } = useWeb3ModalProvider();
    const [isRegistered, setIsRegistered]= useState(true)

    useEffect(() => {
        (async function obtainData(){if (!isSupportedChain(chainId)) return console.error("Wrong network");

        const readWriteProvider = getProvider(walletProvider);
        
        const signer = await readWriteProvider.getSigner();

        const contract = getChatContract(signer)

        contract.isRegistered(address).then((res) => {
            console.log("res", res);
            setIsRegistered(res)
        }).catch((err) => {
            console.log(`error: ${err.reason}`)
        })})()


    }, [poolId, chainId, walletProvider]);

    return isRegistered
};

export default useIsRegistered;
