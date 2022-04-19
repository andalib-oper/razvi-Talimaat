import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../src/rootTabs/Splash';
import City from '../src/rootTabs/City';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator headerMode="false" initialRouteName="splash">
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="city" component={City}/>
    </Stack.Navigator>
  );
};

export default RootNavigator;
