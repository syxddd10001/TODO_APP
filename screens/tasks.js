import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, Keyboard, View, SafeAreaView, SafeAreaProvider, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import GlobalStyles from './GlobalStyles';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { GestureHandlerRootView , Gesture, TouchableHighlight, Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import {LinearGradient} from 'expo-linear-gradient';
const theme_color = 'lightskyblue';

export const RightSwipeActions = ({ onDelete }) => {
	return (
	  <TouchableOpacity
		onPress={onDelete}
		style={{
		  backgroundColor: 'red',
		  justifyContent: 'center',
		  alignItems: 'flex-end',
		  borderRadius: 10,
		  width: 80,
		  height: 50,
		}}
	  >
		<Text
		  style={{
			color: 'white',
			alignSelf: 'center',
			paddingHorizontal: 10,
			paddingVertical: 10,
			fontFamily: 'Quicksand'		
		  }}
		>
		  Delete
		</Text>
	  </TouchableOpacity>
	);
  };

  const LeftSwipeActions = ({ onComplete }) => {
	return (
	  <TouchableOpacity
		onPress={onComplete}
		style={{
		  backgroundColor: 'green',
		  justifyContent: 'center',
		  alignItems: 'flex-end',
		  borderRadius: 10,
		  width: 80,
		  height: 50,
		}}
	  >
		<Text
		  style={{
			color: 'white',
			alignSelf: 'center',
			paddingHorizontal: 10,
			paddingVertical: 10,
			fontFamily: 'Quicksand'	
		  }}
		>
		  Done
		</Text>
	  </TouchableOpacity>
	);
};

export const Task = ({text, onDelete, onComplete, timeStamp}) =>{
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
	
	return(
		<GestureHandlerRootView>
			<Swipeable renderRightActions={() => <RightSwipeActions onDelete={ onDelete } />} renderLeftActions={() => <LeftSwipeActions onComplete={ onComplete } />}>
				<View style={styles.rectangle} >	
					<View style={styles.square}></View>	
					<Text style={styles.TasksStyle}>{text}</Text>
					
				</View>
			</Swipeable>
		</GestureHandlerRootView>
	);

}
export const loadCompletedTasksFromStorage = async () => {
	try {
	  const data = await AsyncStorage.getItem('completedTasks');
	  if (data !== null) {
	    return JSON.parse(data);
	  } else {
	    return [];
	  }
	} catch (error) {
	  console.error('Error loading data from AsyncStorage:', error);
	  return [];
	}
      };

const TaskScreen = ({navigation}) =>{
	const [taskItems, setTaskItems] = useState([]);
	const [task, setTask] = useState();
	const [completedTasks, setCompletedTaskItems] = useState([]);
	const [isFontLoaded, setFontLoaded] = useState(false);

	

	useEffect(() => {
		loadDataFromStorage();
	}, []);

	useEffect(() => {
		saveDataToStorage();
	  }, [taskItems]);


	const loadDataFromStorage = async () => {
		try{
			const data_0 = await AsyncStorage.getItem('taskItems');
			const data_1 = await AsyncStorage.getItem('completedTasks');
			
			if (data_0 !== null){
				setTaskItems(JSON.parse(data_0));
			} 
			if (data_1 != null){
				setCompletedTaskItems(JSON.parse(data_1));		
			}
		} catch (error){
			console.error('error loading data from storage', error);
		}

	};

	const saveDataToStorage = async () => {
		try{
			const dataToSave_0 = JSON.stringify(taskItems);
			const dataToSave_1 = JSON.stringify(completedTasks);

			await AsyncStorage.setItem('taskItems', dataToSave_0);
			await AsyncStorage.setItem('completedTasks', dataToSave_1);
			
		} catch (error){
			console.error('Error saving data to storage', error);
		}
		
	}



	const handleAddTask = () => {
		if (task != ''){
			Keyboard.dismiss();
			
			setTaskItems([...taskItems, task]);
			setTask('');
		}
		
	};

	
	
	const deleteTask = (index) => {
		const itemsCopy = [...taskItems]; 
		itemsCopy.splice(index, 1); 
		setTaskItems(itemsCopy); 
	};

	const completeTask = (index) => {
		const itemsCopy = [...taskItems];
		const completedTask = itemsCopy.splice(index, 1)[0]; // Remove the task and get the removed item
		setTaskItems(itemsCopy); // Update the state with the modified array
		setCompletedTaskItems([...completedTasks, completedTask]);
	};
	
	
	return(
	<>
		

		<LinearGradient
		colors={['#8e54e9','#4776e6','#8e54e9']} // Define your gradient colors here
		start={{ x: 0, y: 0 }}
		end={{ x: 1, y: 1 }}
		style={styles.container2}>
		<SafeAreaView style={styles.container}>
			<SafeAreaView>
				<View style={{flexDirection:'row', marginBottom: 20, paddingTop: 50}}>
					<TouchableOpacity onPress={()=>navigation.navigate('Home')}>
						<Image source={require('../assets/back_2.png')} style={{ width: 45, height: 45, color: 'transparent'}}/>					
					</TouchableOpacity>
					<Text style={styles.TitleText}>TASKS</Text>
				</View>
				<ScrollView>
					{taskItems.map((item, index) => (
					<View key={index}>
						<Task text={item} onDelete={() => deleteTask(index)} onComplete={() => completeTask(index)}/>
					</View>
						
					))}
				</ScrollView>
				
			</SafeAreaView>
		</SafeAreaView>
		<SafeAreaView style={{}}>		
				<KeyboardAvoidingView 
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.writeTaskWrapper}>
				<TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text=>setTask(text)}/>

				<TouchableOpacity style={styles.textWrapper} onPress={() => handleAddTask()}>
				
					<View style={styles.addWrapper}>
						<Text style={{fontFamily: 'Quicksand'}}> + </Text>
					</View>
				</TouchableOpacity>

				</KeyboardAvoidingView>
		</SafeAreaView>
		</LinearGradient>
		
		
  </>
	);

}

