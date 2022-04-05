import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Calendar from '../src/Calendar/Calendar'
import Home from '../src/mainTabs/Home'
import Ramzan from '../src/Ramzan/Ramzan'
import Quran from '../src/Quran/Quran';

const Tab = createBottomTabNavigator();

const mainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: '#668521',
        // },
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 70,
          paddingTop: 5,
          paddingBottom: 10,
          elevation: 10,
        },
        tabBarBackground: () => (
          <View />

        ),
      }}
      initialRouteName="home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name='home'
              size={23} />
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: 'poppins',
            fontWeight:"bold"
          }
        }} />
      <Tab.Screen
        name="calendar"
        component={Calendar}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name='calendar-alt'
              size={23} />
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: 'poppins',
            fontWeight:"bold"
          }
        }}
      />
      <Tab.Screen
        name="ramzan"
        component={Ramzan}
        options={{
          tabBarLabel: 'Ramzan',
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name='clock'
              size={23} />
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: 'poppins',
            fontWeight:"bold"
          }
        }}
      />
      <Tab.Screen
        name="quran"
        component={Quran}
        options={{
          tabBarLabel: 'Quran',
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name='quran'
              size={23} />
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: 'poppins',
            fontWeight:"bold"
          }
        }}
      />
    </Tab.Navigator>
  );
};

const styles=StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  },
});

export default mainNavigator;
