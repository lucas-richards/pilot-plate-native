import React, { useState } from 'react';
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
    
    const [locationValue, setLocationValue] = useState(location)
    const [priceValue, setPriceValue] = useState(price)
    const [categoryValue, setCategoryValue] = useState(category)
    const [radiusValue, setRadiusValue] = useState(Math.floor(radius * 0.000621371)) //converted to miles         
    const [message, setMessage] = useState(true)

    const handleSignOut = async () => {
      setLocation(locationValue)
      setPrice(priceValue)
      setCategory(categoryValue)
      setRadius((radiusValue * 1609.344).toFixed(0)) //set to meter value

      // show message for two seconds
      setMessage(true)
      setTimeout(() => {
        setMessage(false)
      }, 2000)

  };

  console.log('render filter page')
    




    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   
        {
          message ?
          <Text style={styles.message}>Saved!</Text>
          :
          null
        }
        
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            >
            <Text style={styles.text}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={locationValue}
              onChangeText={setLocationValue}
             
            />
            <Text style={styles.text}>Price: {"$".repeat(priceValue)}</Text>
          
            <Slider 
              style={styles.slider}
              min={1} 
              max={3} 
              values={[priceValue]}
              showLabel={false}
              markerColor='#fff'
              onChange={ (values) => setPriceValue(values[0]) }
            />
            <Text style={styles.text}>Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Coffee, Desserts, Mexican, etc"
              // value={categoryValue}
              onChangeText={setCategoryValue}
              
            />
            
            <Text style={styles.text}>Distance: {radiusValue} mi</Text>
            <Slider 
              style={styles.slider}
              min={1} 
              max={20} 
              increment={1}
              showLabel={false}
              values={[radiusValue]} 
              markerColor='#fff'
              onChange={ (values) => setRadiusValue((values)) }
            />

          <TouchableOpacity onPress={handleSignOut} >
            <Text style={styles.button}>
              Save
            </Text>
          </TouchableOpacity>
            
            
            
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
      paddingLeft: 10,
      paddingRight: 10,
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
    message: {
      marginBottom: 20,
      backgroundColor: 'white',
      textAlign: 'center',
      padding: 5,
      marginTop: 25,
      position: 'absolute',
      left: '25%',
      width: '75%',

    },
  });

  export default Filter