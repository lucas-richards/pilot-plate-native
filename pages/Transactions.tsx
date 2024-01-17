import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signOut } from '../api/auth'
import { DbContext } from '../DataContext';
import { getTransactions } from '../api/transaction';


const Transactions = () => {
    
    const {user, setUser} = useContext(DbContext);
    const [transactions, setTransactions] = useState([])

    console.log('user',user)

    useEffect(()=>{
      getTransactions()
          .then(res => {
              console.log('this is user',user)
              if (user) {
                setTransactions(res.data.transactions)
                console.log('transactions',transactions)
              }
          })
          .catch(err => {
              console.log('error',err)
              
          })
  },[])

   

    return (
      
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   
        
          <Text style={styles.text}>Transactions</Text>
          {transactions.map((transaction, index) => {
            return (
              <View key={index} style={styles.container2}>
                <Text style={styles.text}>{transaction.business_name}</Text>
                <Text style={styles.text}>{transaction.amount}</Text>
              </View>
            )
          })}
          
        </LinearGradient> 
      
  
    );
  };

  const styles = StyleSheet.create({

    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
      
    },
    container2: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    text: {
      justifyContent: 'center',
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    button: {
      width: '100%',
      textAlign: 'center',
      padding: 5,
      fontSize: 22,
      backgroundColor: 'black',
      color: 'white',
      marginTop: 20,
    },

  });



  export default Transactions