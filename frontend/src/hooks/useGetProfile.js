import { useEffect, useState } from "react";
import { getChatContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
import {
    useWeb3ModalAccount,
} from "@web3modal/ethers/react";


const useGetProfile = () => {
    const [profiles, setProfiles] = useState({
        loading: true,
        data: {},
    });

    const { chainId, address } = useWeb3ModalAccount();

    useEffect(() => {
        const contract = getChatContract(readOnlyProvider);

        contract
            .getProfile(address)
            .then((res) =>{
                setProfiles({
                    loading: false,
                    data: res,
                })
             }
            )
            .catch((err) => {
                console.error("error fetching profiles: ", err);
                setProfiles((prev) => ({ ...prev, loading: false }));
            });
    }, [address]);
    console.log(profiles)
    return profiles;
};

export default useGetProfile;
