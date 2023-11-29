
import React, { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getAllBusinesses, createBusiness, removeBusiness } from "../api/business";

export default function HeartFavorite({business, user, spin}) {
  const [isClick, setClick] = useState(false);
  const [newBusiness, setNewBusiness] = useState({
    name: '',
    yelp_id: '',
    image_url: '',
    price: '',
    categories: '',
    favorite: false,
    distance:'',
    url: '',
    display_address:'',
    display_phone:''
  })

  useEffect(() => {
    getAllBusinesses(business.id)
        .then(res =>{
            console.log('res',res)
            const businesses = res.data.businesses.filter(business => business.owner._id === user._id)
            console.log('this is the owner favorite businesses',businesses)
            if(businesses.length>0)setClick(true)
            else setClick(false)
            
            setNewBusiness({
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
            console.log('this is the new business',newBusiness)
                
        })
        .catch(err => {
            console.log('the business is not a favorite')
            setClick(false)
        })
    
    },[spin]);

    const handleClick = () => {
        if(!user) {
            console.log("NO USER")
        }
        else if(isClick){
            setClick(false)
            removeBusiness(user,business.id)
            .then(res=>{
                console.log('the business was removed')
            })
            .catch(err => {
                console.log('issues removing business',err)
            })
        }
        else {
            setClick(true)
            createBusiness(user, newBusiness)
                .then(res=>{
                    console.log('the business was added')
                })
                .catch(err => {
                    console.log('issues adding business',err)
                })


        }
    }

  return (
    <>
      
      {
        isClick ? (
          <FontAwesome 
            name="heart" 
            size={24} 
            color='red'
            onPress={handleClick}
            />
        ) : (
          <AntDesign 
            name="hearto" 
            size={24} 
            color="black"
            onPress={handleClick}
             />
        )
      }
      
    </>
  );
}

