import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../Component/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import Appointmentlist from '../Data/Appointmentlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {phonecall} from 'react-native-communications';
import DateTimePicker from '@react-native-community/datetimepicker';

const Dashboard = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const doctorslist = () => {
    navigation.navigate('doctors');
  };

  const [apiData, setApiData] = useState([]);

  const callApi = async selectedDate => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    console.log(bearerToken);

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/fetchAppointmentHistory`;

      const authToken = bearerToken;

      const selectedDateFormatted = `${currentYear}-${String(
        currentMonth,
      ).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
      console.log('heloooooooooooo', selectedDateFormatted);

      await AsyncStorage.setItem(
        'selectedDateFormatted',
        selectedDateFormatted,
      );

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('date', selectedDateFormatted);
      // formData.append('status',1);

      // formData.append('status',0 );

      console.log('hello', formData);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
        // body: JSON.stringify(),
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);

          const usersArray = [];
          for (const key in responseData.data) {
            if (responseData.data.hasOwnProperty(key)) {
              const userObject = responseData.data[key].user;
              if (userObject) {
                usersArray.push(userObject);
              }
            }
          }
          setApiData(usersArray);
          console.log('Users Array:', usersArray);
        } else {
          console.error('Non-200 status code:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  };

  const handleDateSelection = date => {
    setSelectedDate(date);
    callApi(date); // Call the API when a date is selected
  };

  const selectedDoctor = route.params ? route.params.selectedDoctor : null;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const dates = [];

  for (let date = 1; date <= daysInMonth; date++) {
    dates.push(date);
  }

  const [selectedDate, setSelectedDate] = useState(null);

  const Patientdetail = patient => {
    navigation.navigate('patient', {selectedpatient: patient});
  };

  const chat = () => {
    navigation.navigate('message');
  };

  const renderItem = ({item}) => (
    // <TouchableOpacity onPress={() => Patientdetail(item)}>
    <View style={styles.cardContainer}>
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
            {item.fullname}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NunitoSans_7pt-Light',
                color: 'grey',
              }}>
              {item.age}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NunitoSans_7pt-Light',
                color: 'grey',
                marginLeft: 10,
              }}>
              {item.gender === 0 ? 'Male' : 'Female'}
            </Text>
          </View>
        </View>
        
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '30%',
          }}>
          <TouchableOpacity onPress={() => callPhoneNumber(item.identity)}>
            <Icon name="call-outline" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={chat}>
            <Icon name="chatbubbles-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </TouchableOpacity>
  );

  // Function to initiate a phone call
  const callPhoneNumber = phoneNumber => {
    if (phoneNumber) {
      phonecall(phoneNumber, true);
    }
  };

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const [selectedDatee, setSelectedDatee] = useState(new Date());

  const handleDateChange = (event, date) => {
    if (date) {
      setShowDatePicker(false);
      setSelectedDatee(date);

      const selectedYear = date.getFullYear();
      const selectedMonth = date.getMonth() + 1;
      const selectedDay = date.getDate();

      // Format the date as "YYYY-MM-DD"
      const formattedDate = `${selectedDay.toString().padStart(2, '0')}`;

      // Call the API with the formatted date
      callApi(formattedDate);

      setYear(selectedYear.toString());
      setMonth(selectedMonth.toString().padStart(2, '0'));
      setDay(selectedDay.toString().padStart(2, '0'));

      // Calculate age immediately when DOB is entered
      calculateAge(selectedYear, selectedMonth, selectedDay);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <Header /> */}
      <View style={{backgroundColor:'#f4f4f4'}}>
      <View
        style={{
          margin: 10,
          backgroundColor: '#e3e1da',
          width: '50%',
          alignItems: 'center',
          borderRadius: 10,
          padding:5
        }}>
        <Text style={styles.bottomText}> APPOINTMENTS</Text>
      </View>
      </View>

      <View style={styles.container}>
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.bottomText1}> Select Date</Text>
            <View style={{flexDirection: 'row'}}>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDatee}
                  mode="date"
                  display="calendar"
                  onChange={handleDateChange}
                />
              )}
              <TouchableOpacity
                style={{bottom: 8, marginRight: 7}}
                onPress={() => setShowDatePicker(true)}>
                <Icon name="calendar" size={25} color="black" />
              </TouchableOpacity>
              <Text style={styles.bottomText1}>
                {monthNames[currentMonth - 1]} {currentYear}
              </Text>
            </View>
          </View>
          <FlatList
            data={dates}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(date, index) => index.toString()}
            renderItem={({item: date, index}) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDateSelection(date)}
                style={[
                  styles.dayDateContainer,
                  selectedDate === date
                    ? {backgroundColor: '#4e93e1'}
                    : {backgroundColor: '#efefef'},
                ]}>
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === date ? {color: 'white'} : {color: 'black'},
                  ]}>
                  {date}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === date ? {color: 'white'} : {color: 'black'},
                  ]}>
                  {getDayName(currentYear, currentDate.getMonth(), date)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{marginTop: 15}}>
          <Text style={styles.bottomText}> {apiData.length} Appointments</Text>

          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />

          {apiData.length === 0 ? (
            <View style={{margin: 10,alignItems:'center',justifyContent:'center'}}>
              <Image style={{height:'65%',width:'65%'}} resizeMode="contain" source={require('../Assets/null.png')}/>
            </View>
          ) : (
            <FlatList
              data={apiData}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </View>
      </View>
    </View>
  );
};

function getDayName(year, month, day) {
  const date = new Date(year, month, day);
  const dayIndex = date.getDay();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[dayIndex];
}

export default Dashboard;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#f6f8fb',
    borderRadius: 5,
    padding: 10,
  },
  text1: {
    fontSize: 16,
    fontFamily: 'NunitoSans_7pt-Regular',
  },
  dateText:{
    fontSize:15,
    fontWeight:'500'
  },
  searchInput: {
    backgroundColor: '#f4f4f4',
    // padding: 10,
    margin: 10,
    borderRadius: 10,
    // borderWidth: 1,
    borderColor: 'gray',
    fontFamily: 'NunitoSans_7pt-Regular',
  },
  cardContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    margin: 10,
  },
  imageContainer: {
    // marginBottom: 5,
    // alignItems:'center'
  },
  image: {
    width: 30,
    height: 20,
    resizeMode: 'cover',
  },
  text1: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Domine-Bold',
    color: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Domine-Bold',
  },
  bottomText: {
    fontSize: 17,
    letterSpacing: 1,
    fontFamily: 'Domine-Bold',
  },
  bottomText1: {
    fontSize: 18,
    fontFamily: 'Domine-Bold',
    bottom: 8,
  },
  dayDateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 10,
    width: 60,
    height: 60,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#49b2e9',
    alignItems: 'center',
    borderRadius: 30,
    width: Dimensions.get('window').width * 0.25,
    height: 52,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
