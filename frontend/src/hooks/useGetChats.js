import { useEffect, useState } from "react";
import { getChatContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
import toast from "react-hot-toast";


const useGetChat = () => {
    const [chats, setChats] = useState({
        loading: true,
        data: [],
    });

    useEffect(() => {
        const contract = getChatContract(readOnlyProvider);

        contract
            .getChats()
            .then((res) =>
                setChats({
                    loading: false,
                    data: res,
                })
            )
            .catch((err) => {
                console.error("error fetching messages: ", err);
                setChats((prev) => ({ ...prev, loading: false }));
            });
    }, []);

    return chats;
};

export default useGetChat;
