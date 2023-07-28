import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, SafeAreaView, SafeAreaProvider, Image, TextInput, TouchableOpacity } from 'react-native';
import GlobalStyles from './GlobalStyles';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TaskScreen from './tasks'

const HomeScreen = ({navigation}) =>{
return (
  <>
  
  <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{fontSize:25, fontFamily:"monospace"}}>TO DO LIST MAKER</Text>
    <Text style={{fontFamily:"monospace"}}>Simple To Do List maker</Text>

  </SafeAreaView>
  
  <SafeAreaView style={{ flexDirection: 'row', flex: 1, justifyContent:'center', alignItems:'flex-end', alignContent:'space-between'}}>   
    <TouchableOpacity onPress={() => navigation.navigate('Tasks') }> 
      <View>
       <Image source={require('../assets/tasks_icon.png')} style={{ width: 100, height: 84, color: 'transparent'}}/>
       <Text style={{}}>       TASKS</Text>

      </View>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={() => navigation.navigate('Completed') }> 
      <View>
       <Image source={require('../assets/check-mark.png')} style={{ width: 70, height: 70, color: 'transparent'}}/>
       <Text style={{}}>COMPLETED </Text>

      </View>
    </TouchableOpacity>

    

    <TouchableOpacity onPress={() => navigation.navigate('Tasks') }> 
      <View>
       <Image source={require('../assets/settings.png')} style={{ width: 80, height: 80, color: 'transparent'}}/>
       <Text style={{}}>    SETTINGS</Text>

      </View>
    </TouchableOpacity>
  </SafeAreaView>
  
  </>
);
}

export default HomeScreen;