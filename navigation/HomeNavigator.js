import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Quran from '../src/Quran/Quran';
import Home from '../src/mainTabs/Home';
import About from '../src/About/About';

const Stack = createStackNavigator();


const HomeNavigator = () => {
    return (
      <Stack.Navigator headerMode="false" initialRouteName="splash">
          <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="quran" component={Quran} />
        <Stack.Screen 
         options={{
          tabBarVisible: false
        }}
        name="about" component={About}/>
      </Stack.Navigator>
    );
  };
  
  export default HomeNavigator;