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

const useCreateStake = (rewardRate) => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    return useCallback(async () => {
        if (!isSupportedChain(chainId)) return console.error("Wrong network");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contract = getStakingContract(signer);
        const contractReward = getERC20RewardContract(signer);

        let toastId= toast.loading('Approving Contract to spend...');
        try {
            const transactionERC20 = await contractReward.approve(import.meta.env.VITE_erc20_reward_contract_address, ethers.parseUnits("100", 18))
            await transactionERC20.wait()
            toast.success(`Contract Approved to spend!`)

            toast.remove(toastId)
            toastId= toast.loading('Creating Pool...');
            const transaction = await contract.createPool(rewardRate);
            const receipt = await transaction.wait();

            toast.remove(toastId)
            if (receipt.status) {
                toast.success(`Pool created successful!`);
            }
        } catch (error) {
            toast.remove(toastId)
            toast.error(`Pool creation failed! ${error.reason}`)
        }
    }, [rewardRate, chainId, walletProvider]);
};

export default useCreateStake;
