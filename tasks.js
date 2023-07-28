import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Keyboard, View, SafeAreaView, SafeAreaProvider, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import GlobalStyles from './GlobalStyles';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { GestureHandlerRootView , Gesture, TouchableHighlight, Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const theme_color = 'lightskyblue';
const RightSwipeActions = ({ onDelete }) => {
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

			
		  }}
		>
		  Delete
		</Text>
	  </TouchableOpacity>
	);
  };
const Task = ({text, onDelete}) =>{
	
	
	return(
		<GestureHandlerRootView>
			<Swipeable renderRightActions={() => <RightSwipeActions onDelete={ onDelete } />} renderLeftActions={() => null}>
				<View style={styles.rectangle} >	
					<View style={styles.square}></View>	
					<Text style={styles.TasksStyle}>{text}</Text>
					<TouchableOpacity style={styles.circle} ></TouchableOpacity>
				</View>
			</Swipeable>
		</GestureHandlerRootView>
	);

}


const TaskScreen = ({navigation}) =>{
	const [taskItems, setTaskItems] = useState([]);
	const [task, setTask] = useState();

	useEffect(() => {
		loadDataFromStorage();
	}, []);

	useEffect(() => {
		saveDataToStorage();
	  }, [taskItems]);


	const loadDataFromStorage = async () => {
		try{
			const data = await AsyncStorage.getItem('taskItems');
			if (data !== null){
				setTaskItems(JSON.parse(data));
			} 
		} catch (error){
			console.error('error loading data from storage', error);
		}

	};

	const saveDataToStorage = async () => {
		try{
			const dataToSave = JSON.stringify(taskItems);
			await AsyncStorage.setItem('taskItems', dataToSave);
		} catch (error){
			console.error('Error saving data to storage', error);
		}
		
	}



	const handleAddTask = () => {
		if (task.trim()) {
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
	
	
	return(
	<>
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.TitleText}>TASKS</Text>
			
				<ScrollView>
					{taskItems.map((item, index) => (
					<View key={index}>
						<Task text={item} onDelete={() => deleteTask(index)}/>
					</View>
						
					))}
				</ScrollView>
				
			</View>
		</SafeAreaView>
		<SafeAreaView style={{}}>		
				<KeyboardAvoidingView 
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.writeTaskWrapper}>
				<TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text=>setTask(text)}/>

				<TouchableOpacity style={styles.textWrapper} onPress={() => handleAddTask()}>
				
					<View style={styles.addWrapper}>
						<Text> + </Text>
					</View>
				</TouchableOpacity>

				</KeyboardAvoidingView>
		</SafeAreaView>
			
		
		
  </>
	);

}

const styles = StyleSheet.create({

			container:{			
				marginBottom: 170,
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
					
			},

			TitleText: {
				alignSelf: 'center',
				fontSize: 24,
				fontWeight: 'bold',
				marginBottom: 10,
			},

			square:{
				width: 21,
				height: 21,
				borderRadius: 7,
				backgroundColor: theme_color,
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