import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAllBusinesses, removeBusiness } from '../api/business';



const Favorites = ({user}) => {
  const [businesses,setBusinesses] = useState([])

    useEffect(()=>{
        getAllBusinesses()
            .then(res => {
                console.log('this is user',user)
                if (user)
                setBusinesses(res.data.businesses.filter(business => business.owner._id === user._id))
            })
            .catch(err => {
                console.log('error',err)
                
            })
    },[user])

    if(!user){
        return <Text style={{textAlign:'center', marginTop:100, color:'black'}}>Please login to view favorites</Text>
    }

    console.log('owner businesses',businesses)

    if(businesses.length === 0){
        return <Text style={{textAlign:'center', marginTop:100, color:'black'}}>No favorites yet</Text>
    }

    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   
          <Text style={styles.title}>Favorites!</Text>
              <FlatList
                data={businesses}
                renderItem={({item}) => 
                  <View style={styles.item}>
                      <Image 
                        style={styles.image} 
                        source={{uri: `${item.image_url}`}}
                      />
                      <View>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.display_address}</Text>
                      </View>
                  </View>}
              />
        </LinearGradient> 
      </>
  
    );
  }
  export default Favorites

  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      margin: 10,
    },
    text: {
      color: 'white',
      fontSize: 15,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 8,
      height: 80,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 10,
      padding: 10,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 10,
    },
  })
