import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Card, Button, Icon} from 'react-native-elements';

// home page
const Home = () => {
    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   
          {/* restaurant card */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.card}>
              <Card.Image style={styles.cardImage} source={require('../assets/wireframe2.png')} />
              <Card.Divider/>
              <Text style={{marginHorizontal: 10}}>
                  restaurant info
              </Text>
              <Text style={{marginHorizontal: 10}}>
                  more info
              </Text>
              <Text style={{marginHorizontal: 10}}>
                  more info
              </Text>
              <Button
                onPress={() => alert('view restaurant!')}
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{width: 100, alignSelf: 'center'}}
                title='View' />
            </View>
            <TouchableOpacity
              onPress={() => alert('SPINNN!!!!')}
              style={ styles.button }>
              <Text style={styles.text}>SPIN</Text>
            </TouchableOpacity>

          </View>
        </LinearGradient> 
      </>
  
    );
  }
  export default Home

  const styles = StyleSheet.create({
    text: {
      textAlign: 'center',
      padding: 10,
      width: 100,
    },
    button: {
      marginTop: 20,
      borderRadius: 20,
      backgroundColor: 'rgba(100,100,100,0.7)'
    },
    card: {
      backgroundColor:'white',
      width: 300,
      height: 400,
      borderRadius:10
    },
    cardImage: {
      width: 300,
      height: 250,
      borderRadius:10
    }

  });