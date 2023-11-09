import { StyleSheet, Text, View,FlatList,Dimensions,Image ,TouchableOpacity,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import Requestheader from '../Component/Requestheader'
import Appointmentlist from '../Data/Appointmentlist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Requestscreen = ({navigation}) => {

  const [loading, setLoading] = useState(true); // Initialize with true to show the loader initially


  useFocusEffect(
    React.useCallback(() => {
      callApi();
    }, [])
  );
  
  const [apiData, setApiData] = useState([]); 

  const callApi = async (selectedDate) => {

    const storedate = await AsyncStorage.getItem('selectedDateFormatted');


    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    console.log(bearerToken);

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
        const api =
        `http://teleforceglobal.com/doctor/api/v1/fetchAppointmentHistory`;

      const authToken = bearerToken

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      // formData.append('date',storedate );
      // formData.append('status',1);

      // formData.append('status',0 );

      console.log('hello', formData);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Authorization':`Bearer ${authToken}`,
        },
        // body: JSON.stringify(),
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);
          console.log(responseText)

        // const usersArray = [];
        // for (const key in responseData.data) {
        //   if (responseData.data.hasOwnProperty(key)) {
        //     const userObject = responseData.data[key].user;
        //     if (userObject) {
        //       usersArray.push(userObject);
        //     }
        //   }
        // }
        setLoading(false);
        setApiData(responseData.data);
        console.log('Users Array:', responseData.data);
        } else {
          console.error('Non-200 status code:', response.status);
          setLoading(false); 
        }
      } else {
        console.error('Response is undefined');
        setLoading(false); 
      }

    
    } catch (error) {
      console.error('erorrr',error);
      setLoading(false); 
    }
  };

  const Patientdetail = (patient) => {
    navigation.navigate('patient', { selectedpatient: patient });
    console.log(patient);
  }

  const renderItem = ({ item }) => (
    // <TouchableOpacity onPress={() => Patientdetail(item)}>
         <View style={styles.cardContainer}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../Assets/doctorsimage.png')}/>
        <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>{item.user.fullname}</Text>
            <View style={{flexDirection:'row'}}>    
              <Text style={{ fontSize: 14, fontFamily: 'NunitoSans_7pt-Light', color: 'grey' }}>{item.user.age}</Text>
              <Text style={{ fontSize: 14, fontFamily: 'NunitoSans_7pt-Light', color: 'grey', marginLeft: 10 }}>
                        {item.user.gender === 0 ? 'Male' : 'Female'}
               </Text>
            </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => Patientdetail(item)}>
              <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
    </View>
    </View>
// </TouchableOpacity>

  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
  <View style={{ backgroundColor: '#f4f4f4' }}>
    <Text style={styles.bottomText}>REQUESTS</Text>
  </View>

  {apiData.length === 0 ? (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        // Show the loader in the center of the screen
        <ActivityIndicator size="large" color="#49b2e9" />
      ) : (
        <Image
          style={{ height: '65%', width: '65%' }}
          resizeMode="contain"
          source={require('../Assets/null.png')}
        />
      )}
    </View>
  ) : (
    <FlatList
      data={apiData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
    />
  )}
</View>

  )
}

export default Requestscreen

const styles = StyleSheet.create({
  itemContaine: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#49b2e9' ,
    borderRadius: 5,
    padding: 15,
    paddingVertical:20
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    margin: 10,
  },
  imageContainer: {
    marginBottom: 5,
    alignItems:'center'
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  text1: {
    textAlign: 'center',
    fontSize:15,
    fontFamily:'Domine-Bold',
    color:'white'
  },
  text: {
    textAlign: 'center',
    fontSize:15,
    fontFamily:'Domine-Bold'
  },
  bottomText: {
    margin: 10,
    fontSize:18,
    // color:'#49b2e9',
    fontFamily:'Domine-Bold'
  },
  dayDateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 10, 
    width: 60, 
    height:60
  },
  button: {
    justifyContent:'center',
    backgroundColor: '#4e93e1',
    alignItems:'center',
    borderRadius: 30,
    width: Dimensions.get('window').width * 0.25,
    height: 42,
  },
  buttonText: {
    color: 'white',
    fontFamily:'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 17,
  },
})