import { useEffect, useState } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getStakingContract } from "../constants/contracts";
import toast from 'react-hot-toast';
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useGetStakeBalance = (PoolId) => {
    const [balance, setBalance]= useState("")
    const { chainId, address } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    useEffect(() => {
        if(PoolId){
            (async function obtainData(){if (!isSupportedChain(chainId)) return console.error("Wrong network");
            const readWriteProvider = getProvider(walletProvider);
            const signer = await readWriteProvider.getSigner();

            const contract = getStakingContract(signer);

            contract.getUserStakeBalance(PoolId, address).then((res) => {
                setBalance(res)
            })
            .catch((err) => {
            });

            })()
        }

    }, [PoolId]);

    return balance
};

export default useGetStakeBalance;
