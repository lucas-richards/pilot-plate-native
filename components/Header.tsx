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

    
    letter: {
      color: 'red',
    }

  });


export default Header;