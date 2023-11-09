import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Backbutton from '../../Component/Backbutton'

const Privacyscreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Backbutton />
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 18, fontFamily: 'Domine-Bold', color: 'black' }}>Privacy Policy</Text>
        <Text style={{ fontSize: 14, color: 'black', marginTop: 10 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae
          augue eu ipsum euismod feugiat. Sed in turpis eu nisi bibendum varius.
          Nullam id lorem ac libero pulvinar facilisis.
        </Text>
      </View>
    </View>
  )
}

export default Privacyscreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    height: 40,
    margin: 10
  },
})
