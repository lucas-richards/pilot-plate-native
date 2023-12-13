import React from 'react';
import { StyleSheet, View, Text, Button, Image, Touchable, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Linking, Platform } from 'react-native';
import {Card} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import HeartFavorite from '../../components/HeartFavorite';
import { AntDesign } from '@expo/vector-icons'; 

const Detail = ({route, navigation:{goBack}}) => {
    const business = route.params.selectedBusiness
    
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
                        
                    <Card.Divider/>
                    <Text style={{marginHorizontal: 10, fontWeight:'600'}}>
                        {business.name}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between', marginHorizontal: 10, marginTop:5}}>
                        <Text style={{fontSize:20}}>{ typeof business.price === 'number'?'$'.repeat(business.price):business.price}</Text>
                            <Text style={{marginHorizontal: 10}}>
                            {/* {business.rating} */}
                            <StarRatingDisplay rating={business.rating} starSize={25}/>
                            </Text>
                    </View>
                    <View style={{margin:10}}>
                        
                        <Text
                            onPress={() => handleOpenMaps(businessAddress)}
                        >Address: {businessAddress}</Text>
                        
                        
                            <Text>
                                <Text 
                                    style={{fontWeight:'400'}}
                                    onPress={()=> dialCall(`${business.display_phone}`)}
                                >Phone:</Text>
                                {business.display_phone}
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
        height: 400,
        borderRadius:10
      },
      cardImage: {
        width: 300,
        height: 250,
        borderTopRightRadius:10,
        borderTopLeftRadius:10
      },


  });