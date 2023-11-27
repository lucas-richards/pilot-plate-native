import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Card, Button, Icon} from 'react-native-elements';
import { getbusinesses } from '../api/yelp_api';

// home page
const Home = () => {

  const [data, setData] = React.useState([])
  const [spin, setSpin] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [location, setLocation] = React.useState('LA')
  const [price, setPrice] = React.useState(2)
  const [radius, setRadius] = React.useState(1000)
  const [category, setCategory] = React.useState('food')
  const [randomRestaurant, setRandomRestaurant] = React.useState({
    image_url: 'https://s3-media0.fl.yelpcdn.com/bphoto/9Y4sB4D2z7jzqj3XZPb9jA/o.jpg',
    name: 'Loading...',
    location: {
      display_address: ['Loading...']
    },
    display_phone: 'Loading...',
    rating: 0,
    price
  
  })
  

  React.useEffect(() => {
    getbusinesses(location, price, category, radius)
      .then(res => {
        setData(res.data.businesses)
        setLoading(false)
        return res.data.businesses
      })
      .then(data => {
        setRandomRestaurant(data[(Math.floor(Math.random() * data.length))])
      })
      .catch(err => { console.log('err', err) })
 
  },[spin])

  const handlePress = () => {
    setLoading(true)
    setSpin(!spin)
  }

    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        > 
        <Text style={{textAlign: 'center', fontSize: 25, marginTop: 30, color: 'white'}}>What do you want to eat?</Text>

          {/* restaurant card */}
          {
          randomRestaurant ? 
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.card}>
              <Card.Divider/>
              <Text style={{marginHorizontal: 10}}>
                  {randomRestaurant.name}
              </Text>
              <Text style={{marginHorizontal: 10}}>
                  {randomRestaurant.price}
              </Text>
              <Button
                onPress={() => alert('view restaurant!')}
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={{width: 100, alignSelf: 'center'}}
                title='View' />
            </View>
            <TouchableOpacity
              onPress={handlePress}
              style={ styles.button }>
              <Text style={styles.text}>SPIN</Text>
            </TouchableOpacity>
            
          </View>
          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#ffff" />
          </View>
          }
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