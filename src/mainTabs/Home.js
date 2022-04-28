import React, { useState, useEffect, useCallback } from 'react';
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
} from 'react-native';
import ImageOverlay from 'react-native-image-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const NUM_OF_LINES = 4;
import Geolocation from '@react-native-community/geolocation';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { SkypeIndicator } from 'react-native-indicators';
import moment from 'moment';
import { hasPermission } from '../Hooks/LocationPermission';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import RNLocation from 'react-native-location';

import LocationEnabler from 'react-native-location-enabler';
import axios from 'axios';

import { MMKV } from 'react-native-mmkv';

const {
  PRIORITIES: { HIGH_ACCURACY },
  useLocationSettings,
} = LocationEnabler;

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

const Home = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [prayerLoading, setPrayerLoading] = useState(true);
  const [data, setData] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const [city, setCity] = useState('');
  const [date, setDate] = useState({});
  const [locPermission, setLocPermission] = useState(false);
  const [locLoading, setLocLoading] = useState(true);
  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true, // default false
    },
    false /* optional: default undefined */,
  );

  const storage = new MMKV();

  useEffect(() => {
    fetch('https://razvitalimat.herokuapp.com/api/content')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // console.log(data);

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
  const [lagitude, setLagitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const onTextLayout = useCallback(e => {
    setShowMore(e.nativeEvent.lines.length > NUM_OF_LINES);
  }, []);

  var locationPermission = hasPermission();
  locationPermission.then(res => {
    if (res) {
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
        { enableHighAccuracy: true, timeout: 500000, maximumAge: 10000 },
      );
    }
  });

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

  // console.log(prayerTimes);

  return (
    <View style={styles.container}>
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
              <ImageOverlay
                overlayAlpha={
                  prayerLoading || Object.keys(prayerTimes).length < 9
                    ? 0.2
                    : new Date('2022-04-26T15:50:39+05:30').getTime() >=
                      new Date(
                        moment()
                          .set('hour', prayerTimes.Maghrib.hr)
                          .set('minute', prayerTimes.Maghrib.min)
                          .set('second', 0)
                          .set('millisecond', 0),
                      ).getTime() ||
                      new Date('2022-04-26T15:50:39+05:30').getTime() <
                      new Date(
                        moment()
                          .set('hour', prayerTimes.Fajr.hr)
                          .set('minute', prayerTimes.Fajr.min)
                          .set('second', 0)
                          .set('millisecond', 0),
                      ).getTime()
                      ? 0.25
                      : 0.45
                }
                style={styles.image}
                source={
                  prayerLoading || Object.keys(prayerTimes).length < 9
                    ? null
                    : new Date('2022-04-26T15:50:39+05:30').getTime() >=
                      new Date(
                        moment()
                          .set('hour', prayerTimes.Isha.hr)
                          .set('minute', prayerTimes.Isha.min)
                          .set('second', 0)
                          .set('millisecond', 0),
                      ).getTime() ||
                      new Date('2022-04-26T15:50:39+05:30').getTime() <
                      new Date(
                        moment()
                          .set('hour', prayerTimes.Fajr.hr)
                          .set('minute', prayerTimes.Fajr.min)
                          .set('second', 0)
                          .set('millisecond', 0),
                      ).getTime()
                      ? require('../../images/isha.png')
                      : new Date('2022-04-26T15:50:39+05:30').getTime() >=
                        new Date(
                          moment()
                            .set('hour', prayerTimes.Maghrib.hr)
                            .set('minute', prayerTimes.Maghrib.min)
                            .set('second', 0)
                            .set('millisecond', 0),
                        ).getTime()
                        ? require('../../images/maghrib.png')
                        : new Date('2022-04-26T15:50:39+05:30').getTime() >=
                          new Date(
                            moment()
                              .set('hour', prayerTimes.Asr.hr)
                              .set('minute', prayerTimes.Asr.min)
                              .set('second', 0)
                              .set('millisecond', 0),
                          ).getTime()
                          ? require('../../images/asr.png')
                          : new Date('2022-04-26T15:50:39+05:30').getTime() >=
                            new Date(
                              moment()
                                .set('hour', prayerTimes.Dhuhr.hr)
                                .set('minute', prayerTimes.Dhuhr.min)
                                .set('second', 0)
                                .set('millisecond', 0),
                            ).getTime()
                            ? require('../../images/dhuhr.png')
                            : new Date('2022-04-26T15:50:39+05:30').getTime() >=
                              new Date(
                                moment()
                                  .set('hour', prayerTimes.Fajr.hr)
                                  .set('minute', prayerTimes.Fajr.min)
                                  .set('second', 0)
                                  .set('millisecond', 0),
                              ).getTime()
                              ? require('../../images/fajr.png')
                              : null
                }>
                {/* <View style={{backgroundColor: 'pink'}}></View> */}
                <>
                  <View style={{ backgroundColor: 'pink' }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        fontSize: normalize(16),
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: -55,
                        marginBottom: -60,
                        // numberOfLines: 1,
                      }}>
                      Home
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          textAlign: 'left',
                          marginLeft: 5,
                          fontSize: normalize(12),
                          // color: '#023c54',
                          color: 'white',
                          fontWeight: '600',
                          marginTop: 5,
                        }}>
                        Now
                      </Text>
                      <Text
                        style={{
                          textAlign: 'left',
                          marginLeft: 5,
                          fontSize: normalize(18),
                          // color: '#023c54',
                          color: 'white',
                          fontWeight: '700',
                          marginTop: 3,
                        }}>
                        {prayerLoading || Object.keys(prayerTimes).length < 9
                          ? 'Loading...'
                          : new Date().getTime() >=
                            new Date(
                              moment()
                                .set('hour', prayerTimes.Isha.hr)
                                .set('minute', prayerTimes.Isha.min)
                                .set('second', 0)
                                .set('millisecond', 0),
                            ).getTime() ||
                            new Date().getTime() <
                            new Date(
                              moment()
                                .set('hour', prayerTimes.Fajr.hr)
                                .set('minute', prayerTimes.Fajr.min)
                                .set('second', 0)
                                .set('millisecond', 0),
                            ).getTime()
                            ? 'Isha'
                            : new Date().getTime() >=
                              new Date(
                                moment()
                                  .set('hour', prayerTimes.Maghrib.hr)
                                  .set('minute', prayerTimes.Maghrib.min)
                                  .set('second', 0)
                                  .set('millisecond', 0),
                              ).getTime()
                              ? 'Maghrib'
                              : new Date().getTime() >=
                                new Date(
                                  moment()
                                    .set('hour', prayerTimes.Asr.hr)
                                    .set('minute', prayerTimes.Asr.min)
                                    .set('second', 0)
                                    .set('millisecond', 0),
                                ).getTime()
                                ? 'Asr'
                                : new Date().getTime() >=
                                  new Date(
                                    moment()
                                      .set('hour', prayerTimes.Dhuhr.hr)
                                      .set('minute', prayerTimes.Dhuhr.min)
                                      .set('second', 0)
                                      .set('millisecond', 0),
                                  ).getTime()
                                  ? 'Dhuhr'
                                  : new Date().getTime() >=
                                    new Date(
                                      moment()
                                        .set('hour', prayerTimes.Sunrise.hr)
                                        .set('minute', prayerTimes.Sunrise.min)
                                        .set('second', 0)
                                        .set('millisecond', 0),
                                    ).getTime()
                                    ? 'Sunrise'
                                    : new Date().getTime() >=
                                      new Date(
                                        moment()
                                          .set('hour', prayerTimes.Fajr.hr)
                                          .set('minute', prayerTimes.Fajr.min)
                                          .set('second', 0)
                                          .set('millisecond', 0),
                                      ).getTime()
                                      ? 'Fajr'
                                      : null}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'left',
                          marginLeft: 5,
                          fontSize: normalize(12),
                          // color: '#023c54',
                          color: 'white',
                          fontWeight: '500',
                          marginTop: 10,
                        }}>
                        Upcoming
                      </Text>
                      <Text
                        style={{
                          textAlign: 'left',
                          marginLeft: 5,
                          fontSize: normalize(15),
                          // color: '#023c54',
                          color: 'white',
                          fontWeight: '700',
                          marginTop: 2,
                        }}>
                        {prayerLoading || Object.keys(prayerTimes).length < 9
                          ? 'Loading...'
                          : new Date().getTime() >=
                            new Date(
                              moment()
                                .set('hour', prayerTimes?.Isha?.hr)
                                .set('minute', prayerTimes?.Isha?.min),
                            ).getTime() ||
                            new Date().getTime() <
                            new Date(
                              moment()
                                .set('hour', prayerTimes?.Fajr?.hr)
                                .set('minute', prayerTimes?.Fajr?.min),
                            ).getTime()
                            ? 'Fajr'
                            : new Date().getTime() >=
                              new Date(
                                moment()
                                  .set('hour', prayerTimes?.Maghrib?.hr)
                                  .set('minute', prayerTimes?.Maghrib?.min),
                              ).getTime()
                              ? 'Isha'
                              : new Date().getTime() >=
                                new Date(
                                  moment()
                                    .set('hour', prayerTimes?.Asr?.hr)
                                    .set('minute', prayerTimes?.Asr?.min),
                                ).getTime()
                                ? 'Maghrib'
                                : new Date().getTime() >=
                                  new Date(
                                    moment()
                                      .set('hour', prayerTimes?.Dhuhr?.hr)
                                      .set('minute', prayerTimes?.Dhuhr?.min),
                                  ).getTime()
                                  ? 'Asr'
                                  : new Date().getTime() >=
                                    new Date(
                                      moment()
                                        .set('hour', prayerTimes?.Fajr.hr)
                                        .set('minute', prayerTimes?.Fajr.min),
                                    ).getTime()
                                    ? 'Dhuhr'
                                    : new Date().getTime() >=
                                      new Date(
                                        moment()
                                          .set('hour', prayerTimes.Sunrise.hr)
                                          .set('minute', prayerTimes.Sunrise.min)
                                          .set('second', 0)
                                          .set('millisecond', 0),
                                      ).getTime()
                                      ? 'Sunrise'
                                      : null}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'left',
                          marginLeft: 5,
                          fontSize: normalize(12),
                          // color: '#023c54',
                          color: 'white',
                          fontWeight: '500',
                          marginTop: 2,
                        }}>
                        {prayerLoading || Object.keys(prayerTimes).length < 9
                          ? 'Loading...'
                          : new Date().getTime() >=
                            new Date(
                              moment()
                                .set('hour', prayerTimes?.Isha?.hr)
                                .set('minute', prayerTimes?.Isha?.min),
                            ).getTime() ||
                            new Date().getTime() <
                            new Date(
                              moment()
                                .set('hour', prayerTimes?.Fajr?.hr)
                                .set('minute', prayerTimes?.Fajr?.min),
                            ).getTime()
                            ? moment()
                              .set('hour', prayerTimes?.Fajr?.hr)
                              .set('minute', prayerTimes?.Fajr?.min)
                              .format('h:mm A')
                            : new Date().getTime() >=
                              new Date(
                                moment()
                                  .set('hour', prayerTimes?.Maghrib?.hr)
                                  .set('minute', prayerTimes?.Maghrib?.min),
                              ).getTime()
                              ? moment()
                                .set('hour', prayerTimes?.Isha?.hr)
                                .set('minute', prayerTimes?.Isha?.min)
                                .format('h:mm A')
                              : new Date().getTime() >=
                                new Date(
                                  moment()
                                    .set('hour', prayerTimes?.Asr?.hr)
                                    .set('minute', prayerTimes?.Asr?.min),
                                ).getTime()
                                ? moment()
                                  .set('hour', prayerTimes?.Maghrib?.hr)
                                  .set('minute', prayerTimes?.Maghrib?.min)
                                  .format('h:mm A')
                                : new Date().getTime() >=
                                  new Date(
                                    moment()
                                      .set('hour', prayerTimes?.Dhuhr?.hr)
                                      .set('minute', prayerTimes?.Dhuhr?.min),
                                  ).getTime()
                                  ? moment()
                                    .set('hour', prayerTimes?.Asr?.hr)
                                    .set('minute', prayerTimes?.Asr?.min)
                                    .format('h:mm A')
                                  : new Date().getTime() >=
                                    new Date(
                                      moment()
                                        .set('hour', prayerTimes.Sunrise.hr)
                                        .set('minute', prayerTimes.Sunrise.min)
                                        .set('second', 0)
                                        .set('millisecond', 0),
                                    ).getTime()
                                    ? moment()
                                      .set('hour', prayerTimes?.Dhuhr?.hr)
                                      .set('minute', prayerTimes?.Dhuhr?.min)
                                      .format('h:mm A')
                                    : new Date().getTime() >=
                                      new Date(
                                        moment()
                                          .set('hour', prayerTimes?.Fajr.hr)
                                          .set('minute', prayerTimes?.Fajr.min),
                                      ).getTime()
                                      ? moment()
                                        .set('hour', prayerTimes?.Sunrise?.hr)
                                        .set('minute', prayerTimes?.Sunrise?.min)
                                        .format('h:mm A')
                                      : null}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '70%',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                      }}>
                      <FontAwesome
                        name="moon-o"
                        size={normalize(30)}
                        color="white"
                        style={{
                          marginRight: 25,
                          marginTop: -0,
                        }}
                      />
                      <Text
                        style={{
                          // marginLeft: 330,
                          fontSize: normalize(28),
                          marginRight: 0,
                          fontWeight: '900',
                          color: 'white',
                          marginTop: 5,
                        }}>
                        {date?.hijri?.day}
                      </Text>
                      <Text
                        style={{
                          // marginLeft: 210,
                          marginRight: 0,
                          fontSize: normalize(13),
                          // fontWeight: '500',
                          color: 'white',
                          marginTop: 5,
                        }}>
                        {date?.hijri?.month.en}, {date?.hijri?.year}
                      </Text>
                      <Text
                        style={{
                          // marginLeft: 270,
                          marginRight: 0,
                          fontSize: normalize(13),
                          // fontWeight: '500',
                          color: 'white',
                          marginTop: 0,
                        }}>
                        {moment(date?.gregorian?.date, 'DD-MM-YYYY').format(
                          'D MMM, ddd, YY',
                        )}
                      </Text>
                    </View>
                  </View>
                </>
              </ImageOverlay>
            )}
            <View>
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
                  borderRadius: 20,
                  // borderWidth: 2
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    margin: 10,
                    textAlign: 'center',
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
                    marginTop: -45,
                  }}
                  source={require('../../images/article.jpg')}
                />
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                backgroundColor: 'white',
                height: 50,
                width: windowWidth / 1.2,
                marginLeft: 20,
                marginRight: 20,
                alignSelf: 'center',
                marginTop: 10,
                borderColor: 'black',
                borderRadius: 20,
                // borderWidth: 2
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  margin: 10,
                  textAlign: 'center',
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
                  marginTop: -45,
                }}
                source={require('../../images/article.jpg')}
              />
            </View>
          </View>
        )}

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

        <View style={{ flex: 1, padding: 2 }}>
          {isLoading || (locPermission && prayerLoading) || locLoading ? (
            <OrientationLoadingOverlay
              visible={true}
              color="white"
              indicatorSize="large"
              messageFontSize={24}
            // message="Loading... 😀😀😀"
            />
          ) : (
            <View>
              <View style={{
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
                borderRadius: 20,
              }}>
                <Text style={{
                  fontSize: normalize(18),
                  fontWeight: '600',
                  color: 'black',
                  marginLeft: 10,
                  marginTop: 10,
                }}>Verses</Text>
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontWeight: '400',
                    color: 'blue',
                    marginLeft: 10,
                    // flexWrap: 'wrap',
                  }}>
                  by cool & cool
                </Text>
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontWeight: '400',
                    color: 'black',
                    marginLeft: 10,
                    // flexWrap: 'wrap',
                  }}>
                  surat-un-nissa[4-60]
                </Text>
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontWeight: '400',
                    color: 'black',
                    marginLeft: 10,
                    marginTop: 10,
                    paddingHorizontal: normalize(10),
                    paddingVertical: normalize(10)
                    // flexWrap: 'wrap',
                  }}>
                  وَءَاتُوا۟ ٱلْيَتَـٰمَىٰٓ أَمْوَٰلَهُمْ ۖ وَلَا تَتَبَدَّلُوا۟ ٱلْخَبِيثَ بِٱلطَّيِّبِ ۖ وَلَا تَأْكُلُوٓا۟ أَمْوَٰلَهُمْ إِلَىٰٓ أَمْوَٰلِكُمْ ۚ إِنَّهُۥ كَانَ حُوبًا كَبِيرًا
                </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  image: {
    marginTop: 0,
    height: windowHeight / 2.9,
    width: windowWidth / 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: normalize(10),
    // borderBottomLeftRadius: 30,
    backgroundColor: '#00000050',
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
