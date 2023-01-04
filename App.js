import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from './Screens/Home';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import Settings from './Screens/Settings';
import CreaterGroup from './Screens/CreateGroup';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator /*screenOptions={{headerShown: false}}*/ > 
            <Stack.Screen
              name='Login'
              options={{headerShown: false}}   
              component={LoginScreen}
            />
            <Stack.Screen
              name='Registration'
              options={{headerShown: false}}
              component={RegistrationScreen}
            />
            <Stack.Screen
              name='ForgotPassword'
              options={{headerShown: true}}   
              component={ForgotPasswordScreen}
            />
            <Stack.Screen 
              name='Home'
              options={{headerShown: false}}       
              component={Home}
            />
            <Stack.Screen 
              name='CreateGroup'
              options={{headerShown: true}}       
              component={CreaterGroup}
            />
            <Stack.Screen 
              name='Settings'
              options={{headerShown: true}}   
              component={Settings}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
