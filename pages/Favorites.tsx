import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAllBusinesses } from '../api/business';
import { FontAwesome } from '@expo/vector-icons';
import { Alert } from "react-native";
import { removeBusiness } from "../api/business";
import { useNavigation } from '@react-navigation/native';
import { DbContext } from '../DataContext';
import { createTransaction } from '../api/transaction';
import DialogInput from 'react-native-dialog-input';
import DropDownPicker from 'react-native-dropdown-picker';



const Favorites = () => {
  const [businesses,setBusinesses] = useState([])
  const [dialogVisible, setDialogVisible] = useState(false)
  const [busToBeRemoved, SetBusToBeRemoved] = useState(businesses[0])
  
  const navigation = useNavigation(); // needed for navigation
  const { dbChange, setDbChange, user, rating, setRating } = useContext(DbContext);

  const [drop, setDrop] = useState('')

  
    useEffect(()=>{
        getAllBusinesses()
            .then(res => {
                if(user && drop.length === 0) {
                  setDrop(user.email)
                }

                if (user) {
                  
                  const ownerBusinesses = res.data.businesses.filter(business => business.owner.email === drop)
                  setBusinesses(ownerBusinesses)
                }
            })
            .catch(err => {
                console.log('error',err)
                
            })

    },[user, dbChange, rating, drop])

    console.log('render favorites page')

    const handleClick = (item) => {
      

        Alert.alert('Remove restaurant', 'Remove this restaurant from favorites?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Remove', 
            onPress: () => {
              removeBusiness(user, item._id)
                .then((res) => {
                  console.log('Business removed from favorites => business._id=',item._id);
                  //the business item info needed
                  SetBusToBeRemoved(item)
                })
                .catch((err) => {
                  console.log('Error removing business._id =>', err, item._id);
                });
              //toggle alert - comments for transactions
              setDialogVisible(true)
              }
            },
          ]);
    }
      
    const newTransaction = (comment) => {
      console.log('Remove Pressed', busToBeRemoved._id)

            createTransaction(user, {
              business_name: busToBeRemoved.name,
              yelp_id: busToBeRemoved.yelp_id,
              image_url: busToBeRemoved.image_url,
              favorite: false,
              owner: user._id,
              display_address:busToBeRemoved.display_address,
              comment: comment
            })
              .then((res) => {
                console.log('Transaction created', res.config.data);
                //cause refresh 
                setDbChange(!dbChange)
              })
              .catch((err) => {
                console.log('Error creating transaction:', err);
              });

      
      }

    if(!user){
        return <Text style={{textAlign:'center', marginTop:100, color:'black'}}>Please login to view favorites</Text>
    }

    // console.log('owner businesses',businesses)

    if(businesses.length === 0){
        return <Text style={{textAlign:'center', marginTop:100, color:'black'}}>No favorites yet</Text>
    }

    const handleOpenMaps = (address) => {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      Linking.openURL(mapsUrl);
    };

    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   

        {user ?
          <DropDownPicker
            items={[{label:user.email, value: user.email}, ...user.friends.map((friend) =>({label:friend, value: friend}))]}
            defaultValue={`${user.email}`}
            placeholder={`${user.email}`}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => setDrop(item.value)}
          />
          :
          null
        }


          <Text style={styles.title}>Favorites!</Text>
              <FlatList
                data={businesses}
                renderItem={({item}) => 
                  
                    <View style={styles.item}>
                      <TouchableOpacity onPress={() => navigation.navigate('DetailScreen',{ 
                        selectedBusiness: item,
                        user: user,
                        drop: drop,
                        // dbChange: dbChange,
                        // setDbChange: setDbChange
                        })}>
                        <Image 
                          style={styles.image} 
                          source={{uri: `${item.image_url}`}}
                        />
                      </TouchableOpacity>
                        <View>
                          <Text style={styles.text1}>{item.name}</Text>
                          <TouchableOpacity 
                            style={{flexDirection: 'row', marginLeft: 5}}
                            onPress={() => handleOpenMaps(item.display_address)}>
                            <FontAwesome
                              name="map-marker"
                              size={15}
                              color="rgba(255,255,255,0.5)"
                            />
                            <Text style={styles.text2}>{item.display_address}</Text>
                          </TouchableOpacity>
                        </View>

                        { drop === user.email ?
                          <FontAwesome
                            style={{ textAlign: 'right' }}
                            name="heart"
                            size={24}
                            color="red"
                            onPress={() => handleClick(item)}
                          />
                          :
                          null
                        }
                        <DialogInput isDialogVisible={dialogVisible}
                            title={"Write a comment"}
                            message={"Why did you remove this restaurant from your favorites?"}
                            hintInput ={"comment"}
                            cancelText={"No comment"}
                            submitInput={ (inputText) => {
                              console.log('input',inputText)
                              console.log("from Dialog",item)
                              newTransaction(inputText)
                              setDialogVisible(false)
                            } }
                            closeDialog={ () => {
                              newTransaction('no comment')
                              setDialogVisible(false)
                              }}>
                        </DialogInput>
                    </View>

                    
                  
                  }
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
      padding: 3,
      width: 220,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 8,
      height: 80,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 10,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 10,
      margin: 7,
    },
  })
