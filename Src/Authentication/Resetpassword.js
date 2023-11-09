import { View, Text, StyleSheet ,Dimensions,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import Backbutton from '../Component/Backbutton';
import { TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

const Resetpassword = ({navigation,route}) => {
  const {pin} = route.params;

    const [text, setText] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');

    const Reset = async()=>{

      if (text !== text1) {
        Toast.show({
          text1: 'Password Mismatch',
          type: 'error',
        });
        return;
      }

      const storedPin= await AsyncStorage.getItem('userPin');
      console.log(storedPin);
    const access_token = await AsyncStorage.getItem('access_token');


      try {
        // Construct the request URL with query parameters
        const apiUrl = `http://teleforceglobal.com/doctor/api/v1/setPin`;
    
        const formData = new FormData();
  
        formData.append('new_password', text);
        formData.append('new_password_confirmation', text1);
        formData.append('old_password',storedPin);

      const authToken = access_token

    
        console.log(formData)
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization':`Bearer ${authToken}`,
          },
        });
    
        if (response) {
          if (response.status == 200) {
            const responseData = response.data;
    
            console.log('Response Data:', responseData);
    
            if (responseData.message == 'PIN set successfully') {
             navigation.navigate('pin');
            } else {
              // navigation.navigate('bottom');
            }
          } else {
            console.error('Non-200 status code:', response.status);
          }
        } else {
          console.error('Response is undefined');
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error here, you can also re-throw it if needed
      }

        // navigation.navigate('confirmrest');
    }

    return (
      <View style={styles.container}>
   <View style={styles.header}>
    <Backbutton />
    <Text style={styles.title}>Reset Pin</Text>
  </View>
  <View style={styles.textContainer}>
    <Text style={styles.centeredText}>Enter new password and confirm.</Text>
    <TextInput
      style={styles.input}
      mode="outlined"
      outlineColor="#e4efff"
      label="Enter Pin"
      onChangeText={setText}
      keyboardType='number-pad'
      maxLength={4}
      value={text}
      theme={{ colors: { primary: '#478ffd' } }}
    />
    <TextInput
      style={styles.input}
      mode="outlined"
      outlineColor="#e4efff"
      label="Confirm Pin"
      keyboardType='number-pad'
      maxLength={4}
      onChangeText={setText1}
      value={text1}
      theme={{ colors: { primary: '#478ffd' } }}
    />
        <TextInput
      style={styles.input}
      mode="outlined"
      outlineColor="#e4efff"
      label="Old Pin"
      keyboardType='number-pad'
      maxLength={4}
      onChangeText={setText2}
      value={text2}
      theme={{ colors: { primary: '#478ffd' } }}
    />
    <TouchableOpacity style={styles.button} onPress={Reset}>
      <Text style={styles.buttonText}>Change Pin</Text>
    </TouchableOpacity>
  </View>
</View>

      );
}

export default Resetpassword

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomEndRadius:20,
      borderBottomLeftRadius:20,
      backgroundColor:'#49B2E9',
      height:'8%'
    },
    title: {
      flex: 1,
      fontSize: 18,
      color: 'black',
      fontFamily:'Domine-Bold',
      textAlign: 'center',
      alignSelf: 'center',
      color:'white',
    },
    textContainer: {
      margin: 10,
      padding: 10,
      alignItems: 'center', 
    },
    centeredText: {
      fontSize: 15,
      fontFamily: 'NunitoSans_7pt-Regular',
      color: 'black',
      marginBottom: 10,
      textAlign: 'center', 
    },
    input: {
      width: '100%',
      top: 20,
      backgroundColor: '#e4efff',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#49b2e9',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 25,
      width: Dimensions.get('window').width * 0.9,
      height: 50,
    },
    buttonText: {
      color: 'white',
      fontFamily:'NunitoSans_7pt-Bold',
      textAlign: 'center',
      fontSize: 16,
    },
  });
  