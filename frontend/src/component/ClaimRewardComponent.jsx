import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useClaimReward from "../hooks/useClaimReward";

const ClaimRewardComponent = ({poolId}) => {
    const handleClaimReward = useClaimReward(parseInt(poolId));

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className="text-white bg-green-600 py-1 px-4 rounded-md mt-1 mr-5">Claim Reward</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Stake STK</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Are you sure you want to claim Reward STK
                </Dialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Button
                        className="bg-blue-600"
                        onClick={handleClaimReward}
                    >
                        Claim Reward
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default ClaimRewardComponent;
