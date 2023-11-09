import { StyleSheet, Text, View,Image ,FlatList,Dimensions,TouchableOpacity,Modal} from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/EvilIcons';
import Backbutton from '../../Component/Backbutton';
import Doctorsdata from '../../Data/Doctorsdata';


const Doctorsscreen = ({navigation}) => {

    const [sortingModalVisible, setSortingModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const Appointment = (doctor) => {
    navigation.navigate('appointment', { selectedDoctor: doctor });
  }
  

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../Assets/doctorsimage.png')}/>
            <View style={{ marginLeft: 15, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{item.fullname}</Text>
                    <Icon name="star" size={25} color="black" />
                </View>
                <Text style={{ fontSize: 14, fontFamily: 'NunitoSans_7pt-Light', color: 'grey' }}>{item.specialist}</Text>
                <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{'$' + item.rate}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../Assets/clock.png')} />
                        <Text style={{ fontSize: 14, fontFamily: 'NunitoSans_7pt-Light', color: 'grey' }}>{item.time}</Text>
                    </View>
                </View>
                {/* <View style={{flexDirection:'row',top:10,justifyContent:'space-evenly'}}>
                <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Send Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1}  onPress={() => Appointment(item)}>
                        <Text style={styles.buttonText}>Appointment</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    </View>
    
      );

      const filter=()=>{
        navigation.navigate('filter');
      }

  return (
    <View>
      <View style={styles.header}>
        <Backbutton/>
        <Text style={styles.title}>Doctors</Text>
        </View>
        <View style={{paddingBottom: 65}}>
        <FlatList
        data={Doctorsdata}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} 
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
        </View>
    </View>
  )
}

export default Doctorsscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        margin:15
      },
      title: {
        flex: 1,
        fontSize: 18,
        color: 'black',
        fontFamily:'Domine-Bold',
        textAlign: 'center',
        alignSelf: 'center',
      },
      separator: {
        height: 1,
        backgroundColor: '#e3e1da',
      },
      button: {
        justifyContent:'center',
        backgroundColor: '#49b2e9',
        alignItems:'center',
        borderRadius: 5,
        width: Dimensions.get('window').width * 0.27,
        height: 50,
      },
      button1: {
        justifyContent:'center',
        backgroundColor: '#888888',
        alignItems:'center',
        borderRadius: 5,
        width: Dimensions.get('window').width * 0.27,
        height: 50,
      },
      buttonText: {
        color: 'white',
        fontFamily:'NunitoSans_7pt-Bold',
        textAlign: 'center',
        fontSize: 16,
      },
})