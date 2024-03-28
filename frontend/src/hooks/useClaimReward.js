import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { ethers } from "ethers";
import { getStakingContract, getERC20RewardContract } from "../constants/contracts";
import toast from 'react-hot-toast';
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useClaimReward = (poolId) => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    return useCallback(async () => {
        if (!isSupportedChain(chainId)) return console.error("Wrong network");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contract = getStakingContract(signer);

        let toastId= toast.loading('Claiming Reward...');
        try {
            const transaction = await contract.claimReward(poolId);
            const receipt = await transaction.wait();

            toast.remove(toastId)
            if (receipt.status) {
                toast.success(`Reward Claim successful!`);
            }
        } catch (error) {
            toast.remove(toastId)
            toast.error(`Reward Claim failed! ${error.reason}`)
        }
    }, [poolId, chainId, walletProvider]);
};

export default useClaimReward;
