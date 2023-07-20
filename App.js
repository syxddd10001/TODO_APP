import React,{ useState, Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, Button, View, SafeAreaView, Animated, SafeAreaProvider, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import GlobalStyles from './GlobalStyles';
import { SwipeListView } from 'react-native-swipe-list-view';

const Stack = createNativeStackNavigator();


function HomeScreen({navigation}) {
  return (
    <>
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </SafeAreaView>
    <SafeAreaView style={{ flexDirection: 'row'}}>   
      <TouchableOpacity onPress={() => navigation.navigate('Tasks') }> 
        <View>
         <Image source={require('./assets/tasks_icon.png')} style={{ width: 100, height: 84, color: 'transparent'}}/>

        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Lists') }> 
        <View>
         <Image source={require('./assets/online-shopping.png')} style={{ width: 80, height: 80, color: 'transparent'}}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Tasks') }> 
        <View>
         <Image source={require('./assets/calendar.png')} style={{ width: 80, height: 80, color: 'transparent'}}/>

        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Tasks') }> 
        <View>
         <Image source={require('./assets/settings.png')} style={{ width: 80, height: 80, color: 'transparent'}}/>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
    
    </>
  );
}

function ListScreen({navigation}){
  return(
    <>
      
    </>
  )
}


function TaskScreen({navigation}){
  const [textInputs, setTextInputs] = useState([]);
  const [textBoxName, setTextBoxName] = useState('oldName');

  const handleRenameTextBox = (newName) => {
    setTextBoxName(newName);
  };
  const addButton = () => {
    setTextInputs((prevInputs) => [
      ...prevInputs,
      { id: Date.now().toString(), value: '' },
    ]);
  };
  const removeTextBox = (id) => {
    setTextInputs((prevInputs) =>
      prevInputs.filter((textInput) => textInput.id !== id)
    );
  };

  return(
    <>
    
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Tasks" component={TaskScreen} />
      <Stack.Screen name="Lists" component={ListScreen} />

  
      <SafeAreaView style = {{flex: 1, alignItems: 'center'}}>
        
        
        <Text style ={{fontSize:30}}> TASKS </Text>
        {
          textInputs.map((textInput, index) => (
          <View key={textInput.id} style={styles.textBoxContainer}>
            <Text style={styles.number}>{index + 1}</Text>
            <TouchableOpacity onLongPress={() => removeTextBox(textInput.id)}> 
            <View>  
            <Text>TASK</Text>    
            </View>
            </TouchableOpacity> 
               
          </View>
          
          
        ))}
        
        <TouchableOpacity onPress={ addButton }> 
        <View>
         <Image source={require('./assets/addButton.png')} style={{ width: 70, height: 70}}/>    
        </View>
        </TouchableOpacity>
      </SafeAreaView>
    
            

    </>
  )
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tasks" component={TaskScreen} />
        <Stack.Screen name="Lists" component={ListScreen} />

      </Stack.Navigator>
    </NavigationContainer>
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