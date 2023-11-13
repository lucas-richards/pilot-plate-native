
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './components/Header';

function FilterScreen() {
  return (
    <>
      <LinearGradient
        colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
        style={{height: '100%'}}
      >
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Filter!</Text>
        </View>
      </LinearGradient>
    </>

  );
}

function HomeScreen() {
  return (
    <>
      <LinearGradient
        colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
        style={{height: '100%'}}
      >
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
        </View>
      </LinearGradient>
    </>

  );
}

function FavoritesScreen() {
  return (
    <>
      <LinearGradient
        colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
        style={{height: '100%'}}
      >   
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Favorites!</Text>
        </View>
      </LinearGradient> 
    </>

  );
}

function ProfileScreen() {
  return (
    <>
      <LinearGradient
        colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
        style={{height: '100%'}}
      >       
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Profile!</Text>
        </View>
      </LinearGradient> 
    </>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen 
          name="Filter" 
          component={FilterScreen}         
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='filter-variant' color={color} size={size} />) 
          }}/>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='home' color={color} size={size} />) 
          }}/>
        <Tab.Screen 
          name="Favorites" 
          component={FavoritesScreen} 
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='heart' color={color} size={size} />) 
          }}/>
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='account' color={color} size={size} />) 
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
    </>

  );
}

