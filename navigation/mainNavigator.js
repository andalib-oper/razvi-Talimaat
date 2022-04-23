import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {View, StyleSheet} from 'react-native';
import Ramzan from '../src/Ramzan/Ramzan';
import HomeNavigator from './HomeNavigator';
import CalendarScreen from '../src/Calendar/Calendar';
import QuranNavigator from './QuranNavigator';

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

        tabBarBackground: () => <View />,
      }}
      initialRouteName="home">
      <Tab.Screen
        name="homeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <FontAwesome5
              name="home"
              color={focused ? '#090979' : '#808080'}
              size={23}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: 'poppins',
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="quran"
        component={QuranNavigator}
        options={{
          tabBarLabel: 'Quran',
          tabBarIcon: ({color, focused}) => (
            <FontAwesome5
              color={focused ? '#090979' : '#808080'}
              name="quran"
              size={23}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: 'poppins',
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({color, focused}) => (
            <FontAwesome5
              color={focused ? '#090979' : '#808080'}
              name="calendar-alt"
              size={23}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: 'poppins',
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="ramzan"
        component={Ramzan}
        options={{
          tabBarLabel: 'Ramzan',
          tabBarIcon: ({color, focused}) => (
            <FontAwesome5
              color={focused ? '#090979' : '#808080'}
              name="clock"
              size={23}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: 'poppins',
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  },
});

export default mainNavigator;
