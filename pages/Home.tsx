import React, { useContext, useState, useRef } from 'react';
import { Dimensions,StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Card, Button, Icon} from 'react-native-elements';
import { getbusinesses } from '../api/yelp_api';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Detail from './business/Detail';
import { useNavigation } from '@react-navigation/native';
import { DbContext } from '../DataContext';
import Carousel from 'react-native-reanimated-carousel';
//stars
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import HeartFavorite from '../components/HeartFavorite';

import { PixelRatio } from 'react-native';


// home page
const Home = ({location, price, category, radius, }) => {

  const navigation = useNavigation(); // needed for navigation

  const [data, setData] = React.useState([])
  const [spin, setSpin] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
    price:"$",
    // categories: []
  
  })

  const Stack = createNativeStackNavigator()

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
 
  },[ location, price, category, radius])

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

 

  const handlePress = async () => {
    
    const numImages = data.length;
    const randomIndex = Math.floor(Math.random() * numImages);
    console.log('random index:', randomIndex)
    console.log('current',carouselRef.current.getCurrentIndex())
    for (let i = 0; i < 30; i++) {
      await delay(100)
      carouselRef.current.next()
    }
    
    
    // carouselRef.current.snapToItem(randomIndex) // Snap to the random image

    // setTimeout(() => {
    //   // Stop spinning after 3 seconds and update the current index
    //   setCurrentIndex(randomIndex);
    // }, 3000);

    // setSpin(!spin)
    // let delayTime = [50,50,50,50,50,50,50,50,150,150,150,200,200,200,200,300,300]
    // for(let i = 0; i < 15; i++) {
    //   await delay(delayTime[i])
    //   setRandomRestaurant(data[i])
    // }
    // await delay(300)
    // setRandomRestaurant(data[(Math.floor(Math.random() * data.length))])
    // await delay(2000)
    // setLoading(!loading)

  }
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  //responsive font size
  const fontScale = PixelRatio.getFontScale();
  const fontSize = 20 * fontScale;

    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        > 
        
        <Text style={{textAlign: 'center', fontSize: 25, marginTop: 10, color: 'white'}}>What do you want to eat?</Text>
        
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={.65 * height}
                autoPlay={false}
                ref={carouselRef}
                mode='parallax'
                data={data}
                scrollAnimationDuration={90}
                onSnapToItem={(index) => {
                  console.log('current index:', index)
                }}
                renderItem={({ index }) => (
                  randomRestaurant ? 
                  <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.card}>
                      <Image style={{width: '100%', height: height * .35}} source={{ uri: `${data[index].image_url}` }} />
                      <Card.Divider/>
                      <View style={{marginTop: height * .02}}>
                      
                        <Text style={{marginHorizontal: 20, fontWeight:'600', fontSize: height * .025}}>
                            {data[index].name}
                        </Text>
                        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between', marginHorizontal: 10, marginTop:5}}>
                          <Text style={{marginLeft: 20, fontWeight:'600', fontSize: height * .025}}>
                            {data[index].price}
                          </Text>
                          <Text style={{marginHorizontal: 10}}>
                            {/* {data[index].rating} */}
                            <StarRatingDisplay style={{alignContent: 'center', alignItems: 'center'}} rating={data[index].rating} starSize={height * .037}/>
                          </Text>
                        </View>
                        <Text style={{marginHorizontal: 20, fontSize: height * .025}}>
                          {Math.round((data[index].distance / 1609) * 10) / 10} mi away
                        </Text>
                        <Text style={styles.category}>
                          {/* {data[index].categories[0]} */}
                        </Text>
                        <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between', marginHorizontal: 10}}>
                          <Text 
                            style={styles.viewMore}
                            onPress={() => navigation.navigate('DetailScreen',{ 
                              selectedBusiness: data[index],
                              // user: user,
                              // dbChange: dbChange,
                              // setDbChange: setDbChange
                            })}
                          >
                            More
                          </Text>
                          <HeartFavorite
                            business={data[index]}
                            comingFromFav={false} 
                            // user={user}
                            // dbChange = {dbChange}
                            // setDbChange={setDbChange}
                          />
                        </View>
  
                      </View>
                        
                        
                    </View>
                    
                    
                  </ScrollView>
                  :
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#ffff" />
                  </View>
                )}
            />
        </View>
      
        <View style={{ alignContent: 'center' , alignItems: 'center', height: height * .14}}>
          <TouchableOpacity
              onPress={handlePress}
              style={ styles.button }>
            <Text style={styles.text}>SPIN</Text>
          </TouchableOpacity>
        </View>

          
        </LinearGradient> 
      </>
  
    );
  }
  export default Home
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const fontScale = PixelRatio.getFontScale();
  const fontSize = 20 * fontScale;


  const styles = StyleSheet.create({
    viewMore: {
      fontSize: height * .028,
      color: 'green',
      borderRadius: 8,
      padding: 6,
    },
    text: {
      textAlign: 'center',
      
      padding: 10,
      width: 100,
    },
    button: {
      //marginTop: 100,
      borderRadius: 20,
      backgroundColor: 'rgba(100,100,100,0.7)',
      width: 100,
    },
    card: {
      backgroundColor:'white',
      width: '95%',
      height: '100%',
      borderRadius:10
    },
    cardImage: {
      width: '100%',
      // height: 250,
      marginBottom: 0,
      borderTopRightRadius:10,
      borderTopLeftRadius:10
    },
    category: {
      fontSize: 18,
      color: 'blue',
      borderRadius: 8,
      padding: 6,
    }

  });