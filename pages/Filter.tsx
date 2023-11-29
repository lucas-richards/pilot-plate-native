import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Platform,
 } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from "react-native-a11y-slider";


const Filter = ({location,
                  setLocation,
                  price,
                  setPrice,
                  category,
                  setCategory,
                  radius,
                  setRadius}) => {
    

    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   
          
          <Text style={styles.title}>Settings</Text>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            >
            <Text style={styles.text}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
             
            />
            <Text style={styles.text}>Price: {"$".repeat(price)}</Text>
          
            <Slider 
              style={styles.slider}
              min={1} 
              max={3} 
              values={[price]}
              showLabel={false}
              markerColor='#fff'
              onChange={ (values) => setPrice(values[0]) }
            />
            <Text style={styles.text}>Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={category}
              onChangeText={setCategory}
              
            />
            
            <Text style={styles.text}>Distance: {(radius/ 1609.344).toFixed(1)} mi</Text>
            <Slider 
              style={styles.slider}
              min={1} 
              max={15} 
              increment={0.5}
              showLabel={false}
              values={[radius]} 
              markerColor='#fff'
              onChange={ (values) => setRadius((values[0]* 1609.344).toFixed(0)) }
            />
            
            
            
            
          </KeyboardAvoidingView>
          
        </LinearGradient> 
      </>
  
    );
  }
  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 20,
      textAlign: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: 'white',
      padding: 10,
      fontSize: 20,
      marginBottom: 20,
      borderRadius: 25,
      width: '100%',
    },
    slider: {
      marginBottom: 20,
    },
    
    button: {
      width: '100%',
      textAlign: 'center',
      padding: 5,
      fontSize: 22,
      backgroundColor: 'black',
      color: 'white',
    },
    error: {
      color: 'white',
      marginBottom: 20,
      backgroundColor: 'rgba(100,100,100, 0.6)',
      textAlign: 'center',
      padding: 5,
      marginTop: 25,
    },
    text: {
      fontSize: 20,
      margin:10
    },
  });

  export default Filter