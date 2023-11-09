import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import Backbutton from '../Component/Backbutton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import OTPTextView from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';

const Pinscreen = ({ navigation }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const pinInputs = useRef(Array(4).fill(null));
  const [enteredPin, setEnteredPin] = useState('');

  const handlePinChange = (index, text) => {
    if (/^\d*$/.test(text) && text.length <= 1) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (text === '' && index > 0) {
        pinInputs.current[index - 1].focus();
      } else if (index < pinInputs.current.length - 1 && text.length === 1) {
        pinInputs.current[index + 1].focus();
      }
    }
  };

  const Done = async () => {
    console.log('Done function called');
    Toast.show({
      text1: 'click done button',
      type: 'error',
    });

    callapi();
    const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');

  
    try {
      if (checkpin) {
        if (enteredPin == savedpin) {
          // navigation.navigate('bottom');
        } else {
          console.error('Incorrect PIN entered.');
        }
      } else {
        if (enteredPin.length === 4) {
          savePin();
          await callapi(); 
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const callapi = async () => {
    Toast.show({
      text1: 'api call',
      type: 'error',
    });
    const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');

    console.log(storedPhoneNumber)
    
    try {
      Toast.show({
        text1: 'undere try ',
        type: 'error',
      });
      // Construct the request URL with query parameters
      const apiUrl = `http://teleforceglobal.com/doctor/api/v1/doctorLogin`;
  
      const formData = new FormData();

      formData.append('mobile_number', storedPhoneNumber);
      formData.append('password', enteredPin);
      formData.append('device_token', 'feaDCx7fTWSbRt7CqPiu6L:APA91bEHM2MKUVh433GRkpI8E15qsCIvKFWObomjq7rZpnhjJoDqXUr-LZe5TxdcVRaAF3eSISvis9pNkomdJyyiI_8PlfOtMjN4ZzS-VfbRay2u0NLG4hkaFKeigJy4gCfwsXROYxhd');
  
      console.log(formData)
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response) {
        Toast.show({
          text1: 'under if condition',
          type: 'error',
        });
        if (response.status == 200) {
          const responseData = response.data;
  
          console.log('Response Data:', responseData);
          

          const access_token = responseData.data.access_token;
          await AsyncStorage.setItem('access_token', access_token);


          const doctor_id =JSON.stringify( responseData.data.id);
          console.log(responseData.data.id);
          await AsyncStorage.setItem('doctor_id', doctor_id);
  
          if (responseData.message == 'Login successfully') {
           navigation.navigate('bottom');
          } else {

            console.log('hello')
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
  }; 

  useEffect(() => {
    storedpin();
  }, []);

  useEffect(() => {
    if (pin.join('').length === 4) {
      setEnteredPin(pin.join('')); // Update enteredPin state
    }
  }, [pin]);

  let checkpin = false;
  let savedpin = '';

  const storedpin = async () => {
    const storedPin = await AsyncStorage.getItem('userPin');
    console.log(storedPin);
    if (storedPin !== null) {
      checkpin = true;
      savedpin = storedPin;
    }
  };

  const savePin = async () => {
    try {
      await AsyncStorage.setItem('userPin', enteredPin);
      // You can also add some success handling or navigation here if needed.
    } catch (error) {
      console.error('Error saving PIN:', error);
      // Handle the error appropriately.
    }
  };

  const forgotpin = () => {
    navigation.navigate('reset', {
      pin: enteredPin,
    });
  };

  useEffect(() => {
    if (pin.join('').length === 4) {
    }
  }, [pin]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Backbutton />
        <Text style={styles.title}>Enter Your Pin</Text>
      </View>
      {/* <View style={{alignItems:'center'}}>
        <Image
          style={styles.image}
          source={require('../Assets/pin.png')}
          resizeMode="contain"
        />
      </View> */}
      <View style={styles.textContainer}>
        <View style={{bottom:30,alignItems:'center'}}>
        <Text style={styles.centeredText}>Please enter your 4-digit Pin.</Text>

          <View style={styles.pinInputContainer}>
            <OTPTextView
            containerStyle={[styles.otpContainer, styles.customBorder]}
            textInputStyle={styles.pinInput}
            handleTextChange={(text) => setEnteredPin(text)}
            numberOfInputs={4}
            inputBorderColor="red"
          />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={Done}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row',top:10,alignItems:'center'}}>
          <Text style={{fontFamily: 'NunitoSans_7pt-Regular', fontSize: 14}}>
            {' '}
            Forgot your pin?
          </Text>
          <TouchableOpacity onPress={forgotpin}>
            <Text
              style={{
                color: '#49b2e9',
                fontWeight: '500',
                fontFamily: 'NunitoSans_7pt-Regular',
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Pinscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.2,
    top:40
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
    flex:3,
    alignItems: 'center',
    top:50
    // justifyContent:'center',
    // marginTop:20,
  },
  centeredText: {
    fontSize: 18,
    fontFamily: 'NunitoSans_7pt-Light',
  },
  centeredText1: {
    fontSize: 18,
    fontFamily: 'NunitoSans_7pt-Light',
  },
  pinInputContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal:20
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal:20
  },
  otpContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top:10
  },
  pinInput: {
    flex: 1,
    height: 50,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#49b2e9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.9,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
