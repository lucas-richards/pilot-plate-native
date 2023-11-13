import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


const Header = () => (
        <Text style={styles.header} >PlatePilot</Text>
    
);

const styles = StyleSheet.create({
    header: {
        
        backgroundColor: '#fff',
        width: '100%',
        height: '5%',
        
        fontSize: 20,
        marginTop: 30,

    },
  });

export default Header;