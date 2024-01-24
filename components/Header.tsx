import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';


const Header = ( {fontSize}) => (

    
      <Text style={{fontSize:fontSize}}>
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

<<<<<<< HEAD
    
=======

>>>>>>> cad0f48d8d1c11e2c99651999b111a552fdd6b8e
    letter: {
      color: 'red',
    }

  });


export default Header;