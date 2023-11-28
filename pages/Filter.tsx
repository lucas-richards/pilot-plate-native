import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const Filter = ({location,
                  setLocation,
                  price,
                  setPrice,
                  category,
                  setCategory,
                  Radius,
                  setRadius}) => {
    

    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   
          
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Filter!</Text>
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
             
            />
            
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={category}
              onChangeText={setCategory}
              
            />
            <TextInput
              style={styles.input}
              placeholder="Radius"
              value={Radius}
              onChangeText={setRadius}
              keyboardType="numeric"
            />
            
          </View>
        </LinearGradient> 
      </>
  
    );
  }
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      maxWidth: 300,
      minWidth: 300,
    },
    container2: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
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
      marginBottom: 20,
      marginTop: 20,
    },
  });

  export default Filter