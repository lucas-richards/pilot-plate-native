import React, { useState, useContext, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, StyleSheet, FlatList, Dimensions, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { DbContext } from '../DataContext';
import { addFriend, getUsers, deleteFriend } from '../api/users';
import { FontAwesome } from '@expo/vector-icons';




const Friends = ({navigation:{goBack}}) => {
    //current signed in user
    const {user, setUser} = useContext(DbContext);
    //array of found users from search
    const [users, setUsers] = useState([])
    //email search bar string
    const [partialEmail, setPartialEmail] = useState('');
    const [edit, setEdit] = useState(false);

    console.log(user)

    const handleInputChange = async (input) => {

        setPartialEmail(input);
        setEdit(false);

        getUsers(input)
            .then(res => {
            const newData = res.data.users
            console.log('partial email', partialEmail)
            setUsers(newData);
                
            })
            .catch(err => {
                console.log('error',err)
                
            })
    };

    const handleAddFriend = (email) => {
        Alert.alert(
            'Add Friend',
            'Are you sure you want to add this user as a friend?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'Yes', onPress: () => {
                addFriend(user,email)
                    .then(res => {
                        console.log('res', res.data.user)
                        console.log('user', user)
                        //updates the user data with new friend
                        const newData2 = res.data.user
                        setUser(newData2)
                        //resets the email search
                        setPartialEmail('')
                        //reset the array of emails
                        setUsers([])
                    })
                    .catch(err => {
                        console.log('error',err)
                
            })
              }}
            ],
            { cancelable: false }
          );
        
    }

    const handleDeleteFriend = (email) => {
        Alert.alert(
            'Delete Friend',
            'Are you sure you want to delete this user as a friend?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'Yes', onPress: () => {
                deleteFriend(user,email)
                    .then(res => {
                        console.log('res', res.data.user)
                        console.log('user', user)
                        //updates the user data with new friend
                        const newData2 = res.data.user
                        setUser(newData2)
                        setPartialEmail('')
                        setUsers([])
                    })
                    .catch(err => {
                        console.log('error',err)
                
            })
              }}
            ],
            { cancelable: false }
          );
        
    }

    

    

    return(
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   

        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', margin:20}}>
            <AntDesign onPress={() => goBack()} name="left" size={24} color="black" />
        </View>


        <Text style={{textAlign:'center', color:'black', fontSize:20}}>
            Search Friends
        </Text>


        <View style={{alignItems:'center'}}>
            <TextInput
                placeholder='Enter email'
                onChangeText={handleInputChange}
                style={styles.searchBar}
            />
            {(() => {
            

            if (users.length === 0 && partialEmail.length > 0) {
                return <Text style={{color:'black'}}>No users found</Text>
            } else if (partialEmail !== '') {
                return <FlatList
                data={users}
                style={styles.items}
                renderItem={ ({ item }) => 
                    <Text 
                        style={styles.item}
                        onPress={() => handleAddFriend(item.email)}
                    >
                        {item.email}
                    </Text>
                }
                />
            } else {
                return null
            
            }
            })()}
            
            
        </View>
        <View style={{margin:20}}>
            <View style={{flexDirection:'row', alignItems:'baseline'}}>
            <Text style={{color:'black',marginRight:5, fontSize:20}}>
                Friends
            </Text>
            <Text 
                style={{color:'blue', fontSize:10}}
                onPress={() => setEdit(!edit)}
            >
                (Edit)
            </Text>
            </View>
            
            {
                user.friends.length === 0 ?

                <Text style={{color:'black', fontSize:12, margin:10}}>
                    No friends yet
                </Text>
                :
                <FlatList
                    data={user.friends}
                    renderItem={ ({ item }) => 
                        <View style={{flexDirection:'row', alignItems:'center', marginLeft:10}}>
                            {/* delete icon */}
                            {
                                edit ?
                                <FontAwesome
                                    style={{ textAlign: 'right', marginRight: 10 }}
                                    name="trash-o"
                                    size={24}
                                    color="black"
                                    onPress={() => handleDeleteFriend(item)}
                                />
                                :
                                <FontAwesome
                                    style={{ textAlign: 'right', marginRight: 10 }}
                                    name="user-o"
                                    size={24}
                                    color="black"
                                />
                            }
                            
                            <Text style={styles.item}>
                                {item}
                            </Text>
                        </View>
                    
                    }
                />
            }
            
            
        </View>
        


        </LinearGradient>
    )
}

export default Friends

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    searchBar: {
        width: '75%',
        borderRadius: 8,
        backgroundColor: 'white',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      items: {
        width: '75%',
        height: 150,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
      },
      item: {
        padding: 10,
        fontSize: 16,
       
      },
    })