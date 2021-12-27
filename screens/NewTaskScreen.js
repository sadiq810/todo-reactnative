import React, {useState} from "react";
import {Box, Button, Center, FormControl, Heading, Input, Spinner, Text, useToast, View, VStack} from "native-base";
import FooterTab from "../components/FooterTab";
import DateTimePicker from '@react-native-community/datetimepicker';
import {AsyncStorage, Platform} from "react-native";

function NewTaskScreen({navigation}) {
    let [title, setTitle] = useState('');
    let [detail, setDetail] = useState('');
    let [dueDate, setDueDate] = useState(new Date());
    let [loading, setLoading] = useState(false);
    let [show, setShow] = useState(false);
    const toast = useToast()

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dueDate;
        setShow(Platform.OS === 'ios');
        setDueDate(currentDate);
    };

    const handleSubmit = async () => {
        try {
            alert(JSON.stringify({title: title, detail: detail, due_date: dueDate.getTime()/1000}))
            setLoading(true);
            let token = await AsyncStorage.getItem('token');
            let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/create-task', {
                method: 'POST',
                headers: {"Content-type":"application/json", "Authorization":"Bearer "+token},
                body: JSON.stringify({title: title, detail: detail, due_date: dueDate.getTime()/1000})
            })

            let json = await response.json();

            if (json.status) {
                navigation.navigate('Tasks');
            } else {
                toast.show({
                    description: "Error occurred.",
                    placement: 'top'
                })
            }

            setLoading(false);
        } catch (e) {
            toast.show({
                description: "Error occurred."+e.message,
                placement: 'top'
            })
            setLoading(false);
        }
    }

    return (
        <Box flex={1} bg="white" safeAreaTop>
            {loading && <Spinner color="indigo.500" />}
            <Center flex={1}>
                <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading size="lg" color="coolGray.800" _dark={{color: "warmGray.50",}} fontWeight="semibold">
                    New Task
                </Heading>
                <Heading mt="1" color="coolGray.600" _dark={{color: "warmGray.200",}} fontWeight="medium" size="xs">
                    Enter details of Task
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Title</FormControl.Label>
                        <Input onChangeText={(value) => setTitle(value)} value={title}/>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Detail</FormControl.Label>
                        <Input onChangeText={(value) => setDetail(value)} value={detail}/>
                    </FormControl>
                    <FormControl>
                        <Button size="sm" onPress={() => setShow(true)}>
                            Select Due Date
                        </Button>
                        {show && <DateTimePicker
                            testID="dateTimePicker"
                            value={dueDate}
                            mode={'datetime'}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />}
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={handleSubmit} isDisabled={loading}>
                        Save
                    </Button>
                </VStack>
                </Box>
            </Center>
            <FooterTab navigation={navigation}/>
        </Box>
    );
}

export default NewTaskScreen;
