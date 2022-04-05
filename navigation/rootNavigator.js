import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../src/rootTabs/Splash';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator headerMode="false" initialRouteName="splash">
      <Stack.Screen name="splash" component={Splash} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
