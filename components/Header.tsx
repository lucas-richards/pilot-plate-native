import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';


const Header = () => (
    
        <Text style={styles.text}>Pl<Text style={styles.letter}>a</Text>teP<Text style={styles.letter}>i</Text>lot
        </Text>
        


    
);

const styles = StyleSheet.create({

    header: {
        //flex: 1,
        //flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 40,
        backgroundColor: '#fff',
        width: '100%',
        height: '20%',
    },
    text: {
      fontSize: 20,
      //backgroundColor: 'dodgerblue',
    },
    letter: {
      color: 'red',
    }

  });

export default Header;