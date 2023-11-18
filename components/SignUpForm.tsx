import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signUp, signIn } from '../api/auth';



export default function SignInForm({ setUser}) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false); // NEW
  const [error, setError] = useState(''); // NEW
  const navigation = useNavigation();

  const credentials = { email, password, passwordConfirmation };

  const handlePress = async () => {
      setLoading(true);
      signUp(credentials)
        .then(() => signIn(credentials))
        .then((res) => setUser(res.data.user))
        .catch((error) => {
          console.log(error);
        })
        setLoading(false);
    }
  

  return (
    <View style={styles.container}>
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
    </View>
  );

  
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
      paddingTop: 50,
      maxWidth: 300,
      minWidth: 300,
      
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
      color: 'red',
      marginBottom: 20,
    },
    text: {
      fontSize: 20,
      marginBottom: 20,
      marginTop: 20,
    },
  });