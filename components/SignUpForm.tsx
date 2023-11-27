import React, { useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, TextInput, StyleSheet} from 'react-native';
import { signUp, signIn } from '../api/auth';



export default function SignUpForm({ setUser, setSignOptionToggle, signOptionToggle}) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false); // NEW
  const [error, setError] = useState(''); // NEW

  const credentials = { email, password, passwordConfirmation };

  const handlePress = async () => {
      setLoading(true)
      signUp(credentials)
        .then(() => signIn(credentials))
        .then((res) => setUser(res.data.user))
        .catch((error) => {
          setError(`Bad credentials: ${error.message}`)
          setLoading(false)
        })
    }
  

  return (
    <View style={styles.container}>
      {
        loading ? 
        <ActivityIndicator style={styles.title} size="large" color="#ffff" />
      :
        <>
          <Text style={styles.title}>Enter Email And Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Password Confirmation"
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={handlePress}
            disabled={loading}
          >
            <Text 
              style={styles.button}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={styles.container2}>
            <Text>
              Already have an account
            </Text>
            <TouchableOpacity
              onPress={() => setSignOptionToggle(!signOptionToggle)}
              >
              <Text
                style={{color: 'white', paddingLeft: 5}}
              >
                Sign In
              </Text>
            </TouchableOpacity>

          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </>
      }
    </View>
  );

  
}

const styles = StyleSheet.create({
    container: {
    paddingTop: 50,
    maxWidth: 300,
    minWidth: 300,
      
    },
    container2: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: 'white',
      padding: 10,
      fontSize: 20,
      marginBottom: 20,
      borderRadius: 25,
      
    },
    button: {
      textAlign: 'center',
      padding: 5,
      fontSize: 20,
      backgroundColor: 'black',
      color: 'white',
    },
    error: {
      color: 'white',
      marginBottom: 20,
      backgroundColor: 'rgba(100,100,100, 0.6)',
      textAlign: 'center',
      padding: 5,
      marginTop: 25,
    },
    text: {
      fontSize: 20,
      marginBottom: 20,
      marginTop: 20,
    },
  });