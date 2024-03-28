import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useCreateStake from "../hooks/useCreateStake";

const CreateStakeComponent = () => {
    const [rewardRate, setRewardRate] = useState("");

    const handleCreateStake = useCreateStake(parseInt(rewardRate));

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className="bg-blue-600">Create Pool</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Edit profile</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Create new pool
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Reward Rate
                        </Text>
                        <TextField.Input
                            value={rewardRate}
                            onChange={(e) => setRewardRate(e.target.value)}
                            placeholder="Enter Reward Rate"
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
                        onClick={handleCreateStake}
                    >
                        Create Pool
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default CreateStakeComponent;
