import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import GetPoolByID from "./component/GetPoolByIDComponet"
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import FormComponent from "./component/FormComponent";
import useIsRegistered from "./hooks/useIsRegistered";
import { Toaster } from 'react-hot-toast';


configureWeb3Modal();

function App() {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const isRegistered = useIsRegistered();

    // useEffect(()=>{
    // }, [getAllPool, poolId])

    console.log("isRegistered", isRegistered);

    return (
        <Container>
            <Header />
            <main className="mt-6">
                <div>
                    <FormComponent />
                </div>
            </main>
            <Toaster />
        </Container>
    );
}

export default App;
