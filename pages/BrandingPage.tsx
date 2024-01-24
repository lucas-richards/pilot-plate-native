import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Header from '../components/Header';

const BrandingPage = () => {
  return (
    <View style={styles.container}>
      <Header fontSize={34}/>
      {/* Add any additional information here */}
    </View>
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