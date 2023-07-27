import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, SafeAreaView, SafeAreaProvider, Image, TextInput, TouchableOpacity } from 'react-native';
import GlobalStyles from './GlobalStyles';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import tasks from './tasks';

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
       <Image source={require('./assets/tasks_icon.png')} style={{ width: 100, height: 84, color: 'transparent'}}/>
       <Text style={{}}>       TASKS</Text>

      </View>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={() => navigation.navigate('Lists') }> 
      <View>
       <Image source={require('./assets/online-shopping.png')} style={{ width: 80, height: 80, color: 'transparent'}}/>
       <Text style={{}}>  TASK LIST</Text>

      </View>
    </TouchableOpacity>

    

    <TouchableOpacity onPress={() => navigation.navigate('Tasks') }> 
      <View>
       <Image source={require('./assets/settings.png')} style={{ width: 80, height: 80, color: 'transparent'}}/>
       <Text style={{}}>    SETTINGS</Text>

      </View>
    </TouchableOpacity>
  </SafeAreaView>
  
  </>
);
}

export default HomeScreen;