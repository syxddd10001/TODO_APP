import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, Button, View, SafeAreaView, SafeAreaProvider, Image, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const SettingsScreen = ({navigation}) => {
        return(
                <>      
                        <LinearGradient
                        colors={['#8e54e9','#4776e6','#8e54e9']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{flex:1}}>

                       <View style={{flexDirection:'row', marginBottom: 20, paddingTop: 50}}>
				<TouchableOpacity onPress={()=>navigation.navigate('Home')}>
					<Image source={require('../assets/back_2.png')} style={{ width: 45, height: 45}}/>					
				</TouchableOpacity>
				<Text style={styles.titleContainer}>SETTINGS</Text>
			</View>
                        </LinearGradient>

                </>

        )
}

const styles = StyleSheet.create({
	container: {
	  
	  flex: 1,
	  
	},
  
	titleContainer: {
		alignSelf: 'center',
		fontSize: 20,	
		justifyContent: 'center',
		marginLeft: 50,
		fontFamily: 'Quicksand',
		color: 'white',
	},
})

export default SettingsScreen;