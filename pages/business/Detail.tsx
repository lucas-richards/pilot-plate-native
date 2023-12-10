import React from 'react';
import { View, Text, Button } from 'react-native';

const Detail = ({route, navigation:{goBack}}) => {
    const business = route.params.selectedBusiness
    console.log(business)
    return(
        <View>
            <Text>Detail Page</Text>
            <Button onPress={() => goBack()} title="Go Back" />
            <Text>{business.name}</Text>
            <Text>{business.display_phone}</Text>
            <Text>{business.rating}</Text>
            <Text>{business.price}</Text>
        </View>
    )
}

export default Detail;