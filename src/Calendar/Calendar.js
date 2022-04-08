// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native'
// import { Calendar } from 'react-native-calendars';

// const CalendarScreen = () => {

//     return (
//         <View style={styles.container}>
//             <Text>
//                 Calendar
//             </Text>
           
//         </View>
//     )
// }

// const styles=StyleSheet.create({
//     container: {
//         flex:1,
//     }
// })

// export default CalendarScreen;

import React, {useState, Fragment, useCallback, useMemo} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {Calendar, CalendarProps} from 'react-native-calendars';


const INITIAL_DATE = '2020-02-02';

const CalendarScreen = () => {
  const [selected, setSelected] = useState(INITIAL_DATE);

//   const onDayPress: CalendarProps['onDayPress'] = useCallback(day => {
//     setSelected(day.dateString);
//   }, []);
const onDayPress = (day)=> {
    setSelected(day.dateString)
}

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'blue',
        selectedTextColor: 'white'
      }
    };
  }, [selected]);
  return(
    <Fragment>
    <Text style={styles.text}>Calendar with selectable date</Text>
    <Calendar
      
      enableSwipeMonths
      current={INITIAL_DATE}
      style={styles.calendar}
      onDayPress={onDayPress}
      markedDates={marked}
    />
  </Fragment>
  )
}

export default CalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16
  },
});