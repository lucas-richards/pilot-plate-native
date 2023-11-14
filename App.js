import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './components/Header';
import Filter from './pages/Filter';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()


const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SignIn" component={SignUpForm} />
      <Stack.Screen name="SignUp" component={SignInForm} />
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    <>
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen 
          name="Filter" 
          component={Filter}         
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='filter-variant' color={color} size={size} />) 
          }}/>
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='home' color={color} size={size} />) 
          }}/>
        <Tab.Screen 
          name="Favorites" 
          component= {Favorites} 
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='heart' color={color} size={size} />) 
          }}/>
          <Tab.Screen name="ProfileTab" component={ProfileNavigator} 
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='account' color={color} size={size} />) 
          }}/>
        {/* <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='account' color={color} size={size} />) 
          }}/> */}
        {/* <Tab.Screen 
          name="SignUpForm" 
          component={SignUpForm} 
          options={{ 
            tabBarLabel: "",
            title: <Header />,
          }}/> */}
      </Tab.Navigator>
    </NavigationContainer>
    </>

  );
}

