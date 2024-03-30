import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import {
    useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import FormComponent from "./component/FormComponent";
import { Toaster } from 'react-hot-toast';
import Landing from './pages/landing/Landing';
import Chat from './pages/chat/Chat'
import useIsRegistered from "./hooks/useIsRegistered";

configureWeb3Modal();

function App() {
    const { chainId } = useWeb3ModalAccount();
    const isRegistered = useIsRegistered();

    // useEffect(()=>{
    // }, [getAllPool, poolId])


    return (
        <div className="">
            {
                (chainId && isRegistered)? 
                    <div><Chat /></div>
                :
                    <div>
                        <Header />
                        <Landing />
                    </div>
            }
            <Toaster />
        </div>
    );
}

export default App;
