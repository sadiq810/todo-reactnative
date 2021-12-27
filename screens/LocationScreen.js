import React, {useEffect, useState} from "react";
import {Box, Button, Center, FlatList, Heading, HStack, Spacer, Text, useToast, View, VStack} from "native-base";
import FooterTab from "../components/FooterTab";
import {AsyncStorage} from "react-native";
import GetLocation from 'react-native-get-location'

function LocationScreen({navigation}) {
    const toast = useToast();
    let [loading, setLoading] = useState(false);
    let [locations, setLocations] = useState([]);
    let [lat, setLat] = useState('');
    let [lng, setLng] = useState('');
    let [address, setAddress] = useState('');

    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(location => {
            setLat(location.latitude);
            setLng(location.longitude);
            fetchAddress(location.latitude, location.longitude)
        }).catch(error => {
            const { code, message } = error;
            toast.show({
                description: "Error occurred."+message,
                placement: 'top'
            })
        });

        fetchLocations();
    }, []);

   const fetchAddress = async (lat, lng) => {
        try {
            let response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyBQhaezqwq3wXWnWl7nk2RD7QCIYpHCVZA");
            let res = await response.json();

            if (res.error_message) {
                toast.show({
                    description: res.error_message,
                    placement: 'top'
                })
            } else {
               setAddress(res.results[0].formatted_address)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

   const fetchLocations = async () => {
        try {
            setLoading(true);
            let token = await AsyncStorage.getItem('token');
            let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/locations', {
                method: 'GET',
                headers: {"Content-type":"application/json", "Authorization":"Bearer "+token},
            })

            let json = await response.json();

            if (json.status)
                setLocations(json.data);
            else toast.show({
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

    const deleteItem = async (id) => {
        try {
            setLoading(true);
            let token = await AsyncStorage.getItem('token');
            let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/checkin', {
                method: 'DELETE',
                headers: {"Content-type":"application/json", "Authorization":"Bearer "+token},
                body: JSON.stringify({id})
            })

            let json = await response.json();

            if (json.status)
                await fetchLocations();
            else toast.show({
                description: "Error occurred.",
                placement: 'top'
            })

        } catch (e) {
            setLoading(false);
            toast.show({
                description: "Error occurred."+e.message,
                placement: 'top'
            })
        }
    }

    const saveAddress = async () => {
        try {
            setLoading(true);
            let token = await AsyncStorage.getItem('token');

            let response = await fetch('https://todo-laravel-backend-api.herokuapp.com/api/checkin', {
                method: 'POST',
                headers: {"Content-type":"application/json", "Authorization":"Bearer "+token},
                body: JSON.stringify({latitude: lat, longitude: lng, address})
            })

            let json = await response.json();

            if (json.status)
                await fetchLocations();
            else toast.show({
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
        <Box
            flex={1} bg="white" safeAreaTop
        >
            <Heading fontSize="xl" p="4" pb="3">
                Current Location
            </Heading>
            <FlatList
                data={[{lat, lng, address}]}
                renderItem={({ item }) => (
                    <Box borderBottomWidth="1" _dark={{borderColor: "gray.600",}} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <HStack space={3} justifyContent="space-between">
                            <VStack>
                                <Text _dark={{color: "warmGray.50",}} color="coolGray.800" bold>
                                    {item.address}
                                </Text>
                                <Text color="coolGray.600" _dark={{color: "warmGray.200",}}>
                                    {item.lat}, {item.lng}
                                </Text>
                            </VStack>
                            <Spacer />
                            <Button variant="outline" colorScheme="success" alignSelf={'flex-start'} onPress={() => saveAddress()}>
                                Add
                            </Button>
                        </HStack>
                    </Box>
                )}
                keyExtractor={(item) => item.id}
            />

            <Heading fontSize="xl" p="4" pb="3">
                Previous Locations
            </Heading>
            <FlatList
                data={locations}
                renderItem={({ item }) => (
                    <Box borderBottomWidth="1" _dark={{borderColor: "gray.600",}} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <HStack space={3} justifyContent="space-between">
                            <VStack>
                                <Text
                                    _dark={{
                                        color: "warmGray.50",
                                    }}
                                    color="coolGray.800"
                                    bold
                                >
                                    {item.location}
                                </Text>
                                <Text
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                >
                                    {item.latitude}, {item.longitude}
                                </Text>
                            </VStack>
                            <Spacer />
                            <Button variant="outline" colorScheme="red" alignSelf={'flex-start'} onPress={() => deleteItem(item.id)}>
                                Delete
                            </Button>
                        </HStack>
                    </Box>
                )}
                keyExtractor={(item) => item.id}
            />
            <FooterTab navigation={navigation}/>
        </Box>
    );
}

export default LocationScreen;
