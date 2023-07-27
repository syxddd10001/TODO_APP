import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, Keyboard, View, SafeAreaView, SafeAreaProvider, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import GlobalStyles from './GlobalStyles';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

const theme_color = 'lightskyblue';

const Task = (props) =>{
	

	return(
		<>
			<TouchableOpacity style={styles.rectangle} >
				
				<View style={styles.square}></View>	
				<Text style={styles.TasksStyle}>{props.text}</Text>
				<TouchableOpacity style={styles.circle}></TouchableOpacity>
			</TouchableOpacity>
		</>

	);

}


const TaskScreen = ({navigation}) =>{
	const [taskItems, setTaskItems] = useState([]);
	const [task, setTask] = useState();


	const handleAddTask = () => {
		if (task.trim()) {
			Keyboard.dismiss();
			setTaskItems([...taskItems, task]);
			setTask('');
		}
	}
	
	const completeTask = (index) => {
		const itemsCopy = [...taskItems]; // Create a copy of the taskItems array
		itemsCopy.splice(index, 1); // Remove the task at the specified index
		setTaskItems(itemsCopy); // Update the state with the modified array
	};

	return(
	<>
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.TitleText}>TASKS</Text>
				
				{
					taskItems.map((item, index) => 
						<TouchableOpacity key={index} onLongPress={ () => completeTask(index)}>
						<Task  text={item} />
						</TouchableOpacity>
          	)
				}
				
				
			</View>
						
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
				flex: 1,
				backgroundColor: '#E8EAED',

			},		

			textWrapper:{
				
			},

			writeTaskWrapper: { 
				position: 'absolute',
				width: '100%',
				bottom: 40,
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
				marginLeft: 15,
				marginRight: 20,
				alignItems: 'center',
				justifyContent: 'space-between'
			},


})

export default TaskScreen;