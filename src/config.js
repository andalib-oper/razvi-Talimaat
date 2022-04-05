import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from '../navigation/mainNavigator'
import RootNavigator from '../navigation/rootNavigator'

const config = () => {
  const authState = useSelector(state => state.authState);
  return (
    <NavigationContainer>
      {authState.isLoggedIn ? <MainNavigator /> : <RootNavigator />}
    </NavigationContainer>
  );
};

export default config;
