import React, { useState, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, StyleSheet, FlatList} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { DbContext } from '../DataContext';




const Friends = ({navigation:{goBack}}) => {

    const {user, setUser} = useContext(DbContext);
    const [search, setSearch] = useState('')
    
    //call the backend to do a search based on what it typed out
    // const filteredUsers = response based on {search}
    

    return(
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   

        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <AntDesign onPress={() => goBack()} name="left" size={24} color="black" />
        </View>


        <Text style={{textAlign:'center', color:'black', fontSize:20}}>
        Friends
        </Text>


        <View style={{alignItems:'center'}}>
            <TextInput
                placeholder='Search'
                onChangeText={setSearch}
                style={styles.searchBar}
            />
            <Text>
                {search}
            </Text>
            {/* <FlatList
                data={filteredUsers}
                renderItem={ ({ item }) => <Text>{item}</Text>}
            /> */}
        </View>


        </LinearGradient>
    )
}

export default Friends

const styles = StyleSheet.create({
    searchBar: {
        width: '50%',
        borderRadius: 8,
        backgroundColor: 'white',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    })