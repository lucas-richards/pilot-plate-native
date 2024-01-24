import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Header from '../components/Header';

const BrandingPage = () => {
  return (
<<<<<<< HEAD
  
      <View style={styles.container}>
        {/* <Image source={require('../assets/favicon.png')} style={styles.logo} /> */}
        <Header fontSize={36}/>
        {/* Add any additional information here */}
      </View>
 
=======
    <View style={styles.container}>
      <Header fontSize={34}/>
      {/* Add any additional information here */}
    </View>
>>>>>>> cad0f48d8d1c11e2c99651999b111a552fdd6b8e
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    
    
  },
  
});

export default BrandingPage;