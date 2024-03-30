import { ethers } from "ethers";
import AbiChat from "./abiChat.json";
import AbiEns from "./abiEns.json"

export const getChatContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_chat_contract_address,
        AbiChat,
        providerOrSigner
    );

export const getEnsContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_ens_contract_address,
        AbiEns,
        providerOrSigner
    );