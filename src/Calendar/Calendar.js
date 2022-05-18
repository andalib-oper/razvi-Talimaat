import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  PixelRatio,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { SkypeIndicator } from 'react-native-indicators';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKV } from 'react-native-mmkv';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

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

const CalendarScreen = ({ navigation }) => {
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
  const [monthIndex, setMonthIndex] = useState(0);
  const months = [
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
  ];
  const [currentMonth, setCurrentMonth] = useState([]);
  const [selected, setSelected] = useState();
  const [currentDate, setCurrentDate] = useState('');

  // const onDayPress = (day => {
  //   setSelected(day.dateString);
  // }, []);

  // useEffect(() => {
  //   var date = moment().format('DD-MM-YYYY');
  //   setCurrentDate(date);
  // }, []);

  const storage = new MMKV();

  useEffect(() => {
    const calendar_data = storage.contains('calendar')
      ? JSON.parse(storage.getString('calendar'))
      : [];
    if (calendar_data[0]?.gregorian.year !== moment().format('YYYY')) {
      axios
        .get('https://protected-tundra-18400.herokuapp.com/api/hijriCalendar')
        .then(async res => {
          const processed_data = res.data.map(item => item.days).flat();
          setAll_years(processed_data);
          setCurrentDate(
            processed_data.filter(
              day => day.gregorian.date === moment().format('DD-MM-YYYY'),
            )[0],
          );
          storage.set('calendar', JSON.stringify(processed_data));
          setMonthIndex(
            moment().format('M') < 13 ? moment().format('M') - 1 : 0,
          );
          if (res.data.length > 11) setLoading(false);
        })
        .catch(err => console.log(err));
    } else {
      setAll_years(calendar_data);
      setCurrentDate(
        calendar_data.filter(
          day => day.gregorian.date === moment().format('DD-MM-YYYY'),
        )[0],
      );
      // setCurrentMonth(
      //   calendar_data.filter(
      //     day => day.gregorian.month.en === months[monthIndex],
      //   ),
      // );
      setMonthIndex(moment().format('M') < 13 ? moment().format('M') - 1 : 0);
      setLoading(false);
    }
  }, []);

  const monthChangeForward = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  };

  useEffect(() => {
    const local_calendar = storage.contains('calendar')
      ? JSON.parse(storage.getString('calendar'))
      : [];
    setCurrentMonth(
      local_calendar.filter(
        day => day.gregorian.month.en === months[monthIndex],
      ),
    );
  }, [monthIndex]);

  const monthChangeBackward = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  };

  var counter = 0;
  var limit = currentMonth?.length;
  return (
    <View style={styles.container}>
      {isLoading ? (
        <OrientationLoadingOverlay
          visible={true}
          color="white"
          indicatorSize="large"
          messageFontSize={24}
        />
      ) : (
        <ScrollView>
          <View
            style={{
              backgroundColor: '#c1eaf9',
              height: windowHeight / 1,
              // flex: 1,
            }}>
            <LinearGradient
              colors={[
                // '#0d7fb6',
                '#aa8f08',
                '#f4bf4d',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}>
              <View style={styles.topnav}>
                <Text style={styles.topnavtext}>Calendar</Text>
              </View>
              <View
                style={{
                  padding: 15,
                  paddingHorizontal: normalize(20),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // color: '#ffffff'
                  // backgroundColor: 'pink'
                }}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={24}
                  color="white"
                  // style={}
                  onPress={() => monthChangeBackward()}
                />
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
                  {currentMonth?.[0]?.hijri?.month?.number ===
                    currentMonth?.[currentMonth?.length - 1]?.hijri?.month?.number
                    ? `${currentMonth?.[0]?.hijri?.month?.en}, ${currentMonth?.[0]?.hijri?.year}`
                    : `(${currentMonth?.[0]?.hijri?.month?.en}/${currentMonth?.[currentMonth?.length - 1]?.hijri?.month
                      ?.en
                    }), ${currentMonth?.[0]?.hijri?.year}`}
                  {/* {moment().format('YYYY')} */}
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="white"
                  // style={}
                  onPress={() => monthChangeForward()}
                />
              </View>
              <View
                key={currentMonth[0]?.gregorian.month.en}
                style={styles.monthContainer}>
                {/* {month} */}
                <View
                  style={{
                    marginBottom: 20,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    // backgroundColor: 'yellow'
                  }}>
                  <Text
                    style={{ ...styles.monthContainerText, fontWeight: '700' }}>
                    {currentMonth[0]?.gregorian.month.en} {''}
                  </Text>
                  <Text
                    style={{
                      ...styles.monthContainerText,
                      // fontSize: normalize(14),
                      width: '20%',
                      fontWeight: '900',
                      color: '#fff',
                      alignSelf: 'center',
                      // backgroundColor: 'grey'
                    }}>
                    {moment().format('YYYY')}
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.weekRow1,
                    backgroundColor: '#ccc4a8',
                    borderRadius: 1,
                    paddingVertical: normalize(7),
                  }}>
                  <Text style={styles.weekDay}>Sun</Text>
                  <Text style={styles.weekDay}>Mon</Text>
                  <Text style={styles.weekDay}>Tue</Text>
                  <Text style={styles.weekDay}>Wed</Text>
                  <Text style={styles.weekDay}>Thu</Text>
                  <Text style={styles.weekDay}>Fri</Text>
                  <Text style={styles.weekDay}>Sat</Text>
                </View>
                <View>
                  {[0, 1, 2, 3, 4, 5].map(i => {
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
                            return (
                              <View
                                key={Math.random() * 1000}
                                style={
                                  currentMonth?.[counter]?.gregorian?.date ===
                                    moment().format('DD-MM-YYYY')
                                    ? styles.weekTextHighLight
                                    : styles.weekText
                                }>
                                <Text style={styles.weekText2}>
                                  {currentMonth?.[counter]?.['hijri']?.['day']}
                                </Text>

                                <Text style={styles.weekTextHijri}>
                                  {
                                    currentMonth?.[counter++]?.['gregorian']?.[
                                    'day'
                                    ]
                                  }
                                </Text>
                              </View>
                            );
                          } else if (i === 5 && counter >= limit) {
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
                            return (
                              <View
                                key={Math.random() * 1000}
                                style={
                                  currentMonth?.[counter]?.gregorian?.date ===
                                    moment().format('DD-MM-YYYY')
                                    ? styles.weekTextHighLight
                                    : styles.weekText
                                }>
                                <Text style={styles.weekText2}>
                                  {currentMonth?.[counter]?.['hijri']?.['day']}
                                </Text>
                                <Text style={styles.weekTextHijri}>
                                  {
                                    currentMonth?.[counter++]?.['gregorian']?.[
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
              <View
                style={{
                  backgroundColor: '#b5a772',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginTop: 25,
                  borderRadius: 10,
                  paddingVertical: normalize(10),
                  paddingHorizontal: normalize(15),
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(16),
                    fontWeight: '500',
                    width: '40%',
                  }}>
                  {`${currentDate.gregorian.day} ${currentDate.gregorian.month.en}, ${currentDate.gregorian.year}`}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: normalize(16),
                    fontWeight: '500',
                    width: '50%',
                  }}>
                  {`${currentDate.hijri.year} ${currentDate.hijri.month.ar} ${currentDate.hijri.day}`}
                </Text>
              </View>
            </LinearGradient>
          </View>
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
    // backgroundColor: '#4b7bf2',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginBottom: normalize(10),
  },
  topnavtext: {
    // marginTop: -35,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: 'bold',
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
    color: '#fff',
  },
  weekRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    // backgroundColor: 'grey',
    // borderWidth: 1,
    // borderColor: 'black'
  },
  weekRow1: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 0,
    marginBottom: 2,
    // backgroundColor: 'pink',
    // borderWidth: 1,
    // borderColor: 'black'
  },
  weekText: {
    width: `${100 / 7}%`,
    height: 50,
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: '600',
    color: '#fff',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  weekTextHighLight: {
    width: `${100 / 7}%`,
    height: 50,
    textAlign: 'center',
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: '#cbbf91',
    borderWidth: 1,
    borderTopWidth: 2,
    borderColor: '#000',
  },
  weekText2: {
    textAlign: 'center',
    fontSize: normalize(16),
    color: '#fff',
    fontWeight: '700',
  },
  weekTextHijri: {
    fontSize: normalize('12'),
    color: '#edebe6',
    textAlign: 'right',
    marginRight: 10,
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
  weekDay: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontSize: normalize(14),
    color: '#fff',
    fontWeight: 'bold',
    // backgroundColor: 'pink',
  },
});

export default CalendarScreen;
