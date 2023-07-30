import React,{ useState, Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, Button, View, SafeAreaView, Animated, SafeAreaProvider, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home_screen'
import TaskScreen from './screens/tasks'
import CompletedScreen from './screens/completed'
import SettingsScreen from './screens/settings'
import * as SystemUI from 'expo-system-ui';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {
  
  return (
    <>   
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tasks" component={TaskScreen} />
        <Stack.Screen name="Completed" component={CompletedScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  textBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  number: {
    marginRight: 10,
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: 'red',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 50
},
  textBox: {
    flex: 1,
    height: 40, 
    paddingHorizontal: 10,
    color: 'black',
    borderRadius: 5,
  },
  
});

export default App;