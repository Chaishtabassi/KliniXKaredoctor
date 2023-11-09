import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Button,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Backbutton from '../Component/Backbutton';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Patientdetails = ({route, navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [diagnosed, setdiagnosed] = useState('');
  const [otp, setotp] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const medical = (patien) => {
    navigation.navigate('medical', { selectedpatien: patien });
    console.log(patien)
  };

  const selectedpatient = route.params ? route.params.selectedpatient : null;

  const history = () => {
    navigation.navigate('previous');
  };

  const chat = () => {
    navigation.navigate('message');
  };

  const rejected = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/declineAppointment`;
      const authToken = bearerToken;

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('appointment_id', selectedpatient.id);
      formData.append('status', 3);

      console.log('hello', formData);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);
          console.log(responseText);
          console.log(responseData.message);

          if (responseData.message == 'Appointment declined successfully') {
            Alert.alert('Success', ' Your Appointment is declined');
          } else {
            Alert.alert('Success', ' This appointment cant be declined!');
          }
        }
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  };

  const completeapi = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/completeAppointment`;
      const authToken = bearerToken;

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('appointment_id', selectedpatient.id);
      formData.append('status', 2);

      console.log('hello', formData);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);
          console.log(responseText);
          console.log(responseData.message);

          if (responseData.message == 'Appointment completed successfully') {
            Alert.alert('Success', ' Your Appointment is completed');
          } else {
            Alert.alert('Success', ' This booking cant be completed!');
          }
        }
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  };

  const callapi = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/acceptAppointment`;
      const authToken = bearerToken;

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('appointment_id', selectedpatient.id);
      formData.append('status', 1);

      console.log('hello', formData);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);
          console.log(responseText);
          console.log(responseData.message);

          if (responseData.message == 'Appointment accepted successfully') {
            Alert.alert('Success', ' Your Appointment is Accepted');
          } else {
            Alert.alert('Success', ' This appointment cant be accepted!');
          }
        }
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  };

  const dateStr = selectedpatient.created_at;
  const formattedDate = new Date(dateStr).toISOString().split('T')[0];

  const date = new Date(dateStr);
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    // <ScrollView>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f4f4f4',
            height: '7%',
          }}>
          <TouchableOpacity onPress={handleBackButtonPress}>
            <Icon name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '700',color:'black'}}>
              {selectedpatient.appointment_number}
            </Text>
          </View>
        </View>
        <ScrollView>
        {selectedpatient && (
          <View style={styles.itemContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: 90, width: 90}}
                resizeMode="contain"
                source={require('../Assets/profilepic.jpg')}
              />
              <View style={{marginLeft: 15, flex: 1}}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: 'NunitoSans_7pt-Bold',
                    color: 'black',
                  }}>
                  {selectedpatient.user.fullname}
                </Text>
                <View style={{flexDirection: 'row', top: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NunitoSans_7pt-Light',
                      color: 'grey',
                    }}>
                    {selectedpatient.user.age}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NunitoSans_7pt-Light',
                      color: 'grey',
                      marginLeft: 10,
                    }}>
                    {selectedpatient.user.gender === 0 ? 'Male' : 'Female'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NunitoSans_7pt-Light',
                    color: 'grey',
                    top: 5,
                  }}>
                  {new Date(selectedpatient.user.created_at).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.itemContainer1}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.heading}>Date</Text>
            <Text style={styles.description}>{formattedDate}</Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.heading}>Time</Text>
            <Text style={styles.description}>{formattedTime}</Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.heading}>Type</Text>
            <Text style={styles.description}>
              {selectedpatient.user.type === 0 ? 'On Clinic' : 'Online'}
            </Text>
          </View>
        </View>

        <View style={styles.itemContainer1}>
          <Text style={styles.heading}>Consultation Charge</Text>
          <Text style={styles.description}>
            ${selectedpatient.service_amount}
          </Text>
        </View>

        <View style={styles.itemContainer1}>
          <Text style={styles.heading}>Sub Total</Text>
          <Text style={styles.description}>${selectedpatient.subtotal}</Text>
        </View>

        <View style={styles.itemContainer1}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.heading}>SGST</Text>
            <Text style={styles.description1}>(18%)</Text>
          </View>
          <Text style={styles.description}>
            ${selectedpatient.total_tax_amount}
          </Text>
        </View>

        <View style={styles.itemContainer1}>
          <Text style={styles.heading}>Payable Amount</Text>
          <Text style={styles.description}>
            ${selectedpatient.payable_amount}
          </Text>
        </View>

        <View style={styles.itemContainer1}>
          <TouchableOpacity onPress={history}>
            <Text style={styles.heading}>Previous Appointments</Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NunitoSans_7pt-Light',
                color: 'grey',
                top: 5,
              }}>
              Click to see previous appointments with you
            </Text>
          </TouchableOpacity>
          <Icon name="arrowright" size={25} color="black" />
        </View>

        <View style={{margin: 10}}>
          <Text style={{fontSize: 17, fontFamily: 'NunitoSans_7pt-Light'}}>
            Problem
          </Text>
        </View>

        <View style={styles.itemContainer1}>
          <Text style={styles.heading}>{selectedpatient.problem}</Text>
        </View>

        <View style={{flexDirection: 'column', margin: 10}}>
          <TouchableOpacity style={styles.button1} onPress={() => medical(selectedpatient)}>
            <Text style={styles.buttonText}>Medical Prescription</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2} onPress={toggleModal}>
            <Text style={styles.buttonText1}>Complete Appointment</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide" // Slide animation from bottom to top
            transparent={true}
            visible={isModalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '800',
                      color: 'black',
                      fontFamily: 'NunitoSans_7pt-Bold',
                    }}>
                    Summary
                  </Text>
                  <TouchableOpacity
                    onPress={toggleModal}
                    style={{
                      backgroundColor: '#deeefd',
                      borderRadius: 20,
                      padding: 5,
                    }}>
                    <Icon name="close" size={20} color="black" />
                  </TouchableOpacity>
                </View>

                <View style={{top: 20}}>
                  <Text style={{fontSize: 16, fontWeight: '600'}}>
                    Diagnosed With
                  </Text>
                  <TextInput
                    value={diagnosed}
                    onChangeText={setdiagnosed}
                    placeholder={selectedpatient.diagnosed_with}
                    multiline
                    placeholderTextColor={'black'}
                    style={{backgroundColor: '#f4f4f4', height: '50%', top: 10}}
                  />

                  <View style={{top: 30}}>
                    <Text style={{fontSize: 16, fontWeight: '600'}}>
                      Completion OTP
                    </Text>
                    <TextInput
                      value={otp}
                      onChangeText={setotp}
                      keyboardType="numeric"
                      placeholderTextColor={'black'}
                      placeholder={selectedpatient.completion_otp.toString()}
                      style={{backgroundColor: '#f4f4f4', top: 10}}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.buttons} onPress={completeapi}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* <TouchableOpacity style={styles.button} onPress={history}>
            <Text style={styles.buttonText}>Previous History</Text>
            </TouchableOpacity> */}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.buttonac} onPress={callapi}>
              <Text style={styles.buttonText}>Accepted</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonrj} onPress={rejected}>
              <Text style={styles.buttonText}>Rejected</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 20}}></View>
        </ScrollView>
      </View>
  );
};

export default Patientdetails;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // height:40,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    height: '80%',
    bottom: 0,
    top: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  itemContainer: {
    margin: 10,
    backgroundColor: '#f6f8fb',
    borderRadius: 5,
    padding: 10,
  },
  itemContainer1: {
    margin: 10,
    backgroundColor: '#f6f8fb',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 17,
    fontFamily: 'NunitoSans_7pt-Bold',
    color: 'black',
  },
  description: {
    fontSize: 15,
    fontFamily: 'NunitoSans_7pt-Bold',
    color: '#49b2e9',
    top: 5,
  },
  description1: {
    fontSize: 15,
    fontFamily: 'NunitoSans_7pt-Bold',
    color: '#49b2e9',
  },
  button: {
    backgroundColor: '#49b2e9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
  },
  buttons: {
    backgroundColor: '#4d91e2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 'auto',
    height: 50,
  },
  button1: {
    backgroundColor: '#888888',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
  },
  button2: {
    backgroundColor: '#9cf0b2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText1: {
    color: 'black',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonac: {
    backgroundColor: '#4e93e1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
    width: '45%',
  },
  buttonrj: {
    backgroundColor: '#4e93e1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
    width: '45%',
  },
});
