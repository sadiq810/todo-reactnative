
import React from 'react';
import {
    Text,
    Icon,
    HStack,
    Center,
    Pressable,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {AsyncStorage} from "react-native";

export default function FooterTab({navigation}) {
    const [selected, setSelected] = React.useState(0);

    const handleLogout = async () => {
        navigation.navigate('Login');
        await AsyncStorage.removeItem('token');
    }

    return (
        <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
            <Pressable
                opacity={selected === 0 ? 1 : 0.5}
                py="3"
                flex={1}
                onPress={() => {setSelected(0); navigation.navigate('Tasks')}}>
                <Center>
                    <Icon
                        mb="1"
                        as={
                            <MaterialCommunityIcons
                                name={selected === 0 ? 'clipboard-list' : 'clipboard-list-outline'}
                            />
                        }
                        color="white"
                        size="sm"
                    />
                    <Text color="white" fontSize="12">
                        Tasks
                    </Text>
                </Center>
            </Pressable>

            <Pressable
                opacity={selected === 1 ? 1 : 0.5}
                py="2"
                flex={1}
                onPress={() => {setSelected(1); navigation.navigate('NewTask')}}
            >
                <Center>
                    <Icon
                        mb="1"
                        as={<MaterialCommunityIcons name="playlist-edit" />}
                        color="white"
                        size="sm"
                    />
                    <Text color="white" fontSize="12">
                        New Task
                    </Text>
                </Center>
            </Pressable>

            <Pressable
                opacity={selected === 2 ? 1 : 0.6}
                py="2"
                flex={1}
                onPress={() => {setSelected(2); navigation.navigate('Locations')}}
            >
                <Center>
                    <Icon
                        mb="1"
                        as={
                            <MaterialCommunityIcons
                                name={'selection-marker'}
                            />
                        }
                        color="white"
                        size="sm"
                    />
                    <Text color="white" font="12">
                        Locations
                    </Text>
                </Center>
            </Pressable>
            <Pressable
                opacity={selected === 3 ? 1 : 0.5}
                py="2"
                flex={1}
                onPress={() => {setSelected(3); handleLogout()}}
            >
                <Center>
                    <Icon
                        mb="1"
                        as={
                            <MaterialCommunityIcons
                                name={selected === 3 ? 'location-enter' : 'location-enter'}
                            />
                        }
                        color="white"
                        size="sm"
                    />
                    <Text color="white" fontSize="12">
                        Sign Out
                    </Text>
                </Center>
            </Pressable>
        </HStack>
    );
}
