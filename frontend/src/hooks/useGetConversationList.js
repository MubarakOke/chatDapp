import { useEffect, useState } from "react";
import { getChatContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
import toast from "react-hot-toast";


const useGetConversationList = () => {
    const [conversationList, setConversationList] = useState({
        loading: true,
        data: [],
    });

    useEffect(() => {
        const contract = getChatContract(readOnlyProvider);

        contract
            .getConversationList()
            .then((res) =>{
                console.log("conversation", res);
                setConversationList({
                    loading: false,
                    data: res,
                })
              }
            )
            .catch((err) => {
                console.error("error fetching conversion list: ", err);
                setConversationList((prev) => ({ ...prev, loading: false }));
            });
    }, []);

    return conversationList;
};

export default useGetConversationList;
