
import React, { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getAllBusinesses, createBusiness, removeBusiness } from "../api/business";
import { Alert } from "react-native";

export default function HeartFavorite({ business, user }) {
    const [isClick, setClick] = useState(false);
    const [myBusiness, setMyBusiness] = useState({
      _id: '',
    });
  
    useEffect(() => {
      if (!user) return;
  
      getAllBusinesses(business.id)
        .then((res) => {
          const businesses = res.data.businesses.filter(
            (b) => b.owner._id === user._id
          )
          if (businesses.length > 0) {
            setClick(true)
            setMyBusiness(businesses[0]);
            console.log('my business',myBusiness)
          }
          else {
            setClick(false)
            setMyBusiness(null)
            console.log('my business',myBusiness)
          };
        })
        .catch((err) => {
          setClick(false);
          console.log('Error fetching businesses:', err);
        });
    }, [business.id, user, isClick]);
  
    const removeBusinessFromFavorites = () => {
      removeBusiness(user, myBusiness._id)
        .then((res) => {
          setClick(false);
          console.log('Business removed from favorites => business._id=',myBusiness._id);
        })
        .catch((err) => {
          console.log('Error removing business._id =>', err, myBusiness._id);
        });
    };
  
    const addBusinessToFavorites = () => {
      createBusiness(user, {
        name: business.name,
        yelp_id: business.id,
        image_url: business.image_url,
        price: business.price.length,
        categories: business.categories[0],
        favorite: true,
        distance:business.distance,
        url: business.url,
        display_address:business.location.display_address,
        display_phone:business.display_phone
      })
        .then((res) => {
          setClick(true);
          console.log('Business added to favorites');
        })
        .catch((err) => {
          console.log('Error adding business:', err);
        });
    };
  
    const handleClick = () => {
      if (!user) {
        console.log('NO USER');
      } else if (isClick) {
        Alert.alert('Remove restaurant', 'Remove this restaurant from favorites?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Remove', onPress: () => removeBusinessFromFavorites()},
        ]);
        
      } else {
        addBusinessToFavorites();
      }
    };
  
    return (
      <>
        {isClick ? (
          <FontAwesome
            style={{ textAlign: 'right', marginRight: 20 }}
            name="heart"
            size={24}
            color="red"
            onPress={handleClick}
          />
        ) : (
          <AntDesign
            style={{ textAlign: 'right', marginRight: 20 }}
            name="hearto"
            size={24}
            color="black"
            onPress={handleClick}
          />
        )}
      </>
    );
  }


