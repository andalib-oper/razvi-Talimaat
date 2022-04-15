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
  Platform, PixelRatio,
  ToastAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const NUM_OF_LINES = 4;
import Geolocation from '@react-native-community/geolocation';
import {
  PacmanIndicator,
} from 'react-native-indicators';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scale = windowWidth / 320;

 function normalize(size) {
 
  const newSize = size * scale 
 
 if (Platform.OS === 'ios' && 'android') {
 
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
 
  } else {
 
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
 
  }
 
}

// Geolocation.setRNConfiguration(config);
const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [info, setInfo] = useState(0);
  const [prayersTime, setPrayersTime] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  //   console.log(data);

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

  const [focused, setFocused] = useState('');

  const [showMore, setShowMore] = useState(false);
  const [time, setTime] = useState(0);
  const [lagitude, setLagitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const onTextLayout = useCallback(e => {
    setShowMore(e.nativeEvent.lines.length > NUM_OF_LINES);
  }, []);

  Geolocation.getCurrentPosition(data => {
    setLagitude(data.coords.latitude);
    setLongitude(data.coords.longitude);
    console.log(data);
    // setInfo(data)
  });

  // // console.log(info);
  // // console.log(time);
  // console.log('lagitude', lagitude);
  // console.log('longitude', longitude);

  const lat = lagitude;
  const log = longitude;
  useEffect(() => {
    fetch(
      `https://api.pray.zone/v2/times/today.json?longitude=${log}&latitude=${lat}&elevation=333`,
    )
      .then(response => response.json())
      .then(json => setPrayersTime(json.results.datetime))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  console.log('object', prayersTime);
  // console.log(lat)

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
        // style={styles.topContainer}
        >
          <ImageBackground
            style={styles.image}
            source={require('../../images/background3.jpeg')}>
            <View style={{backgroundColor: 'grey'}}>
              <Text
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontSize: normalize(18),
                  color: 'white',
                  fontWeight: '600',
                  marginTop: -50,
                  marginBottom: -60,
                  numberOfLines: 1,
                }}>
                Home
              </Text>
            </View>
            {/* {prayersTime.map(item => { */}
            {/* return ( */}
            {/* <View> */}
            <View style={{
              // backgroundColor: 'pink'
              }}>
                <View style={{
                  // backgroundColor: 'black'
                }}>
              <Text
                style={{
                  textAlign: 'left',
                  marginLeft: 10,
                  fontSize: normalize(16),
                  // color: '#023c54',
                  color: 'white',
                  fontWeight: '600',
                  marginTop: 20,
                }}>
                Now
              </Text>
                </View>
              <Text
                style={{
                  textAlign: 'left',
                  marginLeft: 10,
                  fontSize: normalize(20),
                  // color: '#023c54',
                  color: 'white',
                  fontWeight: '600',
                  marginTop: 5,
                }}>
                ISHA
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  marginLeft: 10,
                  fontSize: normalize(14),
                  // color: '#023c54',
                  color: 'white',
                  fontWeight: '600',
                  marginTop: 5,
                }}>
                Upcoming
              </Text>
              <View>
                <FontAwesome
                  name="moon-o"
                  size={30}
                  color="white"
                  style={{
                    marginLeft: 330,
                    marginTop: -100,
                  }}
                />
              </View>
              <Text
                style={{
                  marginLeft: 340,
                  fontSize: normalize(16),
                  marginRight: 10,
                  fontWeight: '600',
                  color: 'white',
                  marginTop: -70,
                }}>
                3
              </Text>
              <Text
                style={{
                  marginLeft: 225,
                  marginRight: 10,
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'white',
                  marginTop: 10,
                }}>
                Ramadan, 1443
              </Text>
              <Text
                style={{
                  marginLeft: 285,
                  marginRight: 10,
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'white',
                  marginTop: 5,
                }}>
                Monday
              </Text>
            </View>
            {/* </View> */}
            {/* ); */}
            {/* })} */}
          </ImageBackground>
        </View>
        <View style={styles.topbar}>
          <FontAwesome5
            name="quran"
            size={30}
            color={focused ? 'black' : '#808080'}
            style={styles.iconQuran}
            onPress={() => navigation.navigate('quran')}
          />
          <FontAwesome5
            name="calendar-alt"
            size={30}
            color={focused ? 'black' : '#808080'}
            style={styles.iconCalendar}
            onPress={() => navigation.navigate('calendar')}
          />
          <FontAwesome5
            name="clock"
            size={30}
            color={focused ? 'black' : '#808080'}
            style={styles.iconRamzan}
            onPress={() => navigation.navigate('ramzan')}
          />
        </View>
        <View style={styles.verses}>
          <Text style={styles.verseheader}> Verse</Text>
          <Text style={styles.verseby}> By Cool & Cool</Text>
          <Text style={styles.versesurat}> Surat-us-Saaffaat</Text>
          <Text style={styles.ayat}> رَبِّ هَبْ لِى مِنَ ٱلصَّـٰلِحِينَ</Text>
          <Text style={styles.translate}>
            My Lord, grant me [a child] from among the righteous.
          </Text>
        </View>
        {prayersTime.map(item => {
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
        })}

        <View style={{flex: 1, padding: 2}}>
          {isLoading ? (
            <View style={{alignSelf: 'center', marginTop: 30,}}>
            <PacmanIndicator color='blue'/>
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
                        width: 215,
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
    backgroundColor: '#035173',
    // height: 200,
    width: windowWidth / 0.5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  image: {
    marginTop: 0,
    height: windowHeight / 2.6,
    width: windowWidth / 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomLeftRadius: 30,
  },
  topbar: {
    // backgroundColor: 'pink',
    height: 50,
    width:  windowWidth /1,
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
    elevation: 20,
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
