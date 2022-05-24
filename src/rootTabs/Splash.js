import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {req} from '../../redux/auth/actions';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const checkFirstLaunch = useCallback(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      // navigation.navigate('city');
      dispatch(req());
    });
  }, [navigation]);
  useEffect(() => {
    setTimeout(() => {
      checkFirstLaunch();
    }, 5000);
  }, [checkFirstLaunch]);
  console.log('App Executed');
  return (
    <View style={styles.container}>
      <Image
        style={styles.imagerizvi}
        source={require('../../images/RAZVI.png')}
      />
      <ImageBackground
        style={styles.image}
        source={require('../../images/madina.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#4CA6A8'
    backgroundColor: 'white',
  },
  header: {
    padding: 10,
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 54,
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
  title: {
    marginTop: 5,
    padding: 10,
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
  image: {
    marginTop: -100,
    height: windowHeight / 2,
    width: windowWidth / 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 30,
  },
  imagerizvi: {
    marginTop: 100,
    height: windowHeight / 2,
    width: 400,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 30,
  },
  background: {
    backgroundColor: '#4B59F7',
    height: 450,
    width: windowWidth / 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default Splash;
