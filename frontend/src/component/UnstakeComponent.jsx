import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useUnstake from "../hooks/useUnstake";

const UnstakeComponent = ({poolId}) => {

    const handleUnstaking = useUnstake(parseInt(poolId));

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className="text-white bg-blue-600 py-1 px-4 rounded-md mt-5 mr-5">Unstake</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Stake STK</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Are you sure you want to unstake STK
                </Dialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Button
                        className="bg-blue-600"
                        onClick={handleUnstaking}
                    >
                        Unstake
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default UnstakeComponent;
