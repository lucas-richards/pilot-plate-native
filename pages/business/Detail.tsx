import React from 'react';
import { View, Text } from 'react-native';

const Detail = ({business}) => {
    return(
        <View>
            <Text>{business.name}</Text>
            <Text>{business.address}</Text>
            <Text>{business.phone}</Text>
            <Text>{business.website}</Text>
            <Text>{business.description}</Text>
        </View>
    )
}

export default Detail;