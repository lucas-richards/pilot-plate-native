import React from 'react';
import { StyleSheet, View, Text, Button, Image, Touchable, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Linking, Platform } from 'react-native';
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
                        // user={user}
                        // dbChange = {dbChange}
                        // setDbChange={setDbChange}
                    />
                </View>

                <Image
                    style={styles.image}
                    source={{uri: `${business.image_url}`}}
                />
                

                <Text style={styles.name}>{business.name}</Text>

                <StarRatingDisplay rating={business.rating} starSize={25}/>
                <View style={{borderColor:'white'}}>

                    <Text>{business.price}</Text>

                    <TouchableOpacity onPress={()=> dialCall(`${business.display_phone}`)}>
                    <Text>
                        {business.display_phone}
                    </Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                    style={styles.container}
                    onPress={() => handleOpenMaps(businessAddress)}>
                            <FontAwesome
                            
                              name="map-marker"
                              size={15}
                              color="rgba(255,255,255,0.5)"
                            />
                            <Text>{businessAddress}</Text>
                </TouchableOpacity>

                
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


  });