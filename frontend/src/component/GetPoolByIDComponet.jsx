import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon} from '@radix-ui/react-icons'
import { useState, useEffect } from "react";
import useGetPoolById from "../hooks/useGetPoolById";

const GetPoolByIDComponet = ({setPools, poolId, setPoolId}) => {
    
    const [debouncePoolId, setDebouncePoolId] = useState("");
    const poolDetail = useGetPoolById(parseInt(poolId))

    useEffect(()=>{
        const timeoutId= setTimeout(()=>{
            setPoolId(debouncePoolId)
        }, 1000)

        return ()=>{clearTimeout(timeoutId)}
    }, [debouncePoolId])

    useEffect(()=>{
        setPools(poolDetail)
    }, [poolDetail])

    return (
        <div>
            <TextField.Root>
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
                <TextField.Input 
                    value={debouncePoolId}
                    onChange={(e) => setDebouncePoolId(e.target.value)} 
                    placeholder="Search for pool…" />
            </TextField.Root>
        </div>
    );
};

export default GetPoolByIDComponet;
