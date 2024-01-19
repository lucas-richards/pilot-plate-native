import { LinearGradient } from 'expo-linear-gradient';
import { View, Text,} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 



const Friends = ({navigation:{goBack}}) => {

    return(
        <LinearGradient
          colors={['rgb(239, 120, 36)', 'rgb(236, 80, 31)']}
          style={{height: '100%'}}
        >   

        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <AntDesign onPress={() => goBack()} name="left" size={24} color="black" />
        </View>


        <Text style={{textAlign:'center', color:'black', fontSize:20}}>
        Friends
        </Text>

        </LinearGradient>
    )
}

export default Friends