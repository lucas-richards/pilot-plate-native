import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SignInForm from '../components/SignInForm';
import SignUpForm from "../components/SignUpForm";


const Profile = ({ navigation }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [signOptionToggle, setSignOptionToggle] = useState(false)

    return (
      <>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   

            <View>
                {isSignedIn ? (
                    // Display profile information
                    <View>
                    <Text>Profile Information</Text>
                    {/* Display user information here */}
                    </View>
                ) : (
                    <View style={styles.container}>

                        {signOptionToggle ? (
                            <View>
                            <Text>Sign In Form</Text>
                            <SignInForm />
                            </View>
                        ) : (
                            <View>
                            <Text>Sign Up Form</Text>
                            <SignUpForm />
                            </View>
                        )}
                    <Button 
                    title={signOptionToggle ? 'Go to Sign Up Form' : 'Go to Sign In Form'}
                    onPress={() => setSignOptionToggle(!signOptionToggle)}
                />
                    </View>

                )}
                {/* <Button
                    title={isSignedIn ? 'Sign Out' : 'Sign In'}
                    onPress={() => setSignOptionToggle(!signOptionToggle)}
                /> */}
            </View>




          {/* <SignInForm /> */}
          {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
          </View> */}
        </LinearGradient> 
      </>
  
    );
  }



  const styles = StyleSheet.create({

    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },

  });



export default Profile