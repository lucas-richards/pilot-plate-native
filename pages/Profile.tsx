import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SignInForm from '../components/SignInForm';
import SignUpForm from "../components/SignUpForm";
import { signOut } from '../api/auth';


const Profile = ({ user, setUser }) => {
    //const [user, setUser] = useState(null);
   
    const [signOptionToggle, setSignOptionToggle] = useState(false)

    console.log(user)
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

            <View>
                {user ? (
                    // Display profile information
                    <View style={styles.container}>
                      <Text style={styles.text}>Welcome Back!</Text>
                      <Text style={styles.text}>{user.email}</Text>
                    
                      <TouchableOpacity
                        onPress={handleSignOut}
                      >
                      <Text style={styles.button}>
                        SIGN OUT
                      </Text>
                    </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.container}>

                        {signOptionToggle ? (
                            <SignInForm
                              setUser = {setUser} 
                            />
                        ) : (
                            <SignUpForm
                              setUser = {setUser} />
                        )}
                        <View style={styles.container2}>
                          <Text>
                            {signOptionToggle ? 
                            'Not a member yet?':'Already have an account'}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setSignOptionToggle(!signOptionToggle)}
                          >
                            <Text
                              style={{color: 'white', paddingLeft: 5}}
                            >
                              {signOptionToggle ? 'Register' : 'Sign In'}
                            </Text>
                          </TouchableOpacity>

                        </View>
                       
                    </View>

                )}
                
            </View>

        </LinearGradient> 
      </>
  
    );
  }



  const styles = StyleSheet.create({

    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
      
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

  });



  export default Profile