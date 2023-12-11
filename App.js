import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './components/Header';
import Filter from './pages/Filter';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Detail from './pages/business/Detail';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

// this is a stack navigation and includes back button
// const HomePage = () => {
//   return (
//     <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
//       <Stack.Screen 
//         name="Home" 
//         children={() => <Home 
//             location={location} 
//             price={price} 
//             category={category} 
//             radius={radius} 
//             user={user}
//             dbChange = {dbChange}
//             setDbChange={setDbChange}
//             />} />
//       <Stack.Screen name="Detail" component={Detail} />
//       {/* <Stack.Screen name="SignIn" component={SignInForm} /> */}
//     </Stack.Navigator>
//   );
// };
// this code makes a smooth page transition
  // <View style={{marginTop:20}}>
  //     <Pressable onPress={() => navigation.navigate("SignIn")}>
  //         <Text>
  //         HELLO
  //         </Text> 
  //     </Pressable>
  // </View>
  
  
  export default function App() {
    const [user, setUser] = React.useState(null);
    const [location, setLocation] = React.useState('LA')
    const [price, setPrice] = React.useState(2)
    const [radius, setRadius] = React.useState(8000)
    const [category, setCategory] = React.useState('food')
    const [dbChange, setDbChange] = React.useState(false)


    const HomeNavigation = () => {
      return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}}>
          <Stack.Screen 
            name="HomeScreen" 
            children={() => <Home 
              location={location} 
              price={price} 
              category={category} 
              radius={radius} 
              user={user}
              dbChange = {dbChange}
              setDbChange={setDbChange}
              />} 
          />
          <Stack.Screen 
            name="DetailScreen" 
            component={Detail}
          />
        </Stack.Navigator>
      )
    }

    const FavoritesNavigation = () => {
      return (
        <Stack.Navigator initialRouteName="FavoriteScreen" screenOptions={{headerShown: false}}>
          <Stack.Screen 
            name="FavoriteScreen" 
            children={() => <Favorites 
              user={user} 
              dbChange={dbChange}
              setDbChange={setDbChange}
              />} 
          />
          <Stack.Screen 
            name="DetailScreen" 
            component={Detail}
          />

        </Stack.Navigator>
      )
    }
    


  console.log(radius)
  return (
    <>
    <NavigationContainer>
      <Tab.Navigator tabBarActiveTintColor="red" initialRouteName='Home'>
        <Tab.Screen 
          name="Filter" 
          children={() => <Filter 
            location={location} 
            setLocation={setLocation}
            price={price}
            setPrice={setPrice}
            category={category}
            setCategory={setCategory} 
            radius={radius}
            setRadius={setRadius} 
            />}        
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='filter-variant' color={color} size={35} />) 
          }}/>
        <Tab.Screen 
          name="Home" 
          component={HomeNavigation}
          // children={() => <Home 
          //   location={location} 
          //   price={price} 
          //   category={category} 
          //   radius={radius} 
          //   user={user}
          //   dbChange = {dbChange}
          //   setDbChange={setDbChange}
          //   />} //allows props to be passed
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='home' color={color} size={35} />) 
          }}
          />
        <Tab.Screen 
          name="Favorites" 
          component={FavoritesNavigation}
          // children={() => <Favorites  
          //   user={user} 
          //   dbChange={dbChange}
          //   setDbChange={setDbChange}
          //   />} //allows props to be passed
          options={{ 
            tabBarLabel: "",
            title: <Header />,
            tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='heart' color={color} size={35} />) 
          }}/>
          <Tab.Screen 
            name="ProfileTab" 
            children={() => <Profile 
                              setUser={setUser} 
                              user={user} 
                              />} //allows props to be passed
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