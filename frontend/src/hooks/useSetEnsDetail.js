import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { isAddress } from "ethers";
import { getProvider } from "../constants/providers";
import { getEnsContract, getChatContract } from "../constants/contracts";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import {sendMetaTx} from "../constants/relaySigner";

const useSetEnsDetail = () => {
    const { chainId, address } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    return useCallback(async (name, imageUri) => {
        if (!isSupportedChain(chainId)) return console.error("Wrong network");
        if (!isAddress(address)) return console.error("Invalid address");
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        const contractENS = getEnsContract(signer);
        const contractChat = getChatContract(signer)

        // await sendMetaTx(contract, "setDetail", readWriteProvider, signer, [name, imageUri])
        // console.log("sent successfully");
        try {
            sendMetaTx()
            const transaction = await contractENS.setDetail(name, imageUri);
            await transaction.wait();
            const transaction1 = await contractChat.register(name);
            await transaction1.wait();
            window.location.reload();
        } catch (error) {
            toast.error(`Creating account failed! ${error.reason}`)
        }
    }, [address, chainId, walletProvider]);
};

export default useSetEnsDetail;
