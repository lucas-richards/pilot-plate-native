import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const Favorites = () => {
    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   
          
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Favorites!</Text>
          </View>
        </LinearGradient> 
      </>
  
    );
  }
  export default Favorites