import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Center,
    Checkbox,
    Heading,
    HStack,
    Icon,
    IconButton, Spinner,
    Text,
    useToast,
    View,
    VStack
} from "native-base";
import FooterTab from "../components/FooterTab";
import { AsyncStorage } from 'react-native';
import CompletedTasksComponent from "../components/CompletedTasksComponent";
import IncompleteTasksComponent from "../components/IncompleteTasksComponent";

function TaskScreen({navigation}) {
    const [complete, setComplete] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const toast = useToast();
    let [loading, setLoading] = useState(false);

    useEffect( () => {
        fetchTasks();
        checkLogin()
    }, []);

    const checkLogin = async () => {
        let token = await AsyncStorage.getItem('token');

        if (!token)
            navigation.navigate('Login');
    }

    const fetchTasks = async() => {
        try {
            let token = await AsyncStorage.getItem('token');
            setLoading(true);

            let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/tasks', {
                method: 'GET',
                headers: {"Content-type":"application/json", "Authorization":"Bearer "+token},
            })

            let json = await response.json();

            if (json.complete) {
                setComplete(json.complete);
                setIncomplete(json.incomplete);
            } else
                toast.show({
                    description: "Error occurred.",
                    placement: 'top'
                })
            setLoading(false);
        } catch (e) {
            toast.show({
                description: "Error occurred."+e.message,
                placement: 'top'
            })
        }
    }


    return (
        <Box flex={1} bg="white" safeAreaTop>
            {loading && <Spinner color="indigo.500" />}
            <Center flex={1}>
               <IncompleteTasksComponent incomplete={incomplete} fetchTasks={fetchTasks}/>
                <CompletedTasksComponent complete={complete}/>
            </Center>
            <FooterTab navigation={navigation}/>
        </Box>
    );
}

export default TaskScreen;
