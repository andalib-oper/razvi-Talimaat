import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../src/mainTabs/Home';
import About from '../src/About/About';
import TimeResults from '../src/Ramzan/TimeResults';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: false,
      }}
      initialRouteName="splash">
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="about" component={About} />
      <Stack.Screen name="timeresults" component={TimeResults} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
