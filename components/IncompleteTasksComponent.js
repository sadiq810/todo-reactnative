import React, {useState} from "react";
import {Box, Checkbox, Heading, HStack, Spinner, Text, useToast, VStack} from "native-base";
import { Entypo } from "@expo/vector-icons"
import {AsyncStorage} from "react-native";

function IncompleteTasksComponent({incomplete, fetchTasks}) {
    const toast = useToast();
    let [loading, setLoading] = useState(false);

    const handleStatusChange = async (id) => {
        try {
            setLoading(true);
            let token = await AsyncStorage.getItem('token');
            let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/task-completed', {
                method: 'POST',
                headers: {"Content-type":"application/json", "Authorization":"Bearer "+token},
                body: JSON.stringify({id})
            })

            let json = await response.json();

            if (json.status) {
                await fetchTasks();
            } else
                toast.show({
                    description: "Error occurred.",
                    placement: 'top'
                })

            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast.show({
                description: "Error occurred."+e.message,
                placement: 'top'
            })
        }
    }

    return (
        <Box>
            <Heading mb="5">In-complete tasks</Heading>
            <VStack space={2}>
                {loading && <Spinner color="indigo.500" />}
                {incomplete.map((item, itemI) => (
                    <HStack w="100%" justifyContent="space-between" alignItems="center" key={item.id}>
                        <Checkbox onChange={() => handleStatusChange(item.id)} value={item.title}>
                            <Text mx="2" _light={{color: "coolGray.800",}} _dark={{color: "coolGray.50",}}>
                                {item.title} - <Text fontSize="xs">{item.due_date}</Text>
                            </Text>
                        </Checkbox>
                    </HStack>
                ))}
            </VStack>
        </Box>
    )
}

export default IncompleteTasksComponent;
