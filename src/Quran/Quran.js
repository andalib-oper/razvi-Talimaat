import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  PixelRatio,
  Platform,
  ScrollView,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scale = windowWidth / 320;

function normalize(size) {
  const newSize = size * scale;

  if (Platform.OS === 'ios' && 'android') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

function Arabic({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getSurahs = async () => {
    try {
      const response = await fetch('http://api.alquran.cloud/v1/surah');
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSurahs();
  }, []);
  return (
    <ScrollView>
      {isLoading ? (
        <OrientationLoadingOverlay
          visible={true}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          // message="Loading... 😀😀😀"
        />
      ) : (
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              // <View style={styles.topnav}>
              <Pressable
                onPress={() =>
                  navigation.navigate('arabicAyahs', {
                    code: item.number,
                  })
                }>
                <View style={styles.surah}>
                  <Text style={styles.number}>{item.number}.</Text>
                  <View
                    style={{
                      // backgroundColor: 'pink',
                      alignContent: 'center',
                      textAlign: 'right',
                      marginTop: -10,
                      marginRight: 10,
                      fontWeight: 'bold',
                    }}>
                    <Text style={styles.surahArabic}>{item.name}</Text>
                  </View>
                  <View
                    style={{
                      // backgroundColor: 'pink'
                      marginTop: -5,
                    }}>
                    <Text style={styles.versesArabic}>
                      Verses {item.numberOfAyahs}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </ScrollView>
      )}
    </ScrollView>
  );
}

function English({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getSurahs = async () => {
    try {
      const response = await fetch('http://api.alquran.cloud/v1/surah');
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSurahs();
  }, []);
  return (
    <View>
      {isLoading ? (
        <OrientationLoadingOverlay
          visible={true}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
          // message="Loading... 😀😀😀"
        />
      ) : (
        <ScrollView scrollIndicatorInsets={false}>
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('englishAyahs', {
                    code: item.number,
                  })
                }>
                <View style={styles.surah}>
                  <Text style={styles.number}>{item.number}.</Text>
                  <View
                    style={{
                      // backgroundColor: 'grey',
                      width: '50%',
                      paddingRight: normalize(15),
                      // alignContent:'center',
                      // alignSelf: 'center',
                      // marginTop: -10,
                      // fontSize: 20,
                    }}>
                    <Text style={styles.surahArabic}>{item.name}</Text>
                  </View>
                  <View
                    style={{
                      // backgroundColor: 'pink',
                      width: '40%',
                    }}>
                    <Text style={styles.surahEnglish}>{item.englishName}</Text>
                    <Text style={styles.verses}>
                      Verses {item.numberOfAyahs}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function Quran() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#009ffd', '#2a2a72']}
        style={styles.image}
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 0.6}}
        locations={[0.2, 1]}>
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: normalize(18),
            color: 'white',
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: -60,
          }}>
          Quran
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
          }}>
          <Image
            source={require('../../images/mosque.png')}
            style={{width: normalize(40), height: normalize(70)}}
          />
          <Image
            source={require('../../images/mosque.png')}
            style={{width: normalize(60), height: normalize(100)}}
          />
          <Image
            source={require('../../images/mosque.png')}
            style={{width: normalize(40), height: normalize(70)}}
          />
          <Image
            source={require('../../images/praying.png')}
            style={{
              width: normalize(90),
              height: normalize(90),
              position: 'absolute',
              top: normalize(100),
              alignSelf: 'center',
              // right: -5,
              // transform: [
              //   {
              //     translateX: -50,
              //   },
              // ],
            }}
          />
        </View>
      </LinearGradient>
      {/* <ImageBackground
        style={styles.image}
        source={require('../../images/background3.jpeg')}>
        <View style={{backgroundColor: 'pink'}}>
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              fontSize: normalize(18),
              color: 'white',
              fontWeight: '600',
              marginTop: -130,
              marginBottom: -60,
              // numberOfLines: 1,
            }}>
            Quran
          </Text>
        </View>
      </ImageBackground> */}
      <Tab.Navigator>
        <Tab.Screen name="english" component={English} />
        <Tab.Screen name="arabic" component={Arabic} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topnav: {
    height: 60,
    width: windowWidth / 1,
    backgroundColor: '#4b7bf2',
  },
  image: {
    marginTop: 0,
    height: windowHeight / 3,
    width: windowWidth / 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // borderBottomLeftRadius: 30,
  },
  topnavtext: {
    marginTop: -35,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: normalize(22),
    color: 'white',
  },
  icon: {
    marginLeft: 20,
    marginTop: 15,
  },
  surahArabic: {
    // marginTop: -10,
    // marginRight: 170,
    // marginLeft: 0,
    // width: '55%',
    textAlign: 'right',
    fontSize: 24,
    fontWeight: '600',
    color: '#152693',
    textAlign: 'right',
  },
  surahEnglish: {
    // marginTop: -30,
    // marginLeft: 200,
    // width: '40%',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
  },
  verses: {
    // marginTop: -2,
    fontSize: 14,
    // marginLeft: 200,
    // marginBottom: 10
  },
  versesArabic: {
    marginTop: 10,
    fontSize: 14,
    marginLeft: 50,
    marginBottom: 10,
    color: '#555',
  },
  revelation: {
    marginTop: 2,
    fontSize: 14,
    marginLeft: 40,
    color: '#555',
  },
  surah: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(20),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 'auto',
    width: windowWidth / 1.1,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 10,
    // justifyContent: 'space-between',
  },
  number: {
    //   return (
    //       <Tab.Screen name="Home" component={HomeScreen} />
    //       <Tab.Screen name="Settings" component={SettingsScreen} />
    //     </Tab.Navigator>
    //   );
  },
});
