import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SignInForm from '../components/SignInForm';
import SignUpForm from "../components/SignUpForm";
import { signOut } from '../api/auth'
import { DbContext } from '../DataContext';
import { useNavigation } from '@react-navigation/native';


const Profile = () => {
    
    const navigation = useNavigation(); // needed for navigation
    const [signOptionToggle, setSignOptionToggle] = useState(false)
    const {user, setUser} = useContext(DbContext);

    //console.log('render profile page')


  const confirmSignOut = () => {
    Alert.alert("Are you sure you want to Sign Out", "", [
      {
        text: 'No',
        onPress: () => console.log('Cancel sign out'),
        style: 'cancel'
      },
      {
        text: "Sign Out",
        onPress: () => handleSignOut()
      },
    ])
  }
  
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
                {user ? (
                    // Display profile information
                    <View style={{marginTop:150}}>
                      <Text style={styles.text}>Welcome Back!</Text>
                      <Text style={styles.text}>{user.email}</Text>
                    
                      <View style={{alignItems:'center'}}>
                        <Text onPress={() => navigation.navigate('FriendsScreen',{ })} style={{textAlign:'center',fontSize:20, margin:10, }}>
                          Friends Page
                        </Text>
                      </View>

                      <View>
                        <View
                          //onPress={confirmSignOut}
                          style={{alignItems:'center'}}
                        >
                          <Text onPress={confirmSignOut} style={styles.button}>
                            SIGN OUT
                          </Text>
                        </View>
                      </View>
                      
                    </View>
                ) : (

                    <View style={styles.container}>
                    
                        {signOptionToggle ? (
                          <SignInForm
                              setUser = {setUser} 
                              setSignOptionToggle = {setSignOptionToggle}
                              signOptionToggle = {signOptionToggle}
                            />
                        ) : (
                            <SignUpForm
                              setUser = {setUser}
                              setSignOptionToggle = {setSignOptionToggle}
                              signOptionToggle = {signOptionToggle} />
                        )}
                        
                    </View>
                    
                )}
                
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
      width: '25%',
      textAlign: 'center',
      padding: 3,
      fontSize: 20,
      backgroundColor: 'black',
      color: 'white',
      //marginTop: 20,
    },

  });



  export default Profile