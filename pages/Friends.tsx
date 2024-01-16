import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FriendsForm from '../components/FriendsForm';
import { signOut } from '../api/auth'
import { DbContext } from '../DataContext';


const Friends = () => {
    
   
    const [signOptionToggle, setSignOptionToggle] = useState(false)
    const {user, setUser} = useContext(DbContext);

    console.log('user',user)

    const handleSignOut = async () => {
        signOut(user)
        .then(() => {
          setUser(null)
          console.log("Sign Out Success")
        })

    };

    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   

            <KeyboardAvoidingView>
                
                    <View style={styles.container}>
                    
                        <FriendsForm
                            setUser = {setUser}
                        />
                     
                    </View>
                    
            </KeyboardAvoidingView>

        </LinearGradient> 
      </>
  
    );
  }

  const styles = StyleSheet.create({

    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
      
    },
    container2: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    text: {
      justifyContent: 'center',
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    button: {
      width: '100%',
      textAlign: 'center',
      padding: 5,
      fontSize: 22,
      backgroundColor: 'black',
      color: 'white',
      marginTop: 20,
    },

  });



  export default Friends