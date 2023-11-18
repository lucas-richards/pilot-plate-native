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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()


// const ProfileNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Profile" component={Profile} />
//       <Stack.Screen name="SignUp" component={SignUpForm} />
//       <Stack.Screen name="SignIn" component={SignInForm} />
//     </Stack.Navigator>
//   );
// };
// this code makes a smooth page transition
//   <View style={{marginTop:20}}>
//       <Pressable onPress={() => navigation.navigate("SignIn")}>
//           <Text>
//           HELLO
//           </Text> 
//       </Pressable>
//   </View>


export default function App() {
   const [user, setUser] = React.useState(null);

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
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='filter-variant' color={color} size={35} />) 
          }}/>
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='home' color={color} size={35} />) 
          }}/>
        <Tab.Screen 
          name="Favorites" 
          component= {Favorites} 
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='heart' color={color} size={35} />) 
          }}/>
          <Tab.Screen 
            name="ProfileTab" 
            //component={Profile}
            children={() => <Profile setUser={setUser} user={user} />} //allows props to be passed
            options={{ 
              tabBarLabel: "",
              title: <Header />,
              tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='account' color={color} size={35} />) 
            }}/>
      </Tab.Navigator>
    </NavigationContainer>
    </>

  );
}