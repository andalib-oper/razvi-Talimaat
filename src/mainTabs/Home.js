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
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const NUM_OF_LINES = 4;
import Geolocation from '@react-native-community/geolocation';
import {PacmanIndicator} from 'react-native-indicators';
import moment from 'moment';

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

const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [prayerLoading, setPrayerLoading] = useState(true);
  const [data, setData] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const [city, setCity] = useState('');

  useEffect(() => {
    fetch('https://razvitalimat.herokuapp.com/api/content')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

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

  Geolocation.getCurrentPosition(data => {
    console.log(data);
    setLagitude(data.coords.latitude);
    setLongitude(data.coords.longitude);
  });

  // console.log(info);
  // console.log(time);
  // console.log('lagitude', lagitude);
  // console.log('longitude', longitude);

  const lati = lagitude;
  const logi = longitude;

  // function getCity(lati, logi) {
  const xhr = new XMLHttpRequest();

  console.log(lagitude, logi);
  // Paste your LocationIQ token below.
  xhr.open(
    'GET',
    'https://us1.locationiq.com/v1/reverse.php?key=pk.6644ad4fb87f8a59e24b45827864b079&lat=' +
      lati +
      '&lon=' +
      logi +
      '&format=json',
    true,
    22,
  );
  xhr.send();
  xhr.onreadystatechange = e => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      setCity(response.address.city);
      return;
    }
  };
  xhr.addEventListener(
    'readystatechange',
    e => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        setCity(response.address.city);
        return;
      }
    },
    false,
  );
  // useEffect(() => {
  // }, []);

  useEffect(() => {
    console.log(city || 'not');
    if (city) {
      console.log('INN');
      fetch(
        `http://api.aladhan.com/v1/calendarByCity?city=${city}&country=India&method=1&school=1&month=${
          new Date().getMonth() + 1
        }&year=${new Date().getFullYear()}`,
      )
        .then(response => response.json())
        .then(res => {
          var resp = res.data.filter(
            dat => dat.date.gregorian.date === moment().format('DD-MM-YYYY'),
          )[0].timings;
          Object.keys(resp).forEach(
            key =>
              (resp[key] = {
                hr: resp[key].split(' ')[0].split(':')[0],
                min: resp[key].split(' ')[0].split(':')[1],
              }),
          );
          setPrayerTimes(resp);
        })
        .catch(error => console.error(error))
        .finally(() => setPrayerLoading(false));
    }
  }, [city]);

  console.log('time', prayerTimes, prayerLoading);
  //   .set('hour', prayerTimes.Isha.split(':')[0])
  //   .set('minute', prayerTimes.Isha.split(':')[1].split(' ')[0]);

  // console.log(
  //   new Date(
  //     moment().get('year'),
  //     moment().get('month') + 1,
  //     moment().get('date'),
  //     prayerTimes.Isha.split(':')[0],
  //     prayerTimes.Isha.split(':')[1].split(' ')[0],
  //   ),
  // );

  // console.log(
  //   new Date(`${moment().format('DD-MM-YYYY')}, ${prayerTimes.Isha}`).getTime(),
  // );

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.topContainer}>
          <ImageBackground
            style={styles.image}
            source={
              prayerLoading || Object.keys(prayerTimes).length < 9
                ? null
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
                ? require('../../images/isha.png')
                : new Date().getTime() >=
                  new Date(
                    moment()
                      .set('hour', prayerTimes.Maghrib.hr)
                      .set('minute', prayerTimes.Maghrib.min)
                      .set('second', 0)
                      .set('millisecond', 0),
                  ).getTime()
                ? require('../../images/maghrib.png')
                : new Date().getTime() >=
                  new Date(
                    moment()
                      .set('hour', prayerTimes.Asr.hr)
                      .set('minute', prayerTimes.Asr.min)
                      .set('second', 0)
                      .set('millisecond', 0),
                  ).getTime()
                ? require('../../images/asr.png')
                : new Date().getTime() >=
                  new Date(
                    moment()
                      .set('hour', prayerTimes.Dhuhr.hr)
                      .set('minute', prayerTimes.Dhuhr.min)
                      .set('second', 0)
                      .set('millisecond', 0),
                  ).getTime()
                ? require('../../images/dhuhr.png')
                : new Date().getTime() >=
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
            <View style={{backgroundColor: 'pink'}}>
              <Text
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontSize: normalize(18),
                  color: 'white',
                  fontWeight: '600',
                  marginTop: -25,
                  marginBottom: -60,
                  // numberOfLines: 1,
                }}>
                Home
              </Text>
            </View>
            <View
              style={
                {
                  // backgroundColor: 'pink'
                }
              }>
              <Text
                style={{
                  textAlign: 'left',
                  marginLeft: 15,
                  fontSize: normalize(16),
                  // color: '#023c54',
                  color: 'white',
                  fontWeight: '600',
                  marginTop: 20,
                }}>
                Now
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  marginLeft: 15,
                  fontSize: normalize(20),
                  // color: '#023c54',
                  color: 'white',
                  fontWeight: '600',
                  marginTop: 5,
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
                  : new Date(
                      moment().set('second', 0).set('millisecond', 0),
                    ).getTime() ===
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
                  marginLeft: 15,
                  fontSize: normalize(14),
                  // color: '#023c54',
                  color: 'white',
                  fontWeight: '600',
                  marginTop: 5,
                }}>
                Upcoming
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  marginLeft: 15,
                  fontSize: normalize(20),
                  // color: '#023c54',
                  color: 'white',
                  fontWeight: '600',
                  marginTop: 5,
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
                  : null}
              </Text>
              <FontAwesome
                name="moon-o"
                size={normalize(30)}
                color="white"
                style={{
                  marginLeft: 315,
                  marginTop: -100,
                }}
              />
              <Text
                style={{
                  marginLeft: 330,
                  fontSize: normalize(16),
                  marginRight: 10,
                  fontWeight: '600',
                  color: 'white',
                  marginTop: 10,
                }}>
                3
              </Text>
              <Text
                style={{
                  marginLeft: 210,
                  marginRight: 10,
                  fontSize: normalize(16),
                  fontWeight: '600',
                  color: 'white',
                  marginTop: 5,
                }}>
                Ramadan, 1443
              </Text>
              <Text
                style={{
                  marginLeft: 270,
                  marginRight: 10,
                  fontSize: normalize(18),
                  fontWeight: '600',
                  color: 'white',
                  marginTop: 5,
                }}>
                Monday
              </Text>
            </View>
          </ImageBackground>
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
          {isLoading ? (
            <View style={{alignSelf: 'center', marginTop: 30}}>
              <PacmanIndicator color="blue" />
            </View>
          ) : (
            <View>
              {data.map(item => {
                return (
                  <View style={styles.umrah} key={item.number}>
                    <Image
                      style={{
                        height: 130,
                        width: 140,
                        borderRadius: 10,
                        margin: 10,
                      }}
                      source={{
                        uri: item.contentImg,
                      }}
                    />

                    <View
                      style={{
                        margin: 10,
                        height: 130,
                        width: windowWidth / 2.5,
                        marginTop: -140,
                        marginLeft: 160,
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
                        numberOfLines={NUM_OF_LINES}
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
    borderBottomLeftRadius: 30,
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
