import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  PixelRatio,
  Platform,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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

const Quran = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topnav}>
        <MaterialIcons name="arrow-back"
          size={30}
          color='white'
          style={styles.icon}
          onPress={() => navigation.goBack()} />
        <Text style={styles.topnavtext}>Quran</Text>
      </View>
      <View style={{
        // backgroundColor: 'pink',
        // marginBottom: 20,
      }}>
        <ScrollView>
          <View style={{
            flexDirection: 'row',
            // backgroundColor: 'pink',
            alignSelf: 'center'
          }}>
            <TouchableOpacity
              // style={styles.English}
              onPress={() => navigation.navigate('arabic')}>
              <View style={styles.verses}>
                <Image
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 10,
                    marginRight: 80,
                    // marginLeft: 10,
                    marginTop: 10,
                  }}
                  source={require('../../images/quran.png')}
                />
                <Text style={styles.translate}>Arabic</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.English}
              onPress={() => navigation.navigate('english')}>
              <View style={styles.verses}>
                <Image
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 10,
                    marginRight: 80,
                    // marginLeft: 10,
                    marginTop: 10,
                  }}
                  source={require('../../images/abc.png')}
                />
                <Text style={styles.translate}>English</Text>
              </View>
            </TouchableOpacity>
          </View >
        </ScrollView>
      </View>
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
  },
  topnavtext: {
    marginTop: -35,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: normalize(22),
    color: 'white'
  },
  icon: {
    marginLeft: 20,
    marginTop: 15,
  },
  verses: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    alignSelf: 'center',
    height: windowHeight / 9,
    width: windowWidth / 2.5,
    backgroundColor: 'white',
    flexDirection: 'column',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    borderRadius: 20,
    // display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'column',
    alignItems: 'center',
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
    marginTop: -40,
    fontSize: normalize(14),
    marginLeft: 65,
    fontWeight: '600',
    color: 'black',
  },
});

export default Quran;
