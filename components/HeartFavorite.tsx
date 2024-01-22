import React, { useEffect, useState, useContext } from "react";
import { Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { getAllBusinesses, createBusiness, removeBusiness } from "../api/business";
import { useNavigation } from "@react-navigation/native";
import { DbContext } from '../DataContext';
import DialogInput from 'react-native-dialog-input';
import { createTransaction } from "../api/transaction";

const HeartFavorite = ({ business, comingFromFav }) => {
  const { dbChange, setDbChange, user } = useContext(DbContext);
  const [isFavorite, setFavorite] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [myBusiness, setMyBusiness] = useState({ _id: '' });
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) return;

    getAllBusinesses(business.id)
      .then((res) => {
        const businesses = res.data.businesses.filter((b) => b.owner._id === user._id);
        if (businesses.length > 0) {
          setFavorite(true);
          setMyBusiness(businesses[0]);
        } else {
          setFavorite(false);
          setMyBusiness(null);
        }
      })
      .catch((err) => {
        setFavorite(false);
        console.log('Error fetching businesses:', err);
      });
  }, [business.id, user, isFavorite, dbChange]);

  console.log('render HeartFavorite')


  const removeBusinessFromFavorites = () => {
    const businessIdToRemove = business._id || myBusiness._id;
    removeBusiness(user, businessIdToRemove)
      .then(() => {
        setFavorite(false);
        console.log('Business removed from favorites => business._id=', myBusiness._id);
        setDbChange(!dbChange);
        comingFromFav ? navigation.navigate('FavoriteScreen') : null;
      })
      .catch((err) => {
        console.log('Error removing business._id =>', err, myBusiness._id);
      });
      //toggle the comment alert
      setDialogVisible(true);
  };

  const addBusinessToFavorites = () => {
    const newBusinessData = {
      name: business.name,
      yelp_id: business.id,
      image_url: business.image_url,
      price: business.price.length,
      categories: business.categories[0],
      favorite: true,
      distance: business.distance,
      url: business.url,
      display_address: business.location.display_address,
      display_phone: business.display_phone,
      rating: business.rating,
    };

    createBusiness(user, newBusinessData)
      .then(() => {
        console.log('Business added to favorites', newBusinessData);
        setDbChange(!dbChange);
      })
      .catch((err) => {
        console.log('Error adding business:', err);
      });
      //toggle the comment alert
    setDialogVisible(true);
  };

  const handleClick = () => {
    if (!user) {
      console.log('NO USER');
      Alert.alert('Sign in', 'Please sign in to add favorites', [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Sign in', onPress: () => navigation.navigate('ProfileTab') },
      ]);
    } else if (isFavorite) {
      Alert.alert(`Remove ${business.name}`, 'Remove this restaurant from favorites?', [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Remove', onPress: removeBusinessFromFavorites },
      ]);
    } else {
      setFavorite(true);
      addBusinessToFavorites();
    }
  };

  const newTransaction = (business, favorite, comment) => {
    const transactionData = {
      business_name: business.name,
      yelp_id: business.yelp_id,
      image_url: business.image_url,
      favorite: favorite,
      owner: user._id,
      display_address: business.display_address,
      comment: comment,
    };

    createTransaction(user, transactionData)
      .then(() => {
        console.log('Transaction created', transactionData);
        setComment('');
        setDbChange(!dbChange);
      })
      .catch((err) => {
        console.log('Error creating transaction:', err);
        setComment('');
      });
  };

  return (
    <>
      {isFavorite ? (
        <FontAwesome
          style={{ textAlign: 'right', marginRight: 20 }}
          name="heart"
          size={24}
          color="red"
          onPress={handleClick}
        />
      ) : (
        <FontAwesome
          style={{ textAlign: 'right', marginRight: 20 }}
          name="heart-o"
          size={24}
          color="black"
          onPress={handleClick}
        />
      )}
      <DialogInput
        isDialogVisible={dialogVisible}
        title={"Write a comment"}
        message={
          isFavorite ? 
          "Why did you add this restaurant to your favorites?"
          : 
          "Why did you remove this restaurant from your favorites?" 
        }
        hintInput={"comment"}
        cancelText={"No comment"}
        submitInput={(inputText) => {
          console.log('input', inputText);
          newTransaction(business, isFavorite, inputText);
          setDialogVisible(false);
        }}
        closeDialog={() => {
          newTransaction(business, isFavorite, 'no comment');
          setDialogVisible(false);
        }}
      />
    </>
  );
};

export default HeartFavorite;
