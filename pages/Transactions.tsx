import React, { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DbContext } from '../DataContext';
import { getTransactions } from '../api/transaction';
import { FontAwesome } from '@expo/vector-icons';


const Transactions = () => {
    
    const {user, setUser, dbChange} = useContext(DbContext);
    const [transactions, setTransactions] = useState([])

    useEffect(()=>{
      getTransactions()
          .then(res => {
            setTransactions(res.data.transactions)
              
          })
          .catch(err => {
              console.log('error',err)
              
          })
  },[dbChange])

  console.log('render transactions page')

   

    return (
      
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   
        
          <Text style={styles.title}>News</Text>
          {
            transactions.length === 0 ?
            // loading
            <ActivityIndicator style={styles.title} size="large" color="#ffff" />
            :
            
          
          <FlatList
                data={transactions}
                renderItem={({item}) => 
                  
                    <View style={styles.item}>
                      <TouchableOpacity 
                        // onPress={() => navigation.navigate('DetailScreen',{ 
                        // selectedBusiness: item,
                        // user: user,
                        // })}
                        >
                        <Image 
                          style={styles.image} 
                          source={{uri: `${item.image_url}`}}
                        />
                      </TouchableOpacity>
                        <View>
                          
                          <Text style={styles.text1}>
                            {
                             Math.floor((Date.now() - Date.parse(item.createdAt)) / (1000 * 60 * 60 * 24))===0?
                              'Today ':
                              Math.floor((Date.now() - Date.parse(item.createdAt)) / (1000 * 60 * 60 * 24)) + 'd '
                            }
                            
                            {item.favorite ? 
                              <FontAwesome name="heart" size={15} color="red" />
                              :
                              <FontAwesome name="heart-o" size={15} color="black" />
                            }
                              
                          </Text>
                          <Text style={styles.text2}>
                           {item.owner.email} {item.favorite ? 
                              <Text>added <Text style={{fontWeight:'bold'}}>{item.business_name}</Text> to favorites</Text> 
                              : 
                              <Text>removed <Text style={{fontWeight:'bold'}}>{item.business_name}</Text> from favorites</Text>
                            }
                          </Text>
                          <Text style={styles.comment}>
                            "{item.comment}"
                          </Text>
                          
                        </View>
                      </View>
                      }
                      />
            }
          
        </LinearGradient> 
      
  
    )
  }

  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      margin: 10,
    },
    text1: {
      color: 'white',
      flexWrap: 'wrap',
      fontSize: 15,
      padding: 3,
      width: 200,
    },
    text2: {
      color: 'white',
      flexWrap: 'wrap',
      fontSize: 10,
      marginLeft: 5,
      padding: 3,
      width: 220,
    },
    comment: {
      color: 'white',
      fontStyle: 'italic',
      fontWeight: 'bold',
      flexWrap: 'wrap',
      fontSize: 12,
      marginLeft: 5,
      padding: 3,
      width: 220,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 8,
      paddingBottom: 15,
      height: 100,
      borderBottomColor: 'rgba(0,0,0,0.2)',
      borderBottomWidth: 1,
      borderRadius: 10,
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 50,
      margin: 7,
    },
  })



  export default Transactions