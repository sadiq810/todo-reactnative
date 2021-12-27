import React from "react";
import {
  NativeBaseProvider,
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./screens/LoginScreen";
import TaskScreen from "./screens/TaskScreen";
import LocationScreen from "./screens/LocationScreen";
import NewTaskScreen from "./screens/NewTaskScreen";
import CompletedTaskScreen from "./screens/CompletedTaskScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Tasks">
            <Stack.Screen name="Tasks" component={TaskScreen} options={{ title: 'Tasks List' }}/>
            <Stack.Screen name="NewTask" component={NewTaskScreen} options={{ title: 'New Task' }}/>
            <Stack.Screen name="CompletedTasks" component={CompletedTaskScreen} options={{ title: 'Completed Tasks List' }}/>
            <Stack.Screen name="Locations" component={LocationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerBackVisible: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
  );
}
