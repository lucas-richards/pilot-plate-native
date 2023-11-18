import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SignInForm from '../components/SignInForm';
import SignUpForm from "../components/SignUpForm";
import { signOut } from '../api/auth';


const Profile = ({ user, setUser }) => {
    
   
    const [signOptionToggle, setSignOptionToggle] = useState(false)

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
                              setSignOptionToggle = {setSignOptionToggle}
                              signOptionToggle = {signOptionToggle}
                            />
                        ) : (
                            <SignUpForm
                              setUser = {setUser}
                              setSignOptionToggle = {setSignOptionToggle}
                              signOptionToggle = {signOptionToggle} />
                        )}
                        {/* <View style={styles.container2}>
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

                        </View> */}
                        
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
    button: {
      width: '100%',
      textAlign: 'center',
      padding: 5,
      fontSize: 22,
      backgroundColor: 'black',
      color: 'white',
    },

  });



  export default Profile