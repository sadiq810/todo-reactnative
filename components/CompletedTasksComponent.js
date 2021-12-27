import {Box, Checkbox, Heading, HStack, Text, VStack} from "native-base";
import React from "react";

function CompletedTasksComponent({complete}) {

    return (
        <Box>
            <Heading mb="5">Completed tasks</Heading>
            <VStack space={2}>
                {complete.map((item, itemI) => (
                    <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.id}>
                    <Text mx="2" strikeThrough={item.status}
                        _light={{
                            color: item.status ? "gray.400" : "coolGray.800",
                        }}
                        _dark={{
                            color: item.status === 0 ? "gray.400" : "coolGray.50",
                        }}
                    >
                        {item.title}
                    </Text>
                    </HStack>
                ))}
            </VStack>
        </Box>
    )
}

export default CompletedTasksComponent;
