import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, SafeAreaView, SafeAreaProvider, Image, TextInput, TouchableOpacity } from 'react-native';
import GlobalStyles from './GlobalStyles';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TaskScreen from './tasks'
import LinearGradient from 'react-native-linear-gradient';


const theme_color = 'lightskyblue';


const HomeScreen = ({navigation}) =>{
return (
  <>
  
  <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 400, backgroundColor: 'bisque' }}>
    <Text style={{fontSize:25, fontFamily:"monospace"}}>TO DO LIST MAKER</Text>
    <Text style={{fontFamily:"monospace"}}>Simple To Do List maker</Text>
  
  </SafeAreaView>  
  
  <SafeAreaView style={styles.bottombar}>     
    
    <TouchableOpacity onPress={() => navigation.navigate('Tasks') }> 
    
      <View>  
       <View style={styles.icons}>
        <Image source={require('../assets/task_2.png')} style={{ width: 64, height: 64}}/>
       </View>
       <Text style={{alignSelf: 'center'}}>TASKS</Text>
       
      </View>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={() => navigation.navigate('Completed') }> 
      <View>
        <View style={styles.icons}>
       <Image source={require('../assets/taskcompleted2.png')} style={{ width: 64, height: 64}}/>
      
       </View>
       <Text style={{alignSelf: 'center'}}>FINISHED</Text>

      </View>
    </TouchableOpacity>

    

    <TouchableOpacity onPress={() => navigation.navigate('Tasks') }> 
      <View >
       <Image source={require('../assets/settings2.png')} style={{ width: 70, height: 70}}/>
       <Text style={{alignSelf: 'center'}}>SETTINGS</Text>

      </View>
    </TouchableOpacity>
  </SafeAreaView>
  
  </>
);
}

styles = StyleSheet.create({
  icons: {
				backgroundColor: 'transparent',
        
				alignItems: 'center',
				justifyContent: 'space-between',
        
        
  },

  bottombar:{ 
      flexDirection: 'row',       
			justifyContent: 'space-between',
      backgroundColor: 'bisque'
  },
 



});


export default HomeScreen;