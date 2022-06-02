import moment from 'moment';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  PixelRatio,
} from 'react-native';
import ImageOverlay from 'react-native-image-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

export default function PrayerTimes({prayerTimes, prayerLoading, date}) {
  const noOfPic = 4;
  const imgMap = {
    0: 'https://images.pexels.com/photos/36704/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    1: 'https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    2: 'https://images.pexels.com/photos/2236674/pexels-photo-2236674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    3: 'https://images.pexels.com/photos/318451/pexels-photo-318451.jpeg?auto=compress&cs=tinysrgb&w=600',
    4: 'https://images.pexels.com/photos/40992/man-iraq-men-portrait-40992.jpeg?auto=compress&cs=tinysrgb&w=600',
  };

  // function getRandomPic() {
  const random = Math.floor(Math.random() * Math.floor(noOfPic));

  return (
    <ImageOverlay
      overlayAlpha={
        prayerLoading || Object.keys(prayerTimes).length < 9
          ? 0.2
          : new Date('2022-04-26T15:50:39+05:30').getTime() >=
              new Date(
                moment()
                  .set('hour', prayerTimes.Maghrib.hr)
                  .set('minute', prayerTimes.Maghrib.min)
                  .set('second', 0)
                  .set('millisecond', 0),
              ).getTime() ||
            new Date('2022-04-26T15:50:39+05:30').getTime() <
              new Date(
                moment()
                  .set('hour', prayerTimes.Fajr.hr)
                  .set('minute', prayerTimes.Fajr.min)
                  .set('second', 0)
                  .set('millisecond', 0),
              ).getTime()
          ? 0.25
          : 0.45
      }
      style={styles.image}
      source={{uri: imgMap[random]}}>
      {/* <View style={{backgroundColor: 'pink'}}></View> */}
      <>
        <View>
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              fontSize: normalize(16),
              color: 'white',
              fontWeight: 'bold',
              marginTop: -55,
              marginBottom: -60,
              // numberOfLines: 1,
            }}>
            Home
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{}}>
            <Text
              style={{
                textAlign: 'left',
                marginLeft: 5,
                fontSize: normalize(12),
                // color: '#023c54',
                color: 'white',
                fontWeight: '600',
                marginTop: 5,
              }}>
              Now
            </Text>
            <Text
              style={{
                textAlign: 'left',
                marginLeft: 5,
                fontSize: normalize(18),
                // color: '#023c54',
                color: 'white',
                fontWeight: '700',
                marginTop: 3,
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
                : new Date().getTime() >=
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
                marginLeft: 5,
                fontSize: normalize(12),
                // color: '#023c54',
                color: 'white',
                fontWeight: '500',
                marginTop: 10,
              }}>
              Upcoming
            </Text>
            <Text
              style={{
                textAlign: 'left',
                marginLeft: 5,
                fontSize: normalize(15),
                // color: '#023c54',
                color: 'white',
                fontWeight: '700',
                marginTop: 2,
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
                : new Date().getTime() >=
                  new Date(
                    moment()
                      .set('hour', prayerTimes.Sunrise.hr)
                      .set('minute', prayerTimes.Sunrise.min)
                      .set('second', 0)
                      .set('millisecond', 0),
                  ).getTime()
                ? 'Sunrise'
                : null}
            </Text>
            <Text
              style={{
                textAlign: 'left',
                marginLeft: 5,
                fontSize: normalize(12),
                // color: '#023c54',
                color: 'white',
                fontWeight: '500',
                marginTop: 2,
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
                ? moment()
                    .set('hour', prayerTimes?.Fajr?.hr)
                    .set('minute', prayerTimes?.Fajr?.min)
                    .format('h:mm A')
                : new Date().getTime() >=
                  new Date(
                    moment()
                      .set('hour', prayerTimes?.Maghrib?.hr)
                      .set('minute', prayerTimes?.Maghrib?.min),
                  ).getTime()
                ? moment()
                    .set('hour', prayerTimes?.Isha?.hr)
                    .set('minute', prayerTimes?.Isha?.min)
                    .format('h:mm A')
                : new Date().getTime() >=
                  new Date(
                    moment()
                      .set('hour', prayerTimes?.Asr?.hr)
                      .set('minute', prayerTimes?.Asr?.min),
                  ).getTime()
                ? moment()
                    .set('hour', prayerTimes?.Maghrib?.hr)
                    .set('minute', prayerTimes?.Maghrib?.min)
                    .format('h:mm A')
                : new Date().getTime() >=
                  new Date(
                    moment()
                      .set('hour', prayerTimes?.Dhuhr?.hr)
                      .set('minute', prayerTimes?.Dhuhr?.min),
                  ).getTime()
                ? moment()
                    .set('hour', prayerTimes?.Asr?.hr)
                    .set('minute', prayerTimes?.Asr?.min)
                    .format('h:mm A')
                : new Date().getTime() >=
                  new Date(
                    moment()
                      .set('hour', prayerTimes.Sunrise.hr)
                      .set('minute', prayerTimes.Sunrise.min)
                      .set('second', 0)
                      .set('millisecond', 0),
                  ).getTime()
                ? moment()
                    .set('hour', prayerTimes?.Dhuhr?.hr)
                    .set('minute', prayerTimes?.Dhuhr?.min)
                    .format('h:mm A')
                : new Date().getTime() >=
                  new Date(
                    moment()
                      .set('hour', prayerTimes?.Fajr.hr)
                      .set('minute', prayerTimes?.Fajr.min),
                  ).getTime()
                ? moment()
                    .set('hour', prayerTimes?.Sunrise?.hr)
                    .set('minute', prayerTimes?.Sunrise?.min)
                    .format('h:mm A')
                : null}
            </Text>
          </View>
          <View
            style={{
              width: '70%',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <FontAwesome
              name="moon-o"
              size={normalize(30)}
              color="white"
              style={{
                marginRight: 25,
                marginTop: -0,
              }}
            />
            <Text
              style={{
                // marginLeft: 330,
                fontSize: normalize(28),
                marginRight: 0,
                fontWeight: '900',
                color: 'white',
                marginTop: 5,
              }}>
              {date?.hijri?.day}
            </Text>
            <Text
              style={{
                // marginLeft: 210,
                marginRight: 0,
                fontSize: normalize(13),
                // fontWeight: '500',
                color: 'white',
                marginTop: 5,
              }}>
              {date?.hijri?.month.en}, {date?.hijri?.year}
            </Text>
            <Text
              style={{
                // marginLeft: 270,
                marginRight: 0,
                fontSize: normalize(13),
                // fontWeight: '500',
                color: 'white',
                marginTop: 0,
              }}>
              {moment(date?.gregorian?.date, 'DD-MM-YYYY').format(
                'D MMM, ddd, YY',
              )}
            </Text>
          </View>
        </View>
      </>
    </ImageOverlay>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 0,
    height: windowHeight / 2.9,
    width: windowWidth / 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: normalize(10),
    // borderBottomLeftRadius: 30,
    backgroundColor: '#00000050',
  },
});
