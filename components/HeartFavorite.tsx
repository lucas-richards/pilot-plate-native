
import React, { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getAllBusinesses, createBusiness, removeBusiness } from "../api/business";

export default function HeartFavorite({ business, user, loading }) {
    const [isClick, setClick] = useState(false);
  
    useEffect(() => {
      if (!user) return;
  
      getAllBusinesses(business.id)
        .then((res) => {
          const businesses = res.data.businesses.filter(
            (b) => b.owner._id === user._id
          )
          if (businesses.length > 0) setClick(true);
          else setClick(false);
        })
        .catch((err) => {
          setClick(false);
          console.log('Error fetching businesses:', err);
        });
    }, [business.id, user]);
  
    const removeBusinessFromFavorites = () => {
      removeBusiness(user, business.id)
        .then((res) => {
          setClick(false);
          console.log('Business removed from favorites');
        })
        .catch((err) => {
          console.log('Error removing business:', err);
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
        removeBusinessFromFavorites();
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


