import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable,
  FlatList, Modal, Dimensions
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CalendarScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [feb, setFeb] = useState([]);
  const [march, setMarch] = useState([]);
  const [april, setApril] = useState([]);
  const [may, setMay] = useState([]);
  const [june, setJune] = useState([]);
  const [july, setJuly] = useState([]);
  const [august, setAugust] = useState([]);
  const [sept, setSept] = useState([]);
  const [oct, setOct] = useState([]);
  const [nov, setNov] = useState([]);
  const [dec, setDec] = useState([]);

  const getHijriCalendar = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/1/2022');
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
    getHijriCalendar();
  }, []);

  const getfeb = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/2/2022');
      const json = await response.json();
      console.log(json.data)
      setFeb(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getfeb();
  }, []);

  const getmarch = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/3/2022');
      const json = await response.json();
      console.log(json.data)
      setMarch(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getmarch();
  }, []);

  const getapril = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/4/2022');
      const json = await response.json();
      console.log(json.data)
      setApril(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getapril();
  }, []);

  const getmay = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/5/2022');
      const json = await response.json();
      console.log(json.data)
      setMay(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getmay();
  }, []);

  const getjune = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/6/2022');
      const json = await response.json();
      console.log(json.data)
      setJune(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getjune();
  }, []);

  const getjuly = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/7/2022');
      const json = await response.json();
      console.log(json.data)
      setJuly(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getjuly();
  }, []);

  const getaugust = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/8/2022');
      const json = await response.json();
      console.log(json.data)
      setAugust(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getaugust();
  }, []);

  const getsept = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/9/2022');
      const json = await response.json();
      console.log(json.data)
      setSept(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getsept();
  }, []);

  const getoct = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/10/2022');
      const json = await response.json();
      console.log(json.data)
      setOct(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getoct();
  }, []);

  const getnov = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/11/2022');
      const json = await response.json();
      console.log(json.data)
      setNov(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getnov();
  }, []);

  const getdec = async () => {
    try {
      const response = await fetch('http://api.aladhan.com/v1/gToHCalendar/12/2022');
      const json = await response.json();
      console.log(json.data)
      setDec(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdec();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topnav}>
        <MaterialIcons name="arrow-back"
          size={40}
          color='white'
          style={styles.icon}
          onPress={() => navigation.goBack()} />
        <Text style={styles.topnavtext}>Calendar</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView scrollEventThrottle={false}>
          {/* JANUARY */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: windowWidth /1.1,
              alignSelf: 'center',
              borderRadius: 30,
              elevation: 10,
              // marginRight: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>January </Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView scrollEventThrottle={false}>
              {data.map(item => {
                return (
                  <View>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      marginTop: 20,
                      marginRight: 10,
                      color: 'black'
                    }}>{item.hijri.month.ar}</Text>
                    <View style={{
                      borderWidth: 1,
                      borderColor: 'black',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                    <Text style={{
                      marginTop: -25,
                      fontSize: 16,
                      fontWeight: '600',
                      marginBottom: 20,
                      marginLeft: 10,
                      color: 'black'
                    }}>{item.gregorian.weekday.en}</Text>
                    <Text style={{
                      marginTop: -43,
                      fontSize: 16,
                      fontWeight: '600',
                      marginBottom: 20,
                      marginLeft: 150,
                      color: 'black'
                    }}>{item.hijri.date}</Text>
                  </View>
                )
              })}
            </ScrollView>
          </View>
          {/* FEBRUARY */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: 390,
              borderRadius: 30,
              elevation: 10,
              // marginRight: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>February </Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView scrollEventThrottle={false}>
              {feb.map(item => {
                return (
                  <View>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      marginTop: 20,
                      marginRight: 10,
                      color: 'black'
                    }}>{item.hijri.month.ar}</Text>
                    <View style={{
                      borderWidth: 1,
                      borderColor: 'black',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                    <Text style={{
                      marginTop: -25,
                      fontSize: 16,
                      fontWeight: '600',
                      marginBottom: 20,
                      marginLeft: 10,
                      color: 'black'
                    }}>{item.gregorian.weekday.en}</Text>
                    <Text style={{
                      marginTop: -43,
                      fontSize: 16,
                      fontWeight: '600',
                      marginBottom: 20,
                      marginLeft: 150,
                      color: 'black'
                    }}>{item.hijri.date}</Text>
                  </View>
                )
              })}
            </ScrollView>
          </View>
          {/* MARCH */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: 390,
              borderRadius: 30,
              elevation: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>March </Text>
             <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView>
              {march.map(item => {
                return (
                  <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 20,
                    marginRight: 10,
                    color: 'black'
                  }}>{item.hijri.month.ar}</Text>
                   <View style={{
                      borderWidth: 1,
                      borderColor: '#090979',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                  <Text style={{
                    marginTop: -25,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 10,
                    color: 'black'
                  }}>{item.gregorian.weekday.en}</Text>
                  <Text style={{
                    marginTop: -43,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 150,
                    color: 'black'
                  }}>{item.hijri.date}</Text>
                </View>
                )
              })}
            </ScrollView>
          </View>
          {/* APRIL */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: 390,
              borderRadius: 30,
              elevation: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>April </Text>
             <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView>
              {april.map(item => {
                return (
                  <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 20,
                    marginRight: 10,
                    color: 'black'
                  }}>{item.hijri.month.ar}</Text>
                   <View style={{
                      borderWidth: 1,
                      borderColor: '#090979',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                  <Text style={{
                    marginTop: -25,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 10,
                    color: 'black'
                  }}>{item.gregorian.weekday.en}</Text>
                  <Text style={{
                    marginTop: -43,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 150,
                    color: 'black'
                  }}>{item.hijri.date}</Text>
                </View>
                )
              })}
            </ScrollView>
          </View>
          {/* MAY */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: 390,
              borderRadius: 30,
              elevation: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>May </Text>
             <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView>
              {may.map(item => {
                return (
                  <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 20,
                    marginRight: 10,
                    color: 'black'
                  }}>{item.hijri.month.ar}</Text>
                   <View style={{
                      borderWidth: 1,
                      borderColor: '#090979',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                  <Text style={{
                    marginTop: -25,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 10,
                    color: 'black'
                  }}>{item.gregorian.weekday.en}</Text>
                  <Text style={{
                    marginTop: -43,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 150,
                    color: 'black'
                  }}>{item.hijri.date}</Text>
                </View>
                )
              })}
            </ScrollView>
          </View>
          {/* JUNE */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: 390,
              borderRadius: 30,
              elevation: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>June </Text>
             <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView>
              {june.map(item => {
                return (
                  <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 20,
                    marginRight: 10,
                    color: 'black'
                  }}>{item.hijri.month.ar}</Text>
                   <View style={{
                      borderWidth: 1,
                      borderColor: '#090979',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                  <Text style={{
                    marginTop: -25,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 10,
                    color: 'black'
                  }}>{item.gregorian.weekday.en}</Text>
                  <Text style={{
                    marginTop: -43,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 150,
                    color: 'black'
                  }}>{item.hijri.date}</Text>
                </View>
                )
              })}
            </ScrollView>
          </View>
          {/* JULY */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: 390,
              borderRadius: 30,
              elevation: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>July </Text>
             <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView>
              {july.map(item => {
                return (
                  <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 20,
                    marginRight: 10,
                    color: 'black'
                  }}>{item.hijri.month.ar}</Text>
                   <View style={{
                      borderWidth: 1,
                      borderColor: '#090979',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                  <Text style={{
                    marginTop: -25,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 10,
                    color: 'black'
                  }}>{item.gregorian.weekday.en}</Text>
                  <Text style={{
                    marginTop: -43,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 150,
                    color: 'black'
                  }}>{item.hijri.date}</Text>
                </View>
                )
              })}
            </ScrollView>
          </View>
          {/* AUGUST */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: 390,
              borderRadius: 30,
              elevation: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>August </Text>
             <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView>
              {august.map(item => {
                return (
                  <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 20,
                    marginRight: 10,
                    color: 'black'
                  }}>{item.hijri.month.ar}</Text>
                   <View style={{
                      borderWidth: 1,
                      borderColor: '#090979',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                  <Text style={{
                    marginTop: -25,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 10,
                    color: 'black'
                  }}>{item.gregorian.weekday.en}</Text>
                  <Text style={{
                    marginTop: -43,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 150,
                    color: 'black'
                  }}>{item.hijri.date}</Text>
                </View>
                )
              })}
            </ScrollView>
          </View>
          {/* SEPTEMBER */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: 390,
              borderRadius: 30,
              elevation: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>September </Text>
             <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView>
              {sept.map(item => {
                return (
                  <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 20,
                    marginRight: 10,
                    color: 'black'
                  }}>{item.hijri.month.ar}</Text>
                   <View style={{
                      borderWidth: 1,
                      borderColor: '#090979',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                  <Text style={{
                    marginTop: -25,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 10,
                    color: 'black'
                  }}>{item.gregorian.weekday.en}</Text>
                  <Text style={{
                    marginTop: -43,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 150,
                    color: 'black'
                  }}>{item.hijri.date}</Text>
                </View>
                )
              })}
            </ScrollView>
          </View>
          {/* OCTOBER */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: 390,
              borderRadius: 30,
              elevation: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>October </Text>
             <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView>
              {oct.map(item => {
                return (
                  <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 20,
                    marginRight: 10,
                    color: 'black'
                  }}>{item.hijri.month.ar}</Text>
                   <View style={{
                      borderWidth: 1,
                      borderColor: '#090979',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                  <Text style={{
                    marginTop: -25,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 10,
                    color: 'black'
                  }}>{item.gregorian.weekday.en}</Text>
                  <Text style={{
                    marginTop: -43,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 150,
                    color: 'black'
                  }}>{item.hijri.date}</Text>
                </View>
                )
              })}
            </ScrollView>
          </View>
          {/* NOVEMBER */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: 390,
              borderRadius: 30,
              elevation: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>November </Text>
             <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView>
              {nov.map(item => {
                return (
                  <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 20,
                    marginRight: 10,
                    color: 'black'
                  }}>{item.hijri.month.ar}</Text>
                   <View style={{
                      borderWidth: 1,
                      borderColor: '#090979',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                  <Text style={{
                    marginTop: -25,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 10,
                    color: 'black'
                  }}>{item.gregorian.weekday.en}</Text>
                  <Text style={{
                    marginTop: -43,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 150,
                    color: 'black'
                  }}>{item.hijri.date}</Text>
                </View>
                )
              })}
            </ScrollView>
          </View>
          {/* DECEMBER */}
          <View
            style={{
              margin: 10,
              backgroundColor: 'white',
              width: 390,
              borderRadius: 30,
              elevation: 10,
            }}
          >
            <Text style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 22,
              fontWeight: '600',
              color: '#090979'
            }}>December </Text>
             <Text style={{
              textAlign: 'left',
              marginLeft: 10,
              marginTop: 20,
              fontSize: 16,
              color: '#4b7bf2'
            }}>WeekDays</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 170,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Date</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: 285,
              marginTop: -22,
              fontSize: 16,
              color: '#4b7bf2'
            }}>Islamic Year</Text>
            <ScrollView>
              {dec.map(item => {
                return (
                  <View>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 20,
                    marginRight: 10,
                    color: 'black'
                  }}>{item.hijri.month.ar}</Text>
                   <View style={{
                      borderWidth: 1,
                      borderColor: '#090979',
                      width: 360,
                      marginLeft: 15,
                      // marginTop: 10,
                    }}></View>
                  <Text style={{
                    marginTop: -25,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 10,
                    color: 'black'
                  }}>{item.gregorian.weekday.en}</Text>
                  <Text style={{
                    marginTop: -43,
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 20,
                    marginLeft: 150,
                    color: 'black'
                  }}>{item.hijri.date}</Text>
                </View>
                )
              })}
            </ScrollView>
          </View>
        </ScrollView>
      )
      }
    </View >
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
    fontSize: 22,
    color: 'white'
  },
  icon: {
    marginLeft: 20,
    marginTop: 10,
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
    backgroundColor: "white",
    borderRadius: 40,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});

export default CalendarScreen;

