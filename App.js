import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { NavigationContainer } from '@react-navigation/native';




export default function App() {
  return (
    
    <NavigationContainer>
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={styles.container}
        >
          <SafeAreaView>
            <StatusBar style="auto" />
              <Header />
          </SafeAreaView>
        </LinearGradient>
              
    
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
