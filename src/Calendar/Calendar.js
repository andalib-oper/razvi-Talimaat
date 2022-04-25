import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  PixelRatio,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import {SkypeIndicator} from 'react-native-indicators';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MMKV} from 'react-native-mmkv';
import moment from 'moment';

// global.Symbol = require('core-js/es/symbol');
// require('core-js/features/symbol/iterator');
// require('core-js/features/map');
// require('core-js/features/set');
// require('core-js/features/array/find');

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

const CalendarScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [all_years, setAll_years] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const weekdays = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const storage = new MMKV();

  useEffect(() => {
    init_func();
  }, []);

  const clear_all = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(err);
    }
  };

  const init_func = async () => {
    clear_all();
    const calendar_data = storage.contains('calendar')
      ? JSON.parse(storage.getString('calendar'))
      : [];
    if (calendar_data[0]?.gregorian.year !== moment().format('YYYY')) {
      axios
        .get('https://protected-tundra-18400.herokuapp.com/api/hijriCalendar')
        .then(async res => {
          const processed_data = res.data.map(item => item.days).flat();
          setAll_years(processed_data);
          storage.set('calendar', JSON.stringify(processed_data));
          if (res.data.length > 11) setLoading(false);
        })
        .catch(err => console.log(err));
    } else {
      setAll_years(calendar_data);
      setLoading(false);
    }
  };

  // const init_func = async () => {
  //   await Promise.all(
  //     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(async num => {
  //       const res = await fetch(
  //         `http://api.aladhan.com/v1/gToHCalendar/${num}/${new Date().getFullYear()}`,
  //       );
  //       return res.json();
  //     }),
  //   )
  //     .then(res => {
  //       res.forEach(el => {
  //         setAll_years(prev => [...prev, ...el.data]);
  //       });
  //       if (res.length >= 12) setLoading(false);
  //     })
  //     .catch(err => console.log(err));
  // };

  return (
    <View style={styles.container}>
      <View style={styles.topnav}>
        {/* <MaterialIcons name="arrow-back"
                    size={30}
                    color='white'
                    style={styles.icon}
                    onPress={() => navigation.goBack()} /> */}
        <Text style={styles.topnavtext}>Calendar</Text>
      </View>
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
          {[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ].map(month => {
            var counter = 0;
            const currentMonth = all_years.filter(
              day => day.gregorian.month.en === month,
            );
            var limit = currentMonth.length;
            // console.log(month, currentMonth);
            // if (month.includes(current_hijri_year)) {
            return (
              <View key={month} style={styles.monthContainer}>
                {/* {month} */}
                <View
                  style={{
                    marginBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{...styles.monthContainerText, fontWeight: '700'}}>
                    {month}{' '}
                  </Text>
                  <Text
                    style={{
                      ...styles.monthContainerText,
                      fontSize: normalize(14),
                      width: '50%',
                      fontWeight: '900',
                      color: '#CC5500',
                    }}>
                    {currentMonth?.[0]?.hijri?.month?.number ===
                    currentMonth?.[currentMonth?.length - 1]?.hijri?.month
                      ?.number
                      ? `${currentMonth?.[0]?.hijri?.month?.en}, ${currentMonth?.[0]?.hijri?.year}`
                      : `(${currentMonth?.[0]?.hijri?.month?.en}/${
                          currentMonth?.[currentMonth?.length - 1]?.hijri?.month
                            ?.en
                        }), ${currentMonth?.[0]?.hijri?.year}`}
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
                <View>
                  {[0, 1, 2, 3, 4, 5].map(i => {
                    // toggler *= -1;
                    return (
                      <View key={Math.random() * 1000} style={styles.weekRow}>
                        {[0, 1, 2, 3, 4, 5, 6].map(j => {
                          if (
                            i === 0 &&
                            j >=
                              weekdays[
                                currentMonth?.[0]?.['gregorian']?.['weekday']?.[
                                  'en'
                                ]
                              ]
                          ) {
                            // counter += 1;
                            return (
                              <View
                                key={Math.random() * 1000}
                                style={styles.weekText}>
                                <Text style={styles.weekText2}>
                                  {
                                    currentMonth?.[counter]?.['gregorian']?.[
                                      'day'
                                    ]
                                  }
                                </Text>
                                <Text style={styles.weekTextHijri}>
                                  {
                                    currentMonth?.[counter++]?.['hijri']?.[
                                      'day'
                                    ]
                                  }
                                </Text>
                              </View>
                            );
                          } else if (i === 5 && counter >= limit) {
                            // console.log(counter);
                            return null;
                          } else if (i === 0 || counter >= limit) {
                            return (
                              <View
                                key={Math.random() * 1000}
                                style={styles.weekText}>
                                <Text style={styles.weekText2} />
                              </View>
                            );
                          } else {
                            // counter += 1;
                            return (
                              <View
                                key={Math.random() * 1000}
                                style={styles.weekText}>
                                <Text style={styles.weekText2}>
                                  {
                                    currentMonth?.[counter]?.['gregorian']?.[
                                      'day'
                                    ]
                                  }
                                </Text>
                                <Text style={styles.weekTextHijri}>
                                  {
                                    currentMonth?.[counter++]?.['hijri']?.[
                                      'day'
                                    ]
                                  }
                                </Text>
                              </View>
                            );
                          }
                        })}
                      </View>
                    );
                  })}
                </View>
              </View>
            );
            // }
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

export default CalendarScreen;
