import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Card, Button, Icon} from 'react-native-elements';
import { getbusinesses } from '../api/yelp_api';
//stars
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import HeartFavorite from '../components/HeartFavorite';

// home page
const Home = ({location, price, category, radius, user}) => {

  const [data, setData] = React.useState([])
  const [spin, setSpin] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  
  const [randomRestaurant, setRandomRestaurant] = React.useState({
    image_url: 'https://s3-media0.fl.yelpcdn.com/bphoto/9Y4sB4D2z7jzqj3XZPb9jA/o.jpg',
    name: 'Loading...',
    location: {
      display_address: ['Loading...']
    },
    display_phone: 'Loading...',
    rating: 0,
    review_count: 0,
    distance: 0,
    price:"$"
  
  })
  

  React.useEffect(() => {
    getbusinesses(location, price, category, radius)
      .then(res => {
        setData(res.data.businesses)
        // setLoading(false)
        return res.data.businesses
      })
      .then(data => {
        setRandomRestaurant(data[(Math.floor(Math.random() * data.length))])
      })
      .catch(err => { console.log('err', err) })
 
  },[spin, location, price, category, radius])

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handlePress = async () => {
    

    setSpin(!spin)
    let delayTime = [50,50,50,50,50,50,50,50,150,150,150,200,200,200,200,300,300]
    for(let i = 0; i < 15; i++) {
      await delay(delayTime[i])
      setRandomRestaurant(data[i])
    }
    await delay(300)
    setRandomRestaurant(data[(Math.floor(Math.random() * data.length))])
    await delay(2000)
    setLoading(!loading)

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
              
              <Card.Image style={styles.cardImage} source={{ uri: `${randomRestaurant.image_url}` }} />
                
              <Card.Divider/>
              <Text style={{marginHorizontal: 10}}>
                  {randomRestaurant.name}
              </Text>
              <Text style={{marginHorizontal: 10}}>
                {/* {randomRestaurant.rating} */}
                <StarRatingDisplay rating={randomRestaurant.rating} starSize={25}/>
              </Text>
              <Text style={{marginHorizontal: 10}}>
                {randomRestaurant.price}
              </Text>
              <Text style={{marginHorizontal: 10}}>
                {Math.round((randomRestaurant.distance / 1609) * 10) / 10} mi away
              </Text>

              <HeartFavorite
                business={randomRestaurant} 
                user={user}
              />

              <Button
                onPress={() => alert(`view restaurant!${randomRestaurant.name}`)}
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