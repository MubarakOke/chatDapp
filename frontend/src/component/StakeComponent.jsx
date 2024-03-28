import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useStake from "../hooks/useStake";

const StakeComponent = ({poolId}) => {
    const [amount, setAmount] = useState("");

    const handleStaking = useStake(parseInt(poolId), parseInt(amount));

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className="text-white bg-blue-600 py-1 px-4 rounded-md mt-5 mr-5">stake</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Stake STK</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Enter the amount of STK Token to stake
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Stake Amount
                        </Text>
                        <TextField.Input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter Amount of STK"
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Button
                        className="bg-blue-600"
                        onClick={handleStaking}
                    >
                        Stake
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default StakeComponent;
