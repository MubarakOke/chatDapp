import { useCallback } from "react";
import axios from "axios";

const useUploadToIPFS = (selectedFile) => {

    return useCallback(async () => {
        if(selectedFile){
            const formData = new FormData();
            formData.append("file", selectedFile);
            const response = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                        pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
                    },
                }
            )
            return response.data.IpfsHash
        }

    }, [selectedFile]);
};

export default useUploadToIPFS;
