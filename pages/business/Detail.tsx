import React, {useContext, useState} from 'react';
import { StyleSheet, View, Text, Button, Image, Touchable, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import  StarRating  from 'react-native-star-rating-widget';
import { Linking, Platform } from 'react-native';
import {Card} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import HeartFavorite from '../../components/HeartFavorite';
import { AntDesign } from '@expo/vector-icons'; 
import { DbContext } from '../../DataContext';
import { updateBusiness } from '../../api/business';

const Detail = ({route, navigation:{goBack}}) => {
    const business = route.params.selectedBusiness
    const [updateB, setUpdateB] = useState(business)
    const [rating, setRating] = useState(0);
    const { user } = useContext(DbContext);
    
    let businessAddress = business.display_address || business.location.display_address

    const dialCall = (number) => {
        console.log(number)
        number = (number.replace(/\D/g, ""))
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
     };
    

    const handleOpenMaps = (address) => {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.openURL(mapsUrl);
    };

    const handleRating = (rating) => {
        setRating(rating)
        setUpdateB({...updateB, rating: rating})
        updateBusiness(user,updateB)
            .then(res => console.log('business updated', res))
            .catch(err => console.log('err', err))
    }


    return(
        <LinearGradient
        colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
        style={{height: '100%'}}
        > 
            <View style={styles.container}>
            
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <AntDesign onPress={() => goBack()} name="left" size={24} color="black" />
                    <Text style={styles.name}>{business.name}</Text>
                    <HeartFavorite
                        business={business} 
                    />
                </View>

                <View style={styles.card}>
              
                    <Card.Image style={styles.cardImage} source={{ uri: `${business.image_url}` }} />
                    <Card.Title>
                        <Text style={{fontSize:20, fontWeight:'600', color:'black'}}>
                            {business.name} - {business.is_closed?
                                <Text style={{fontSize:16,color:'red'}}>Closed</Text>
                                :
                                <Text style={{fontSize:16,color:'green'}}>Open</Text>}
                        </Text>
                    </Card.Title>
                    <Card.Divider/>
                    
                    <View style={{flexDirection: 'row', alignItems:'center', marginHorizontal: 10, marginTop:5}}>
                        <Text style={{color:'gray'}}>
                            {/* if business coming from yelp show all reviews, if not user review */}
                            ({typeof business.price === 'number'? user.email:business.review_count})
                        </Text>
                        <StarRating 
                            onChange={handleRating}
                            rating={typeof business.price === 'number'?rating:business.rating} 
                            starSize={25}
                        /> 
                    </View>
                    
                    <View style={{margin:10}}>
                    <Text style={{fontSize:20}}>{ typeof business.price === 'number'?'$'.repeat(business.price):business.price}</Text>
                        <Text style={{marginTop:5}}>
                            {Math.round((business.distance / 1609) * 10) / 10} mi away
                        </Text>
                        <Text
                            style={{marginTop:5}}
                            onPress={() => handleOpenMaps(businessAddress)}
                        >
                            <Text style={{fontWeight:'bold'}}>
                                Address:
                            </Text> 
                            {businessAddress}
                        </Text>
                        
                        
                        <Text
                            style={{marginTop:5}}
                        >
                            <Text 
                                style={{fontWeight:'bold'}}
                                onPress={()=> dialCall(`${business.display_phone}`)}
                            >
                                Phone:
                            </Text>
                            {business.display_phone}
                        </Text>
                        
                        <Text 
                            // center image
                            style={{alignSelf:'center',marginTop:5}}
                            
                            onPress={()=> Linking.openURL(`${business.url}`)}
                        >
                            <Image 
                                style={styles.yelpImage}
                                source={require('../../assets/yelp.png')}
                            />
                            
                        </Text>
                            
                        
                            
                        
                        
                        
                    </View>
                </View>
                
            </View>
                
        </LinearGradient>
    )
}

export default Detail;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 20,
    },
    image: {
        height: 300,
        width: "75%",
        marginTop: 40,
    },
    name: {
        fontSize: 20,
        padding: 15,
    },
    card: {
        backgroundColor:'white',
        width: 300,
        height: 500,
        borderRadius:10
      },
    cardImage: {
        width: 300,
        height: 250,
        borderTopRightRadius:10,
        borderTopLeftRadius:10
    },
    yelpImage: {
        width: 50, 
        height: 50,

    }


  });