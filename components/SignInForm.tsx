import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Navigation } from 'react-native-navigation';



export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // NEW
  const [error, setError] = useState(''); // NEW
  const navigation = useNavigation();

  const handlePress = async () => {
    // setLoading(true);
    // try {
    //   await signIn(email, password);
    // } catch (e) {
    //   setError(e.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
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
      <Button
        // style={styles.button}
        onPress={handlePress}
        title="Submit"
        disabled={loading}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.text}>Don't have an account?</Text>
      <Button
        // style={styles.button}
        // onPress={() => navigation.navigate('Settings')}
        title="Sign Up"
        disabled={loading}
      />
    </View>
  );
  
}

Navigation.registerComponent('Settings', () => SettingsScreen);

const SettingsScreen = () => {
    return (
      <View >
        <Text>Settings Screen</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      fontSize: 20,
      marginBottom: 20,
      borderRadius: 5,
      width: '100%',
    },
    button: {
      width: '100%',
      fontSize: 20,
    },
    error: {
      color: 'red',
      marginBottom: 20,
    },
    text: {
      fontSize: 20,
      marginBottom: 20,
    },
  });