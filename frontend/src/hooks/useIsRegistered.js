import { useEffect, useState } from "react";
import { isSupportedChain } from "../utils";
import { isAddress } from "ethers";
import { getProvider } from "../constants/providers";
import { getChatContract } from "../constants/contracts";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useIsRegistered = () => {
    const { chainId, address } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const [isRegistered, setIsRegistered] = useState(false)

    useEffect( () => {
        (async () => {if (!isSupportedChain(chainId)) return console.error("Wrong network");
        if (!isAddress(address)) return console.error("Invalid address");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contract = getChatContract(signer);
        const transaction = await contract.isRegistered(address)
                                  .then((res)=>{
                                    console.log("isRegistered", res);
                                    setIsRegistered(res)})
                                  .catch((e)=>{console.error("error checking registration status: ", err);})
        })()
    }, [address, chainId, walletProvider]);

    return isRegistered
};

export default useIsRegistered;
