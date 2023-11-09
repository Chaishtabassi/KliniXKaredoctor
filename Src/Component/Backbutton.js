import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';

const Backbutton = () => {

    const navigation = useNavigation();

    const handleBackButtonPress = () => {
        navigation.goBack();
      };

  return (
    <View>
      <TouchableOpacity onPress={handleBackButtonPress}>
        <Icon name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default Backbutton

const styles = StyleSheet.create({})