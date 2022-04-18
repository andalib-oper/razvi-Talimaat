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

  const getHijriCalendar = async () => {
    try {
      const response = await fetch(
        'http://api.aladhan.com/v1/gToHCalendar/1/2022',
      );
      const json = await response.json();
      // console.log(json.data)
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(
        `http://api.aladhan.com/v1/gToH?date=${moment().format('D-MM-YYYY')}`,
      )
      .then(res => {
        // console.log(res);
        setCurrent_hijri_year(res.data.data.hijri.year);
      })
      .catch(err => console.log(err));
    // fetch(`http://api.aladhan.com/v1/gToH?date=18-04-2022`)
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res);
    //     setCurrent_hijri_year(res.data.hijri.year);
    //   })
      // .catch(err => console.log(err));
    for (var i = 1; i < 13; i++) {
      const newFunc = async () => {
        // console.log(i);
        try {
          var [res1,res2,res3] = await Promise.all(
            [
              `http://api.aladhan.com/v1/gToHCalendar/${i}/${
                new Date().getFullYear() - 1
              }`,
              `http://api.aladhan.com/v1/gToHCalendar/${i}/${new Date().getFullYear()}`,
              `http://api.aladhan.com/v1/gToHCalendar/${i}/${
                new Date().getFullYear() + 1
              }`,
            ].map(async url => {
              const resp = await fetch(url);
              return resp.json();
            }),
          );
          // console.log(res);
          setAll_years([...all_years, ...res1.data, ...res2.data, ...res3.data]);
        } catch (err) {
          console.log(err);
          // console.log(err2);
          // console.log(err3);
        }
      };
      newFunc();
    }

    var calendar = {};

    all_years.forEach(day => {
      var month = `${day.hijri.month.en}_${day.hijri.year}`;
      if (Object.keys(calendar).includes(month)) {
        calendar[month] = [...calendar[month], data];
      } else {
        calendar[month] = [day];
      }
    });
    // console.log(calendar);
    setCalendar(calendar);
    setLoading(false);
    // set
  }, []);

  useEffect(() => {
    console.log(Object.keys(calendar));
  }, [calendar]);

  // const getfeb = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://api.aladhan.com/v1/gToHCalendar/2/2022',
  //     );
  //     const json = await response.json();
  //     console.log(json.data);
  //     setFeb(json.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getfeb();
  // }, []);

  // const getmarch = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://api.aladhan.com/v1/gToHCalendar/3/2022',
  //     );
  //     const json = await response.json();
  //     console.log(json.data);
  //     setMarch(json.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getmarch();
  // }, []);

  // const getapril = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://api.aladhan.com/v1/gToHCalendar/4/2022',
  //     );
  //     const json = await response.json();
  //     console.log(json.data);
  //     setApril(json.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getapril();
  // }, []);

  // const getmay = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://api.aladhan.com/v1/gToHCalendar/5/2022',
  //     );
  //     const json = await response.json();
  //     console.log(json.data);
  //     setMay(json.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getmay();
  // }, []);

  // const getjune = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://api.aladhan.com/v1/gToHCalendar/6/2022',
  //     );
  //     const json = await response.json();
  //     console.log(json.data);
  //     setJune(json.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getjune();
  // }, []);

  // const getjuly = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://api.aladhan.com/v1/gToHCalendar/7/2022',
  //     );
  //     const json = await response.json();
  //     console.log(json.data);
  //     setJuly(json.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getjuly();
  // }, []);

  // const getaugust = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://api.aladhan.com/v1/gToHCalendar/8/2022',
  //     );
  //     const json = await response.json();
  //     console.log(json.data);
  //     setAugust(json.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getaugust();
  // }, []);

  // const getsept = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://api.aladhan.com/v1/gToHCalendar/9/2022',
  //     );
  //     const json = await response.json();
  //     console.log(json.data);
  //     setSept(json.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getsept();
  // }, []);

  // const getoct = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://api.aladhan.com/v1/gToHCalendar/10/2022',
  //     );
  //     const json = await response.json();
  //     console.log(json.data);
  //     setOct(json.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getoct();
  // }, []);

  // const getnov = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://api.aladhan.com/v1/gToHCalendar/11/2022',
  //     );
  //     const json = await response.json();
  //     console.log(json.data);
  //     setNov(json.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getnov();
  // }, []);

  // const getdec = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://api.aladhan.com/v1/gToHCalendar/12/2022',
  //     );
  //     const json = await response.json();
  //     console.log(json.data);
  //     setDec(json.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getdec();
  // }, []);
 var counter = 0
 var limit = 29
 var toggler = +1

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
        Object.keys(calendar).map(month=>{
          if(month.includes(current_hijri_year)){
            return(
            <View>
              <View>
                <Text>{month}</Text>
              </View>
              <View>
                <Text>Sun</Text>
                <Text>Mon</Text>
                <Text>Tue</Text>
                <Text>Wed</Text>
                <Text>Thu</Text>
                <Text>Fri</Text>
                <Text>Sat</Text>
              </View>
              <View>
                {[0,1,2,3,4].map(i=>{
                  counter = 0
                  limit += toggler
                  toggler *= -1
                  return(
                    <View>
                      {[0,1,2,3,4,5,6].map(j=>{
                        if (i == 0 && j >= weekdays[calendar[month][0]["gregorian"]["weekday"]['en']]){
                          counter++
                          return(
                            <View>
                              <Text>
                                {calendar[month][counter-1]['hijri']
                                  ['day']}
                              </Text>
                            </View>
                          )
                        }
                        else if (i == 0 || counter >= limit)
                        return(
                          <View>
                            <Text>

                            </Text>
                          </View>
                        )
                        else{
                          counter++
                          return(
                            <View>
                              <Text>{calendar[month][counter-1]['hijri']['day']}</Text>
                            </View>
                          )
                        }
                      })}
                      </View>
                  )
                })}
              </View>
            </View>
            )
          }
        })
        // <ScrollView scrollEventThrottle={false}>
        //   {/* JANUARY */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //       shadowColor: '#000',
        //       shadowOffset: {
        //         width: 0,
        //         height: 3,
        //       },
        //       shadowOpacity: 0.27,
        //       shadowRadius: 4.65,
        //       // marginRight: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       January{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 150,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView scrollEventThrottle={false}>
        //       {data.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 // alignSelf: 'flex-end',
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: 'black',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //                 // alignSelf: 'flex-start',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //                 // alignSelf: 'center'
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        //   {/* FEBRUARY */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //       // marginRight: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       February{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 150,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView scrollEventThrottle={false}>
        //       {feb.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: 'black',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        //   {/* MARCH */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       March{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 170,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView>
        //       {march.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: '#090979',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        //   {/* APRIL */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       April{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 170,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView>
        //       {april.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: '#090979',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        //   {/* MAY */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       May{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 170,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView>
        //       {may.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: '#090979',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        //   {/* JUNE */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       June{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 170,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView>
        //       {june.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: '#090979',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        //   {/* JULY */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       July{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 170,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView>
        //       {july.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: '#090979',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        //   {/* AUGUST */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       August{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 170,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView>
        //       {august.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: '#090979',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        //   {/* SEPTEMBER */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       September{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 170,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView>
        //       {sept.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: '#090979',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        //   {/* OCTOBER */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       October{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 170,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView>
        //       {oct.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: '#090979',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        //   {/* NOVEMBER */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       November{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 170,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView>
        //       {nov.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: '#090979',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        //   {/* DECEMBER */}
        //   <View
        //     style={{
        //       margin: 10,
        //       backgroundColor: 'white',
        //       width: windowWidth / 1.1,
        //       alignSelf: 'center',
        //       borderRadius: 30,
        //       elevation: 10,
        //     }}>
        //     <Text
        //       style={{
        //         alignSelf: 'center',
        //         marginTop: 10,
        //         fontSize: normalize(20),
        //         fontWeight: '600',
        //         color: '#090979',
        //       }}>
        //       December{' '}
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 10,
        //         marginTop: 20,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       WeekDays
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 170,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Date
        //     </Text>
        //     <Text
        //       style={{
        //         textAlign: 'left',
        //         marginLeft: 260,
        //         marginTop: -22,
        //         fontSize: normalize(14),
        //         color: '#4b7bf2',
        //       }}>
        //       Islamic Year
        //     </Text>
        //     <ScrollView>
        //       {dec.map(item => {
        //         return (
        //           <View>
        //             <Text
        //               style={{
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginTop: 20,
        //                 marginRight: 10,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.month.ar}
        //             </Text>
        //             <View
        //               style={{
        //                 borderWidth: 1,
        //                 borderColor: '#090979',
        //                 width: 360,
        //                 marginLeft: 15,
        //                 // marginTop: 10,
        //               }}></View>
        //             <Text
        //               style={{
        //                 marginTop: -25,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 10,
        //                 color: 'black',
        //               }}>
        //               {item.gregorian.weekday.en}
        //             </Text>
        //             <Text
        //               style={{
        //                 marginTop: -43,
        //                 fontSize: normalize(14),
        //                 fontWeight: '600',
        //                 marginBottom: 20,
        //                 marginLeft: 130,
        //                 color: 'black',
        //               }}>
        //               {item.hijri.date}
        //             </Text>
        //           </View>
        //         );
        //       })}
        //     </ScrollView>
        //   </View>
        // </ScrollView>
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
