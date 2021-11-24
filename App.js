import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Signup from './screens/Register';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import List from './screens/List';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
        >
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Signup} />
          <Stack.Screen name='Welcome' component={Welcome} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='List' component={List} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height //for full screen
  },
});
