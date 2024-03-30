import { useEffect, useState } from "react";
import { isSupportedChain } from "../utils";
import { isAddress } from "ethers";
import { getProvider } from "../constants/providers";
import { getEnsContract } from "../constants/contracts";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useGetAddressFromName = () => {
    const { chainId, address } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const [ensName, setEnsName] = useState("")

    useEffect( () => {
        (async () => {if (!isSupportedChain(chainId)) return console.error("Wrong network");
        if (!isAddress(address)) return console.error("Invalid address");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contract = getEnsContract(signer);
        const transaction = await contract.getNameFromAddress(address)
                                  .then((res)=>{
                                    setEnsName(res)})
                                  .catch((e)=>{console.error("error getting name from address status: ", err);})
        })()
    }, [address, chainId, walletProvider]);

    return ensName
};

export default useGetAddressFromName;
