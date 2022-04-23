import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Platform,
  PixelRatio,
  Pressable,
  FlatList,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SkypeIndicator} from 'react-native-indicators';
import axios from 'axios';

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

const Ramzan = ({navigation}) => {
  const [modalVisible, setModelVisible] = useState(false);
  const [all_years, setAll_years] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState([]);
  const weekdays = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  useEffect(() => {
    axios
      .get('https://protected-tundra-18400.herokuapp.com/api/hijriCalendar')
      .then(res => {
        setAll_years(res.data.map(item => item.days));
        if (res.data.length > 11) setLoading(false);
      })
      .catch(err => console.log(err));
    // init_func();
  }, []);

  const init_func = async () => {};
  console.log(all_years);
  return (
    <View style={styles.container}>
      <View style={styles.topnav}>
        <Text style={styles.topnavtext}>Calendar</Text>
      </View>
      {isLoading ? (
        <View style={{alignSelf: 'center', marginTop: 70}}>
          <SkypeIndicator color="blue" />
        </View>
      ) : err.length > 0 ? (
        <View>
          <Text>Error</Text>
        </View>
      ) : (
        <ScrollView>
          {all_years.map(month => {
            var counter = 0;
            // const currentMonth = all_years.filter(day => {
            //   // console.log(day);
            //   return day?.gregorian?.month?.en === month;
            // });
            // console.log(currentMonth);
            var limit = month.length;
            return (
              <View key={month} style={styles.monthContainer}>
                <View
                  style={{
                    marginBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{...styles.monthContainerText, fontWeight: '700'}}>
                    {month[0].gregorian.month.en}{' '}
                  </Text>
                  <Text
                    style={{
                      ...styles.monthContainerText,
                      fontSize: normalize(14),
                      width: '50%',
                      fontWeight: '900',
                    }}>
                    {month?.[0]?.hijri?.month?.number ===
                    month?.[month?.length - 1]?.hijri?.month?.number
                      ? month?.[0]?.hijri?.month?.en
                      : `(${month?.[0]?.hijri?.month?.en}/${
                          month?.[month?.length - 1]?.hijri?.month?.en
                        }), ${month?.[0]?.hijri?.year}`}
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.weekRow,
                    backgroundColor: '#ffffff',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                      color: '#444',
                      fontWeight: 'bold',
                    }}>
                    Sun
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                      color: '#444',
                      fontWeight: 'bold',
                    }}>
                    Mon
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                      color: '#444',
                      fontWeight: 'bold',
                    }}>
                    Tue
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                      color: '#444',
                      fontWeight: 'bold',
                    }}>
                    Wed
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                      color: '#444',
                      fontWeight: 'bold',
                    }}>
                    Thu
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                      color: '#444',
                      fontWeight: 'bold',
                    }}>
                    Fri
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                      color: '#444',
                      fontWeight: 'bold',
                    }}>
                    Sat
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topnav: {
    height: 60,
    width: windowWidth / 1,
    backgroundColor: '#4b7bf2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topnavtext: {
    // marginTop: -35,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: normalize(22),
    color: 'white',
  },
  icon: {
    marginLeft: 20,
    marginTop: 15,
  },
  monthContainer: {
    padding: 20,
  },
  monthContainerText: {
    fontSize: normalize(18),
    color: '#333',
  },
  weekRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    // backgroundColor: 'blue'
  },
  weekText: {
    width: `${100 / 7}%`,
    height: 50,
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: '#333',
  },
  weekText2: {
    textAlign: 'center',
    fontSize: normalize(14),
    color: '#333',
  },
  weekTextHijri: {
    fontSize: normalize('12'),
    color: '#CC5500',
    textAlign: 'right',
  },
  umrah: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 450,
    width: 390,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default Ramzan;
