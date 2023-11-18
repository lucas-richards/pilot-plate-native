import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SignInForm from '../components/SignInForm';
import SignUpForm from "../components/SignUpForm";


const Profile = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [signOptionToggle, setSignOptionToggle] = useState(false)


    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   

            <View>
                {user ? (
                    // Display profile information
                    <View>
                    <Text>Profile Information</Text>
                    {/* Display user information here */}
                    </View>
                ) : (
                    <View style={styles.container}>

                        {signOptionToggle ? (
                            <SignInForm
                              setUser = {setUser} 
                            />
                        ) : (
                            <SignUpForm
                              setUser={setUser} />
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
    },
    container2: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },

  });



  export default Profile