const styles = StyleSheet.create({

			container:{			
				marginBottom: 170,
				flex:1
			},		
			container2:{			
				
				flex:1
			},
			textWrapper:{
				
			},

			writeTaskWrapper: { 
				position: 'absolute',
				width: '100%',
				bottom: 50,
				flexDirection: 'row',
				justifyContent: 'space-around',
				alignItems: 'center',
				
			},
			input: {
				paddingVertical: 13,
				paddingHorizontal: 15,
				width: 270,
				backgroundColor: 'white',
				borderRadius: 60,
				borderColor: '#C0C0C0',
				borderWidth: 1,
				fontFamily: 'Quicksand'
			},

			addWrapper:{
				width: 60,
				height: 60,
				backgroundColor: '#FFF',
				borderRadius: 50,
				justifyContent: 'center',
				alignItems: 'center',
				borderWidth: 0.4,
				
			},

			addText:{

			},
	
	
			circle:{	
				radius: 7,
				borderColor: theme_color,
				borderWidth: 2,
				borderHeight: 5,
				height: 18,
				width: 18 ,
				borderRadius: 6,

			},

			TasksStyle :{
				flex:1,
				alignSelf: 'flex-start',
				textAlign: 'left',
				maxWidth: '80%',
				marginRight: 20,
				fontFamily: 'Quicksand',
			},

			TitleText: {
				
				fontSize: 24,
				fontFamily: 'Quicksand',
				marginBottom: 10,
				
				
				color: 'white',

			},

			square:{
				width: 21,
				height: 21,
				borderRadius: 7,
				backgroundColor: 'darkviolet',
				opacity: 0.7, 
				marginRight: 15,
				flexWrap: 'wrap',
			},

			rectangle:{
				flexDirection: 'row',
				borderRadius: 10,
				padding: 15,
				backgroundColor: 'white',
				marginBottom: 15,
				
				alignItems: 'center',
				justifyContent: 'space-between'
			},


})

export default TaskScreen;