import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Image,
  RefreshControl,
  Dimensions,
  Platform,
  PixelRatio,
  ToastAndroid,
  Button,
  Share,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import ImageOverlay from 'react-native-image-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const NUM_OF_LINES = 4;
import Geolocation from '@react-native-community/geolocation';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import {SkypeIndicator} from 'react-native-indicators';
import moment from 'moment';
import {hasPermission} from '../Hooks/LocationPermission';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import RNLocation from 'react-native-location';
import LocationEnabler from 'react-native-location-enabler';
import axios from 'axios';

import {MMKV} from 'react-native-mmkv';
import PrayerTimes from './PrayerTimes';

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

const {
  PRIORITIES: {HIGH_ACCURACY},
  useLocationSettings,
  addListener,
  checkSettings,
  requestResolutionSettings,
} = LocationEnabler;

const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [prayerLoading, setPrayerLoading] = useState(true);
  const [data, setData] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const [city, setCity] = useState('');
  const [date, setDate] = useState({});
  const [locPermission, setLocPermission] = useState(false);
  const [locLoading, setLocLoading] = useState(true);
  const [lagitude, setLagitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLoadingVerse, setLoadingVerse] = useState(true);
  const [dataVerse, setDataVerse] = useState([]);

  const config = {
    priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
    alwaysShow: true, // default false
    needBle: false, // default false
  };

  useEffect(() => {
    async function fetchMyAPI() {
      var locationPermission = hasPermission();
      await locationPermission.then(res => {
        console.log('res', res);
        if (res) {
          checkSettings(config);
          requestResolutionSettings(config);
          addListener(({locationEnabled}) => {
            if (locationEnabled) {
              Geolocation.getCurrentPosition(
                position => {
                  setLagitude(position.coords.latitude);
                  setLongitude(position.coords.longitude);
                  setLocPermission(true);
                  setLocLoading(false);
                },
                error => {
                  // See error code charts below.
                  console.warn('Error ' + error.code, error.message);
                  setLocPermission(false);
                  setLocLoading(false);
                },
                {
                  enableHighAccuracy: true,
                  timeout: 500000,
                  maximumAge: 10000,
                },
              );
            } else {
              setPrayerLoading(false);
            }
          });
        } else {
          setPrayerLoading(false);
        }
      });
    }

    fetchMyAPI();
  }, []);

  // console.log(locLoading);

  // const listener = addListener(({locationEnabled}) =>
  //   console.log(`Location are ${locationEnabled ? 'enabled' : 'disabled'}`),
  // );

  // useEffect(() => {
  //   // if(locPermission){
  //   // Check if location is enabled or not
  //   console.log(locPermission);
  //   if (locPermission === true) {
  //     console.log('inside');

  //     // If location is disabled, prompt the user to turn on device location

  //     // ...
  //     // Removes this subscription
  //     // listener.remove();
  //     // }
  //   }
  // }, [locPermission]);

  // }
  // const fetchData = async () => {
  //   const resp = await fetch(
  //     'https://api.quran.com/api/v4/verses/random?language=ara&fields=text_uthmani&words=true',
  //   );
  //   const data = await resp.json();
  //   setDataVerse(data.verse);
  //   setLoadingVerse(false);
  // };

  // console.log(dataVerse)

  useEffect(() => {
    // fetchData();
    Promise.all([
      fetch(
        'https://api.quran.com/api/v4/verses/random?language=ara&fields=text_uthmani&words=true',
      ),
      fetch('https://razvitalimat.herokuapp.com/api/content'),
    ])
      .then(res => Promise.all(res.map(res => res.json())))
      .then(([res1, res2]) => {
        setDataVerse(res1.verse);
        setLoadingVerse(false);
        setData(res2);
        setLoading(false);
      });
  }, []);

  const storage = new MMKV();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetch('https://razvitalimat.herokuapp.com/api/content')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error))
        .finally(() => setLoading(false), setRefreshing(false));
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  const [showMore, setShowMore] = useState(false);

  const onTextLayout = useCallback(e => {
    setShowMore(e.nativeEvent.lines.length > NUM_OF_LINES);
  }, []);

  useEffect(() => {
    // if (city) {

    init_time();
  }, [lagitude, longitude]);

  const init_time = async () => {
    const storage_data = storage.contains('prayerTimes')
      ? JSON.parse(storage.getString('prayerTimes'))
      : {};
    if (storage_data.date?.gregorian.date !== moment().format('DD-MM-YYYY')) {
      axios
        .get(
          `http://api.aladhan.com/v1/timings?latitude=${lagitude}&longitude=${longitude}`,
        )
        .then(res => {
          const resp = res.data.data.timings;
          Object.keys(resp).forEach(
            key =>
              (resp[key] = {
                hr: resp[key].split(' ')[0].split(':')[0],
                min: resp[key].split(' ')[0].split(':')[1],
              }),
          );
          setPrayerTimes(resp);
          setDate(res.data.data.date);
          storage.set(
            'prayerTimes',
            JSON.stringify({
              data: resp,
              date: res.data.data.date,
            }),
          );
        })
        .catch(error => console.error(error))
        .finally(() => setPrayerLoading(false));
      // }
    } else {
      setPrayerTimes(storage_data?.data);
      setDate(storage_data?.date);
      setPrayerLoading(false);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Surah No. - ${dataVerse.verse_number}
                  ${dataVerse.text_uthmani}
                  Download Razvi Talimat
                  Application
                  http://example/jkhkef
        `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        {!enabled && (
          <Button
            onPress={requestResolution}
            title="Request Resolution Location Settings"
          />
        )}
      </View> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {locPermission ? (
          <View style={styles.topContainer}>
            {prayerLoading || Object.keys(prayerTimes).length < 9 ? (
              <Text>Currently fetching data</Text>
            ) : (
              <PrayerTimes
                prayerTimes={prayerTimes}
                prayerLoading={prayerLoading}
                date={date}
              />
            )}
            {/* <View>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 50,
                  width: windowWidth / 1.2,
                  marginLeft: 20,
                  marginRight: 20,
                  alignSelf: 'center',
                  marginTop: -20,
                  borderColor: 'black',
                  borderRadius: 15,
                  // borderWidth: 2
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    // margin: 10,
                    textAlign: 'center',
                    marginRight: 35,
                    flex: 1,
                    fontSize: 20,
                    fontWeight: '600',
                    color: 'black',
                  }}>
                  Latest Articles
                </Text>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 10,
                    marginLeft: 10,
                    // marginLeft: 10,
                    // marginTop: -45,
                  }}
                  source={require('../../images/article.jpg')}
                />
              </View>
            </View> */}
          </View>
        ) : null}
        <View>
          <View
            style={{
              backgroundColor: 'white',
              height: 50,
              width: windowWidth / 1.2,
              marginLeft: 20,
              marginRight: 20,
              alignSelf: 'center',
              marginTop: locPermission ? -25 : 5,
              borderColor: 'black',
              borderRadius: 15,
              // borderWidth: 2
              elevation: 5,
              // shadowColor: '#000',
              // shadowOffset: {
              //   width: 0,
              //   height: 3,
              // },
              // shadowOpacity: 0.27,
              // shadowRadius: 4.65,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                // margin: 10,
                textAlign: 'center',
                fontSize: 20,
                marginRight: 35,
                flex: 1,
                fontWeight: '600',
                color: 'black',
              }}>
              Latest Articles
            </Text>
            <Image
              style={{
                height: 40,
                width: 40,
                borderRadius: 10,
                marginLeft: 10,
                // marginLeft: 10,
                // marginTop: -45,
              }}
              source={require('../../images/article.jpg')}
            />
          </View>
        </View>

        {/* {prayerTimes.map(item => {
          return (
            <View>
              <Text
                style={{
                  color: 'red',
                }}>
                {item.times.Fajr}
                h3
              </Text>
            </View>
          );
        })} */}

        <View style={{flex: 1, padding: 2}}>
          {isLoading || (locPermission && prayerLoading) ? (
            <OrientationLoadingOverlay
              visible={true}
              color="white"
              indicatorSize="large"
              messageFontSize={24}
              // message="Loading... 😀😀😀"
            />
          ) : (
            <View>
              <View
                style={{
                  backgroundColor: 'white',
                  width: windowWidth / 1.1,
                  height: 'auto',
                  margin: 10,
                  elevation: 5,
                  alignSelf: 'center',
                  borderRadius: 2,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                  borderRadius: 10,
                  padding: normalize(10),
                  paddingBottom: normalize(25),
                }}>
                <Text
                  style={{
                    fontSize: normalize(18),
                    fontWeight: '600',
                    color: 'black',
                    marginLeft: 5,
                    marginTop: 5,
                  }}>
                  Ayah of the day
                </Text>
                <Image
                  source={require('../../images/corner.png')}
                  style={{
                    height: normalize(50),
                    width: normalize(50),
                    // paddingVertical: normalize(25),
                    // paddingHorizontal: normalize(15),
                    alignSelf: 'center',
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    transform: [
                      {
                        rotateY: '180deg',
                      },
                    ],
                  }}
                />
                <Image
                  source={require('../../images/corner.png')}
                  style={{
                    height: normalize(50),
                    width: normalize(50),
                    // paddingVertical: normalize(25),
                    // paddingHorizontal: normalize(15),
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: 5,
                    left: 5,
                    transform: [
                      {
                        rotateX: '180deg',
                      },
                    ],
                  }}
                />
                <FontAwesome
                  name="share-alt"
                  size={normalize(20)}
                  color="grey"
                  style={{
                    height: normalize(30),
                    width: normalize(30),
                    // paddingVertical: normalize(25),
                    // paddingHorizontal: normalize(15),
                    alignSelf: 'center',
                    // position: 'absolute',
                    position: 'absolute',
                    top: 30,
                    right: 30,
                    // transform: [
                    //   {
                    //     // rotateY: '180deg',
                    //   },
                    // ],
                  }}
                  onPress={onShare}
                />
                {/* <Text
                  style={{
                    fontSize: normalize(14),
                    fontWeight: '400',
                    color: 'blue',
                    marginLeft: 10,
                    // flexWrap: 'wrap',
                  }}>
                  Ayas of the day
                </Text> */}
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontWeight: '400',
                    color: '#777',
                    marginLeft: 5,
                    // flexWrap: 'wrap',
                  }}>
                  Surah No - {dataVerse.verse_key}
                </Text>

                <Text
                  style={{
                    fontSize: normalize(16),
                    fontWeight: '400',
                    color: '#222',
                    // marginLeft: 10,
                    marginTop: 20,
                    paddingHorizontal: normalize(10),
                    // paddingVertical: normalize(10),
                    // flexWrap: 'wrap',
                  }}>
                  {dataVerse.text_uthmani}
                </Text>
                <View>
                  {/* <Button
                    onPress={onShare}
                    title="Share"
                    style={{borderRadius: 2}}
                  /> */}
                  {/* <FontAwesome
                    name="bookmark"
                    size={normalize(30)}
                    color="black"
                    style={{
                      height: normalize(50),
                      width: normalize(50),
                      // paddingVertical: normalize(25),
                      // paddingHorizontal: normalize(15),
                      alignSelf: 'center',
                      // position: 'absolute',
                      top: 65,
                      left: 75,
                      transform: [
                        {
                          rotateY: '180deg',
                        },
                      ],
                    }}
                    // onPress={onShare}
                  /> */}
                </View>
              </View>
              {data.map(item => {
                return (
                  <View style={styles.umrah} key={item._id}>
                    <Image
                      style={{
                        height: windowHeight / 2.9,
                        width: windowWidth / 1.1,
                        borderRadius: 10,
                        padding: 2,
                        // margin: 10,
                      }}
                      source={{
                        uri: item.contentImg,
                      }}
                    />

                    <View
                      style={{
                        margin: 5,
                        height: 'auto',
                        width: windowWidth / 1.2,
                        // marginTop: -140,
                        // marginLeft: 160,
                        padding: normalize(10),
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: normalize(18),
                          fontWeight: '600',
                          color: 'black',
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: normalize(14),
                          fontWeight: '400',
                          color: 'black',
                          flexWrap: 'wrap',
                        }}
                        // numberOfLines={NUM_OF_LINES}
                        onTextLayout={onTextLayout}>
                        {item.content}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topContainer: {
    // backgroundColor: '#ade0f5',
    // backgroundColor: '#035173',
    // height: windowHeight / 2.9,
    // width: windowWidth / 1,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    // backgroundColor: '#00000050',
  },

  topbar: {
    // backgroundColor: 'pink',
    height: 50,
    width: windowWidth / 1,
    marginTop: 10,
  },
  iconQuran: {
    marginLeft: 30,
    marginTop: 10,
  },
  iconCalendar: {
    marginLeft: 200,
    marginTop: -33,
  },
  iconRamzan: {
    marginLeft: 350,
    marginTop: -31,
  },
  verses: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center',
    // height: windowHeight/3.8,
    // width:  windowWidth /1.1,
    height: windowHeight / 4,
    width: windowWidth / 1.1,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 20,
  },
  verseheader: {
    marginTop: 20,
    marginLeft: 13,
    fontSize: 18,
    color: 'black',
  },
  verseby: {
    marginTop: 2,
    marginLeft: 15,
    fontSize: 14,
    color: 'blue',
  },
  versesurat: {
    marginTop: 2,
    marginLeft: 15,
    fontSize: 14,
    color: 'black',
  },
  ayat: {
    fontSize: 18,
    marginRight: 20,
    marginTop: 10,
    fontWeight: '700',
    color: 'black',
  },
  translate: {
    marginTop: 10,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: '600',
    color: 'black',
  },
  umrah: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    alignSelf: 'center',
    margin: 10,
    marginRight: 10,
    // height: windowHeight/4,
    width: windowWidth / 1.1,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    borderRadius: 20,
  },
  hajj: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 150,
    width: 390,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 20,
  },
  wordsmean: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 150,
    width: 390,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 20,
  },
});
export default Home;
