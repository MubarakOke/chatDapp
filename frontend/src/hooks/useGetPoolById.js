import { useEffect, useState } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getStakingContract } from "../constants/contracts";
import toast from 'react-hot-toast';
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useGetPoolById = (PoolId) => {
    const [poolDetail, setPoolDetail]= useState({data: []})
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    useEffect(() => {
        if(PoolId){
            (async function obtainData(){if (!isSupportedChain(chainId)) return console.error("Wrong network");
            const readWriteProvider = getProvider(walletProvider);
            const signer = await readWriteProvider.getSigner();

            const contract = getStakingContract(signer);

            let toastId= toast.loading(`Getting pool ${PoolId}...`);
            contract.getPoolByID(PoolId).then((res) => {
                toast.remove(toastId)
                toast.success(`Pool ${PoolId} gotten successfully...`);
                setPoolDetail((prev) => ({...prev, data: [[...res]]}))
            })
            .catch((err) => {
                toast.remove(toastId)
                toast.error(`Failed to get pool ${PoolId}! ${err.reason}`)
            });

            })()
        }

    }, [PoolId]);

    return poolDetail
};

export default useGetPoolById;
