import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from '../Screens/Dashboard';
import Inboxscreen from '../Screens/Inboxscreen';
import Requestscreen from '../Screens/Requestscreen';
import Profilescreen from '../Screens/Profilescreen';
import Icon from 'react-native-vector-icons/FontAwesome6';


const Clienttab = createBottomTabNavigator();

const Bottomnavigation = () => {
    return(
        <Clienttab.Navigator
        screenOptions={({ route }) => ({
            tabBarStyle: { backgroundColor: '#4e93e1' },
            tabBarInactiveTintColor: 'white',
            tabBarActiveTintColor:'white',
            tabBarLabelStyle: { fontSize: 13 },
          })}
        >
            <Clienttab.Screen
            name='Dashboard'
            component={Dashboard}
            options={{
                headerShown:false,
                tabBarLabel:'Dashboard',
                tabBarIcon:({color,size})=>(
                   <Image source={require('../Assets/dashboard.png')}/>
                )
            }}
            />
              <Clienttab.Screen
            name='Request'
            component={Requestscreen}
            options={{
                headerShown:false,
                tabBarLabel:'Request',
                tabBarIcon:({color,size})=>(
                    <Image source={require('../Assets/search.png')}/>

                )
            }}
            />
               <Clienttab.Screen
            name='inbox'
            component={Inboxscreen}
            options={{
                headerShown:false,
                tabBarLabel:'Index',
                tabBarIcon:({color,size})=>(
                    <Image source={require('../Assets/inbox.png')}/>

                )
            }}
            />
                         <Clienttab.Screen
            name='profile'
            component={Profilescreen}
            options={{
                headerShown:false,
                tabBarLabel:'Profile',
                tabBarIcon:({color,size})=>(
                    // <Image style={{height:50,width:50}} source={require('../Assets/profilebottom.png')}/>
              <Icon name="user-doctor" size={20} color="white" />
                )
            }}
            />
            
        </Clienttab.Navigator>
    )
}

export default Bottomnavigation

const styles = StyleSheet.create({})