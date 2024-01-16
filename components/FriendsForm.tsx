import React, { useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, TextInput, StyleSheet} from 'react-native';
import { signIn } from '../api/auth';


export default function FriendsForm({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // NEW
  const [error, setError] = useState(''); // NEW
  const credentials = { email, password };

  const handlePress = async () => {
    setLoading(true)
    signIn(credentials)
      .then(() => signIn(credentials))
      .then((res) => setUser(res.data.user))
      .catch((error) => {
        setError(`Bad credentials: ${error.message}`)
        setLoading(false)
      })
  };

  console.log('this is loading', loading) 

  return (
    <View style={styles.container}>
      {
        loading ? 
          // <Text style={styles.title}>Loading...</Text>
          <ActivityIndicator style={styles.title} size="large" color="#ffff" />
        :
          <>
            <Text style={styles.title}>Search Friends</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            
            <TouchableOpacity
              onPress={handlePress}
              disabled={loading}
              >
              <Text 
                style={styles.button}
                >
                Search
              </Text>
              
             
            </TouchableOpacity>
            
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
      width: '100%',
    },
    
    button: {
      width: '100%',
      textAlign: 'center',
      padding: 5,
      fontSize: 22,
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