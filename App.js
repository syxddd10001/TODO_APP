import React,{ useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, Button, View, SafeAreaView, SafeAreaProvider, Image, TextInput } from 'react-native';
import GlobalStyles from './GlobalStyles';


function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title='LIST' onPress={() => navigation.navigate('ListScreen')}></Button>
    </SafeAreaView>
  );
}
function ListScreen({navigation}) {
  const [textInputs, setTextInputs] = useState([]);
  const addTextBox = () => {
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

  const handleInputChange = (id, text) => {
    setTextInputs((prevInputs) =>
      prevInputs.map((textInput) =>
        textInput.id === id ? { ...textInput, value: text } : textInput
      )
    );
  };
  
  return (
    <>
        <Text></Text>
        <Text></Text>
    <SafeAreaView style={GlobalStyles.droidSafeArea}>      
      <Text style={{color:'black',fontSize:35}}>TO DO LIST MAKER</Text>
      <Text style={{color:'black',}}>Add To Do Items</Text>
      {textInputs.map((textInput, index) => (
        <View key={textInput.id} style={styles.textBoxContainer}>
          <Text style={styles.number}>{index + 1}</Text>
          <TextInput
            style={styles.textBox}
            value={textInput.value}
            onChangeText={(text) => handleInputChange(textInput.id, text)}
          />
            <Button
              marginLeft= "10px"
              color = "brown"
              title="DEL"
              onPress={() => removeTextBox(textInput.id)}  
            />      
          
        </View>
        
      ))}
      <Button title="             +            " onPress={addTextBox} color="lightgreen" />   
    </SafeAreaView>
    </>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ListScreen" component={ListScreen} />
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
  buttons: {

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