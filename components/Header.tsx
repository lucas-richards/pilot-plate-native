import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';


const Header = () => (

    
      <Text style={styles.text}>
        Pl
        <Text style={styles.letter}>
          a
        </Text>
        teP
        <Text style={styles.letter}>
          i
        </Text>
        lot
      </Text>
    
      
);

const styles = StyleSheet.create({

    text: {
      fontSize: 20,
    },
    letter: {
      color: 'red',
    }

  });


export default Header;