import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function App() {
  return (
<View style={{
  flex: 1
}}> 
<View style={{
  backgroundColor: 'pink',
  borderRadius: 10,
  height: 200,
  width: 200,
  flexDirection: 'row'
}}>
<View style={{
  backgroundColor: 'red'
}}>
  <Text>
    Ramzan 12
  </Text>
</View>
<View style={{
  backgroundColor: 'blue'
}}>
  <Text>
    Ramzan 67
  </Text>
</View>
</View>
</View>
  );
}