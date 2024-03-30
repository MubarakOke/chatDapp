import { Camera, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button,Text, TextField } from "@radix-ui/themes";
import toast from 'react-hot-toast';
import useSetEnsDetail from "../hooks/useSetEnsDetail";
import useUploadToIPFS from "../hooks/useUploadToIPFS";

export default function FormComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setEnsDetail = useSetEnsDetail();
  const uploadToIPFS = useUploadToIPFS(selectedFile);

  const handleSelectImage = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !username){
      toast.error('Please fill all fields!');
      return
    }

    try{
      setIsLoading(true);
      const imageUri= await uploadToIPFS();
      await setEnsDetail(username, imageUri); 
    }
    catch(error){
      toast.error(`Creating account failed! ${error.reason}`)
      setIsLoading(false);
    }   
    finally{
      setIsLoading(false);
    }   
};


  return (
    <div className="flex items-center justify-center w-[450px]">
      <div className="w-full flex flex-col items-center border-white border-solid border-[2px] p-9">
        <div className="">
            <Text className="mb-[6rem] mt-2 text-[white]" as="p" size="8">Create Your Account</Text>
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
          className="rounded-full w-32 h-32 text-[white] bg-secondary flex items-center justify-center cursor-pointer">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Camera className="w-16 h-16 text-muted-foreground" />
          )}
        </label>

        <div
          className="flex flex-col my-4 w-full gap-4">
          <div className="space-y-2">
            <label className="text-sm">Username</label>
            <TextField.Input 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter username" 
            />
          </div>
          <Button onClick={handleSubmit} variant="solid" color="gray">
          {isLoading ? (
                        <>
                            <Loader2 className="animate-spin w-4 h-4 mr-2" />
                            Registering your accout...
                        </>
                    ) : (
                        "Register"
                    )}
          </Button>
        </div>
      </div>
    </div>
  );
}