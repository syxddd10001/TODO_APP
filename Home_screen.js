import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, SafeAreaView, SafeAreaProvider, Image, TextInput } from 'react-native';
import GlobalStyles from './GlobalStyles';
import React, { useState } from 'react';

export default function App() {
  
  function TaskScreen({navigation}) {
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
            <SwipeListView 
              data={}
              renderItem={}
              renderHiddenItem={}  
            />
            
  
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
  }}
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
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textBox: {
    flex: 1,
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'white',
    borderRadius: 20,
  },
  removeButtonContainer: {
    marginLeft: 10,
  },
});