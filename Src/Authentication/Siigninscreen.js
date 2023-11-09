import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Backbutton from '../Component/Backbutton';
import Icon from 'react-native-vector-icons/EvilIcons';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import CountryPicker from 'react-native-country-picker-modal';
import Phonenumber from './Phonenumber';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, List, Divider, IconButton} from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Siigninscreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const openCountryPicker = () => {
    setVisible(true);
  };

  const [visible, setVisible] = useState(false);
  const [country, setCountry] = useState({
    cca2: 'PH',
    callingCode: '63',
  });
  const [username, setUsername] = useState('');
  const [verificationId, setVerificationId] = useState('');

  useEffect(() => {
    func();
  }, []);

  // const callapi = async (phone, pin) => {

  //   const normalizedPhone = phone.replace('+', '').substring(country.callingCode.length);
    
  //   Toast.show({
  //     text1: 'api call',
  //     type: 'error',
  //   });
  //   const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');

  //   console.log(storedPhoneNumber)
    
  //   try {
  //     Toast.show({
  //       text1: 'undere try ',
  //       type: 'error',
  //     });
  //     // Construct the request URL with query parameters
  //     const apiUrl = `http://teleforceglobal.com/doctor/api/v1/doctorLogin`;
  
  //     const formData = new FormData();

  //      formData.append('mobile_number', normalizedPhone);
  //     formData.append('password', pin);
  //     formData.append('device_token', 'feaDCx7fTWSbRt7CqPiu6L:APA91bEHM2MKUVh433GRkpI8E15qsCIvKFWObomjq7rZpnhjJoDqXUr-LZe5TxdcVRaAF3eSISvis9pNkomdJyyiI_8PlfOtMjN4ZzS-VfbRay2u0NLG4hkaFKeigJy4gCfwsXROYxhd');
  
  //     console.log(formData)
  //     const response = await axios.post(apiUrl, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  
  //     if (response) {
  //       Toast.show({
  //         text1: 'under if condition',
  //         type: 'error',
  //       });
  //       if (response.status == 200) {
  //         const responseData = response.data;
  
  //         console.log('Response Data:', responseData);
          

  //         const access_token = responseData.data.access_token;
  //         await AsyncStorage.setItem('access_token', access_token);


  //         const doctor_id =JSON.stringify( responseData.data.id);
  //         console.log(responseData.data.id);
  //         await AsyncStorage.setItem('doctor_id', doctor_id);
  
  //         if (responseData.message == 'Login successfully') {
  //          navigation.navigate('bottom');
  //         } else {

  //           navigation.navigate('bottom');
  //         }
  //       } else {
  //         console.error('Non-200 status code:', response.status);
  //       }
  //     } else {
  //       console.error('Response is undefined');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Handle the error here, you can also re-throw it if needed
  //   }
  // }; 

  const func = async () => {
    const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
    // navigation.navigate('bottom');
    // if (storedPhoneNumber) {
    //   const storedPin = await AsyncStorage.getItem('userPin');
    //   if (storedPin) {
    //     callapi(storedPhoneNumber, storedPin)
    //   }
    //   // navigation.navigate('bottom');
    // }
  };

  const onSelectCountry = country => {
    setCountry(country);
    const callingCode = country?.callingCode
      ? `+${country.callingCode[0]}`
      : '';
    setVisible(false);
  };

  const handlePhoneNumberVerification = async () => {
    const phoneNumber = username;

    await AsyncStorage.setItem('phoneNumber', phoneNumber);

    // const confirmation = await auth().signInWithPhoneNumber(
    //   `+${country.callingCode}${username}`,
    //   true,
    // );
    navigation.navigate('pin', {phoneNumber});
  };

  const textInputStyle = {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
    borderWidth: 0,
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#49B2E9',
      }}
      behavior="padding">
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '23%',
          }}>
          <Image source={require('../Assets/Logo.png')} style={styles.logo1} />
          <Text style={{fontSize: 20, fontWeight: '700'}}>Doctor App</Text>
        </View>

        <Image
          source={require('../Assets/doctorlogin.png')}
          style={styles.logo}
        />

        <View
          style={{
            backgroundColor: 'white',
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            alignItems: 'center',
            width: '100%',
            bottom: 0,
            position: 'absolute',
            height: '34%',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'NunitoSans_7pt-Regular',
              top: 5,
            }}>
            Sign in to continue:
          </Text>

          <View
            style={{
              // marginLeft: 10,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              paddingHorizontal: 55,
              paddingTop: 50,
            }}>
            <Text style={{fontSize: 14, fontWeight: '500'}}>
              {`+${country.callingCode}`}
            </Text>
          </View>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter Phone Number"
            mode="outlined"
            keyboardType="number-pad"
            fontSize={16}
            maxLength={10}
            outlineColor="#e4efff"
            style={{
              height: 60,
              top: 13,
              backgroundColor: '#e4efff',
              zIndex: 0,
              paddingLeft: 35,
              width: Dimensions.get('window').width * 0.8,
            }}
            theme={{colors: {primary: '#478ffd'}}}
            dense={true}
            left={
              <TextInput.Icon
                style={{
                  borderRightWidth: 1,
                  borderRadius: 0,
                  alignSelf: 'center',
                }}
                icon="chevron-down"
                onPress={openCountryPicker}
              />
            }
          />
          <CountryPicker
            visible={visible}
            onClose={() => setVisible(false)}
            onSelect={onSelectCountry}
            withFilter
            // withFlag
            withCallingCode
            withCountryNameButton
            placeholder=""
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handlePhoneNumberVerification}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Siigninscreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    // padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  logo: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.3,
    top: 20,
  },
  logo1: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.1,
  },
  button: {
    backgroundColor: '#49b2e9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.8,
    height: 50,
    top: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
