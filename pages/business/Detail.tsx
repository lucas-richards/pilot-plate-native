import React from 'react';
import { StyleSheet, View, Text, Button, Image, Touchable, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Linking, Platform } from 'react-native'

const Detail = ({route, navigation:{goBack}}) => {
    const business = route.params.selectedBusiness
    console.log(business)

    const dialCall = (number) => {
        console.log(number)
        number = (number.replace(/\D/g, ""))
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
     };
    
    return(
        <LinearGradient
        colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
        style={{height: '100%'}}
        > 
            <View style={styles.container}>

                <Image
                    style={styles.image}
                    source={{uri: `${business.image_url}`}}
                />

                <Text style={styles.name}>{business.name}</Text>

                <StarRatingDisplay rating={business.rating} starSize={25}/>

                <TouchableOpacity onPress={()=> dialCall(`${business.display_phone}`)}>
                <Text>
                    {business.display_phone}
                </Text>
                </TouchableOpacity>
                

                <Text>{business.price}</Text>

                <Button onPress={() => goBack()} title="Go Back" />
            </View>
                
        </LinearGradient>
    )
}

export default Detail;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
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