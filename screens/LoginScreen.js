import * as React from "react"
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Center,
    Spinner,
    useToast
} from "native-base";
import {useState} from "react";
import { AsyncStorage } from 'react-native';


const LoginScreen = ({navigation}) => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [loading, setLoading] = useState(false);
    const toast = useToast()

    const handleLogin = async () => {
        try {
            setLoading(true);

            let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/login', {
                method: 'POST',
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({email: email, password: password})
            });

            let json = await response.json();

            if (json.token) {
                await AsyncStorage.setItem(
                    'token',
                    json.token
                );
                navigation.navigate('Tasks')
            } else {
                toast.show({
                    description: "Error occurred."+json.message,
                    placement: 'top'
                })
            }

            setLoading(false);
        } catch (e) {
            toast.show({
                description: "Error occurred: "+ e.message,
                placement: 'top'
            })
            setLoading(false);
        }
    }

    return (
        <Center flex={1} px="3">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
            {loading && <Spinner color="indigo.500" />}
            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{color: "warmGray.50",}}>
                Welcome
            </Heading>
            <Heading mt="1" _dark={{color: "warmGray.200",}} color="coolGray.600" fontWeight="medium" size="xs">
                Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email ID</FormControl.Label>
                    <Input onChangeText={(value) => setEmail(value)} value={email}/>
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" value={password} onChangeText={value => setPassword(value)}/>
                </FormControl>
                <Button mt="2" colorScheme="indigo" onPress={handleLogin} isDisabled={loading}>
                    Sign in
                </Button>
            </VStack>
        </Box>
        </Center>
    )
}

export default LoginScreen;
