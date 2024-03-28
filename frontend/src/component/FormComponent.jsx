import { Camera, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button,Text, TextField } from "@radix-ui/themes";
import axios from "axios";

export default function FormComponent() {
  const [selectedFile, setSelectedFile] = useState();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectImage = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

    //   const response = await axios.post(
    //     "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
    //         pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
    //       },
    //     }
    //   );

    //   const fileUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log("File URL:", fileUrl);
    } catch (error) {
      console.log("Pinata API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div>
            <Text className="mt-10 mb-4  " as="p" size="6">Create Your Account</Text>
        </div>
        <input
          type="file"
          accept="image/*"
          hidden
          className="hidden"
          id="selectFile"
          onChange={handleSelectImage}
        />
        <label
          htmlFor="selectFile"
          className="rounded-full w-32 h-32 bg-secondary flex items-center justify-center cursor-pointer">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Camera className="w-16 h-16 text-muted-foreground" />
          )}
        </label>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col my-4 w-full gap-4">
          <div className="space-y-2">
            <label className="text-sm">Username</label>
            <TextField.Input 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter username" 
            />
          </div>
          <Button variant="soft" color="gray">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}