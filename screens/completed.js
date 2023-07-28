import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native';
import { loadCompletedTasksFromStorage } from './tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView , Gesture, TouchableHighlight, Swipeable } from 'react-native-gesture-handler';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

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
	const CompletedScreen = ({ navigation }) => {
		const [completedTasks, setCompletedTasks] = useState([]);
		const isFocused = useIsFocused();
	
		useEffect(() => {
			loadData();
		}, [isFocused]); // Load data whenever the screen is focused or when the component mounts
	
		const loadData = async () => {
			try {
				const data = await loadCompletedTasksFromStorage();
				setCompletedTasks(data || []); // Ensure data is an array or default to an empty array
			} catch (error) {
				console.error('Error loading data from AsyncStorage:', error);
			}
		};
	
		const handleAddCompletedTask = (newTask) => {
			setCompletedTasks((prevTasks) => [...prevTasks, newTask]);
		};
	
		useEffect(() => {
			saveDataToStorage(completedTasks);
		}, [completedTasks]);
	
		const saveDataToStorage = async (data) => {
			try {
				const dataToSave = JSON.stringify(data);
				await AsyncStorage.setItem('completedTasks', dataToSave);
			} catch (error) {
				console.error('Error saving data to AsyncStorage:', error);
			}
		};
	
		const deleteTask = (index) => {
			const itemsCopy = [...completedTasks];
			itemsCopy.splice(index, 1);
			setCompletedTasks(itemsCopy);
		};
	
		// Save the data to AsyncStorage when the app is about to be closed
		const handleBeforeRemove = () => {
			saveDataToStorage(completedTasks);
		};
	
		useEffect(() => {
			navigation.addListener('beforeRemove', handleBeforeRemove);
			return () => {
				navigation.removeListener('beforeRemove', handleBeforeRemove);
			};
		}, [navigation, completedTasks]);
	
		return (
			<>
				<SafeAreaView style={styles.container}>
					<View>
						<Text style={styles.titleContainer}>COMPLETED TASKS</Text>
	
						<ScrollView>
							{completedTasks.map((item, index) => (
								<GestureHandlerRootView key={index}>
									<Swipeable renderRightActions={() => <RightSwipeActions onDelete={() => deleteTask(index)} />}>
										<View style={styles.rectangle}>
											<Text>{item}</Text>
										</View>
									</Swipeable>
								</GestureHandlerRootView>
							)).reverse()}
						</ScrollView>
					</View>
				</SafeAreaView>
			</>
		);
	};
	
	const styles = StyleSheet.create({
		container: {
			marginBottom: 170,
			flex: 1,
		},
	
		titleContainer: {
			alignSelf: 'center',
			fontSize: 20,
			marginBottom: 10,
		},
	
		rectangle: {
			flexDirection: 'row',
			borderRadius: 10,
			padding: 15,
			backgroundColor: 'white',
			marginBottom: 15,
			height: 50,
			alignItems: 'center',
			justifyContent: 'space-between',
		},
	});
	
	export default CompletedScreen;