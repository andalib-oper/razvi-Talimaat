import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
  FlatList,
  Modal,
  Dimensions,
  Platform,
  PixelRatio,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {PacmanIndicator} from 'react-native-indicators';
import axios from 'axios';
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

const CalendarScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [all_years, setAll_years] = useState([]);
  const [current_hijri_year, setCurrent_hijri_year] = useState(0);
  const weekdays = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const [calendar, setCalendar] = useState({});

  useEffect(() => {
    init_func();
  }, []);

  const init_func = async () => {
    await Promise.all(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(async num => {
        const res = await fetch(
          `http://api.aladhan.com/v1/gToHCalendar/${num}/${new Date().getFullYear()}`,
        );
        return res.json();
      }),
    )
      .then(res => {
        // console.log('big length', res.length);
        res.forEach(el => {
          // console.log(el.data.length);
          setAll_years(prev => [...prev, ...el.data]);
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    // console.log('length', all_years.length);
    if (all_years.length >= 365) {
      var calendar_mini = {};
      for (var i = 0; i < all_years.length; i++) {
        // console.log('data', all_years[i]['gregorian']['month']['en']);
        var month = `${all_years[i].gregorian.month.en}`;
        if (Object.keys(calendar_mini).includes(month)) {
          calendar_mini[month] = [...calendar_mini[month], all_years[i]];
        } else {
          calendar_mini[month] = [all_years[i]];
        }
      }

      // console.log('90', calendar_mini);

      if (Object.keys(calendar_mini).length === 12) {
        // console.log('93', Object.keys(calendar_mini));
        setCalendar(calendar_mini);
        setLoading(false);
      }
    }
  }, [all_years]);

  // console.log('cal', all_years);

  var counter = 0;
  var limit = 30;

  return (
    <View style={styles.container}>
      <View style={styles.topnav}>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="white"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.topnavtext}>Calendar</Text>
      </View>
      {isLoading ? (
        <View style={{alignSelf: 'center', marginTop: 70}}>
          <PacmanIndicator color="blue" />
        </View>
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
            counter = 0;
            limit = calendar[month].length;
            // if (month.includes(current_hijri_year)) {
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
                    {month}{' '}
                  </Text>
                  <Text
                    style={{
                      ...styles.monthContainerText,
                      fontSize: normalize(14),
                      width: '50%',
                      fontWeight: '900',
                    }}>
                    {calendar[month][0].hijri.month.number ===
                    calendar[month][calendar[month].length - 1].hijri.month
                      .number
                      ? calendar[month][0].hijri.month.en
                      : `(${calendar[month][0].hijri.month.en}/${
                          calendar[month][calendar[month].length - 1].hijri
                            .month.en
                        }), ${calendar[month][0].hijri.year}`}
                  </Text>
                </View>
                <View style={{...styles.weekRow, backgroundColor: '#ccc'}}>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                    }}>
                    Sun
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                    }}>
                    Mon
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                    }}>
                    Tue
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                    }}>
                    Wed
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                    }}>
                    Thu
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                    }}>
                    Fri
                  </Text>
                  <Text
                    style={{
                      width: `${100 / 7}%`,
                      textAlign: 'center',
                      fontSize: normalize(14),
                    }}>
                    Sat
                  </Text>
                </View>
                <View>
                  {[0, 1, 2, 3, 4].map(i => {
                    // toggler *= -1;
                    return (
                      <View key={Math.random() * 1000} style={styles.weekRow}>
                        {[0, 1, 2, 3, 4, 5, 6].map(j => {
                          if (
                            i === 0 &&
                            j >=
                              weekdays[calendar[month][0].gregorian.weekday.en]
                          ) {
                            counter += 1;
                            return (
                              <View
                                key={Math.random() * 1000}
                                style={styles.weekText}>
                                <Text style={styles.weekText2}>
                                  {calendar[month][counter - 1].gregorian.day}
                                </Text>
                                <Text style={styles.weekTextHijri}>
                                  {calendar[month][counter - 1].hijri.day}
                                </Text>
                              </View>
                            );
                          } else if (i === 0 || counter >= limit) {
                            return (
                              <View
                                key={Math.random() * 1000}
                                style={styles.weekText}>
                                <Text style={styles.weekText2} />
                              </View>
                            );
                          } else {
                            counter += 1;
                            return (
                              <View
                                key={Math.random() * 1000}
                                style={styles.weekText}>
                                <Text style={styles.weekText2}>
                                  {calendar[month][counter - 1].gregorian.day}
                                </Text>
                                <Text style={styles.weekTextHijri}>
                                  {calendar[month][counter - 1].hijri.day}
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
    width: 412,
    backgroundColor: '#4b7bf2',
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

export default CalendarScreen;
