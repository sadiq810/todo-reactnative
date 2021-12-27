import React from "react";
import {Box, Button, Center, Text, View} from "native-base";
import FooterTab from "../components/FooterTab";

function CompletedTaskScreen({navigation}) {
    return (
        <Box flex={1} bg="white" safeAreaTop>
            <Center flex={1}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>CompletedTaskScreen Screen</Text>
                </View>
            </Center>
            <FooterTab navigation={navigation}/>
        </Box>
    );
}

export default CompletedTaskScreen;
