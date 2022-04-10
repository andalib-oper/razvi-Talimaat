
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";

const CalendarScreen = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(moment(new Date()).format("DD-MM-YYYY"));
  const maxDate = moment(selectedStartDate).format('DD-MM-YYYY');
  // const minDate = moment(setSelectedStartDate).format('DD-MM-YYYY');
  // const [selected, setelected] = useState(INITIAL_DATE);
  const onDateChange = (date, type) => {
    setSelectedStartDate(date);
   };
  return(
    <View style={styles.container}>
    <CalendarPicker
    startFromMonday={true}
    allowRangeSelection={false}
    minDate={moment(new Date()).format("DD-MM-YYYY")}
    maxDate={moment(new Date()).format("DD-MM-YYYY")}
    weekdays={
      [
        'Mon', 
        'Tue', 
        'Wed', 
        'Thur', 
        'Fri', 
        'Sat', 
        'Sun'
      ]}
    months={[
      'January',
      'Febraury',
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
    ]}
    previousTitle="Previous"
    nextTitle="Next"
    todayBackgroundColor="#e6ffe6"
    selectedDayColor="#66ff33"
    selectedDayTextColor="#000000"
    scaleFactor={375}
    textStyle={{
      fontFamily: 'Cochin',
      color: '#000000',
    }}
    onDateChange={onDateChange}
  />
   <View>
    <Text>
      Selected Start Date : {maxDate}
    </Text>
    </View> 
    </View>
  )
}

export default CalendarScreen;

const styles = StyleSheet.create({
 container: {
   flex: 1
 },
});