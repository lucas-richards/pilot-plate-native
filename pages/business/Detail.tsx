import React, {useContext, useEffect, useState} from 'react';
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
    const [rating, setRating] = useState(business.rating);
    const { user } = useContext(DbContext);
    
    let businessAddress = business.display_address || business.location.display_address
    
    console.log('business', business)
    
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
            .then(res => console.log('business updated', res.config.data))
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
                    <Text style={{fontSize:18,fontWeight:'600', margin:10}}>
                        
                            {business.name} - {business.is_closed?
                                <Text style={{fontSize:16,color:'red'}}>Closed</Text>
                                :
                                <Text style={{fontSize:16,color:'green'}}>Open</Text>}
                        
                    </Text>
                    <View style={{flexDirection: 'row', alignItems:'center', marginHorizontal:5}}>
                        {
                            typeof business.price === 'number'?
                            <StarRating 
                            onChange={handleRating}
                            rating={typeof business.price === 'number'?rating:business.rating} 
                            starSize={25}
                            /> 
                            :
                            <StarRating 
                            onChange={()=>{console.log('yelp rating cant be changed')}}
                            rating={typeof business.price === 'number'?rating:business.rating} 
                            starSize={20}
                            /> 
                            
                        }
                        <Text style={{color:'gray'}}>
                            {/* if business coming from yelp show all reviews, if not user review */}
                            ({typeof business.price === 'number'? user.email:business.review_count})
                        </Text>
                        
                    </View>
                    <Card.Divider/>
                    
                    <View style={{marginHorizontal:10}}>
                    
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <Text style={{fontSize:20}}>{ typeof business.price === 'number'?'$'.repeat(business.price):business.price}</Text>
                            <Text style={styles.category}>{business.categories[0].title}</Text>
                        </View>
                        <Text style={{marginTop:5}}>
                            {Math.round((business.distance / 1609) * 10) / 10} mi away
                        </Text>
                        <Text
                            style={{marginTop:10}}
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
        maxWidth: 300,
        minHeight: 500,
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

    },
    category: {
        color: 'rgb(236, 80, 31)',
        fontSize: 12,
        marginTop: 5,
        borderColor: 'rgb(236, 80, 31)',
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,

    }


  });