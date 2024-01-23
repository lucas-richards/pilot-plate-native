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
import Detail from './pages/business/Detail';
import Transactions from './pages/Transactions';
import Friends from './pages/Friends';
import { DataProvider } from './DataContext';
import BrandingPage from './pages/BrandingPage';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

// this is a stack navigation and includes back button
  
  
  export default function App() {
    
    const [location, setLocation] = React.useState('LA')
    const [price, setPrice] = React.useState(2)
    const [radius, setRadius] = React.useState(8000)
    const [category, setCategory] = React.useState('food')
    const [loading, setLoading] = React.useState(true)
    
    React.useEffect(() => { 
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
    ,[])

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
            component={Favorites} 
          />
          <Stack.Screen 
            name="DetailScreen" 
            component={Detail}
          />
        </Stack.Navigator>
      )
    }

  const ProfileNavigation = () => {
    return (
      <Stack.Navigator initialRouteName='ProfileScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="ProfileScreen"
        component={Profile}
        />
        <Stack.Screen
          name="FriendsScreen"
          component={Friends}
        />
      </Stack.Navigator>
    )
  }
    
  return (
    <>
    {
      loading ? 
      <BrandingPage /> 
      : 

    <DataProvider>
      <NavigationContainer>
        <Tab.Navigator tabBarActiveTintColor="red" initialRouteName='Home'>
          <Tab.Screen 
              name="Transactions" 
              children={() => <Transactions />}
              options={{ 
                tabBarLabel: "",
                title: <Header />,
                tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='account-group' color={color} size={35} />) 
              }}
              />
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
            options={{ 
              tabBarLabel: "",
              title: <Header />,
              tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='home' color={color} size={35} />) 
            }}
            />
          
          <Tab.Screen 
            name="Favorites" 
            component={FavoritesNavigation}
            options={{ 
              tabBarLabel: "",
              title: <Header />,
              tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='heart' color={color} size={35} />) 
            }}/>
            <Tab.Screen 
              name="ProfileTab" 
              component={ProfileNavigation}
              //children={() => <Profile/>}
              options={{ 
                tabBarLabel: "",
                title: <Header />,
                tabBarIcon:({color, size}) =>(<MaterialCommunityIcons name='account' color={color} size={35} />) 
              }}/>
            
          </Tab.Navigator>
        </NavigationContainer>
      </DataProvider>
      }
    </>

  );
}