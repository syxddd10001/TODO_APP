import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, SafeAreaView, SafeAreaProvider, Image, TextInput, TouchableOpacity } from 'react-native';
import GlobalStyles from './GlobalStyles';
import React, { useState, useEffect  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TaskScreen from './tasks'
import SettingsScreen from './settings';
import {LinearGradient} from 'expo-linear-gradient';
import * as Font from 'expo-font';





const HomeScreen = ({navigation}) =>{
  const [isFontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Quicksand': require('../assets/fonts/Quicksand.ttf'),
      });

      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!isFontLoaded) {
    // Font is still loading, you can show a loading screen or fallback font here
    return <Text>Loading...</Text>;
  }
  

  return (
  <>
 
      
    
      
    

<LinearGradient
      colors={['#8e54e9','#4776e6','#8e54e9']} // Define your gradient colors here
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'column', justifyContent:'space-between'}}>
    <View style={{justifyContent:'center', flex:1}}>
      <Text style={{fontSize:25, fontFamily:"Quicksand", color: 'white'}}>TO DO LIST MAKER</Text>
      <Text style={{fontFamily:"Quicksand",color: 'white', alignSelf:'center'}}>Simple To Do List maker</Text>
    </View>
  
  
  <SafeAreaView style={styles.bottombar}>     
    
    <TouchableOpacity onPress={() => navigation.navigate('Tasks') }> 
    
      <View>  
       <View style={styles.icons}>
        <Image source={require('../assets/task_2.png')} style={{ width: 64, height: 64}}/>
       </View>
       <Text style={{alignSelf: 'center', fontFamily: 'Quicksand', color: 'white'}}>TASKS</Text>
       
      </View>
    </TouchableOpacity>
    
  
    <TouchableOpacity onPress={() => navigation.navigate('Completed') }> 
      <View>
        <View style={styles.icons}>
          <Image source={require('../assets/taskcompleted2.png')} style={{ width: 64, height: 64}}/>
        </View>
       
       <Text style={{alignSelf: 'center', fontFamily: 'Quicksand', color: 'white'}}>COMPLETED</Text>

      </View>
    </TouchableOpacity>
    

    <TouchableOpacity onPress={() => navigation.navigate('Settings') }> 
      <View>
        <View style={styles.icons}>
       <Image source={require('../assets/settings2.png')} style={{ width: 64, height: 64}}/>
        </View>
       
       <Text style={{alignSelf: 'center', fontFamily: 'Quicksand', color: 'white'}}>SETTINGS</Text>

      </View>
    </TouchableOpacity>
  
  </SafeAreaView>
  </LinearGradient>
  </>
);
}

styles = StyleSheet.create({
  icons: {
				
        borderRadius: 20,
        
				alignItems: 'center',
				justifyContent: 'space-between',
        
        
  },

  bottombar:{ 
      flexDirection: 'row',       
			justifyContent: 'space-between',
      width:350,
      alignSelf: 'center',
      
      
  },
 
  



});


export default HomeScreen;