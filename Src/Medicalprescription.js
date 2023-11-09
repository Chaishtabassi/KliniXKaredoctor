import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const Medicalprescription = ({ route, navigation }) => {
  const selectedpatien = route.params ? route.params.selectedpatien : null;
  console.log(selectedpatien);

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const [notes, setnotes] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
        <View style={{ flex: 1, alignItems: 'center', margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'black' }}>
            Medical Prescription
          </Text>
        </View>
      </View>
      <View>
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>
            Create Prescription For:
          </Text>
        </View>
        {selectedpatien && (
          <View style={styles.itemContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ height: 90, width: 90 }}
                resizeMode="contain"
                source={require('../Src/Assets/profilepic.jpg')}
              />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: 'NunitoSans_7pt-Bold',
                    color: 'black',
                  }}>
                  {selectedpatien.user.fullname}
                </Text>
                <View style={{ flexDirection: 'row', top: 5 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NunitoSans_7pt-Light',
                      color: 'grey',
                    }}>
                    {selectedpatien.user.age}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NunitoSans_7pt-Light',
                      color: 'grey',
                      marginLeft: 10,
                    }}>
                    {selectedpatien.user.gender === 0 ? 'Male' : 'Female'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NunitoSans_7pt-Light',
                    color: 'grey',
                    top: 5,
                  }}>
                  {new Date(selectedpatien.user.created_at).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={{ backgroundColor: '#f4f4f4', padding: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#4e93e1' }}>
          Add Medicine
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: 'black' }}>Notes</Text>
      </View>
      <TextInput
        value={notes}
        onChangeText={setnotes}
        placeholder="Write here"
        multiline
        placeholderTextColor={'black'}
        style={{ backgroundColor: '#f4f4f4', height: '25%', top: 10 }}
      />
      <TouchableOpacity style={styles.buttons}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Medicalprescription;

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: '#4d91e2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 'auto', // Push the button to the bottom
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
  itemContainer: {
    margin: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    padding: 10,
  },
});
