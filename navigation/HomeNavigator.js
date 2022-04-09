import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Quran from '../src/Quran/Quran';
import Home from '../src/mainTabs/Home';
import About from '../src/About/About';
import Urdu from '../src/Quran/Urdu';
import Hindi from '../src/Quran/Hindi';
import Arabic from '../src/Quran/Arabic';
import English from '../src/Quran/English';
import ArabicAyahs from '../src/Quran/ArabicAyahs';
import EnglishAyahs from '../src/Quran/EnglishAyahs'

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator headerMode="false" initialRouteName="splash">
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="quran" component={Quran} />
      <Stack.Screen name="about" component={About} />
      <Stack.Screen name="hindi" component={Hindi} />
      <Stack.Screen name="urdu" component={Urdu} />
      <Stack.Screen name="arabic" component={Arabic} />
      <Stack.Screen name="english" component={English} />
      <Stack.Screen name="arabicAyahs" component={ArabicAyahs} />
      <Stack.Screen name="englishAyahs" component={EnglishAyahs} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
