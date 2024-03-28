import { ethers } from "ethers";
import AbiChat from "./abiChat.json"

export const getChatContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_chat_contract_address,
        AbiChat,
        providerOrSigner
    );


export const getStakingContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_staking_contract_address,
        AbiStaking,
        providerOrSigner
    );

export const getERC20RewardContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_erc20_reward_contract_address,
        AbiERC20,
        providerOrSigner
    );

export const getERC20StakingContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_erc20_staking_contract_address,
        AbiERC20,
        providerOrSigner
    );
