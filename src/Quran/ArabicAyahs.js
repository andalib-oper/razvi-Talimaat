import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
  PixelRatio,
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

const ArabicAyahs = ({route,navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getSurahsAyahs = async () => {
    try {
      const response = await fetch(
        `http://api.alquran.cloud/v1/surah/${route.params.code}`,
      );
      const json = await response.json();
      setData(json.data.ayahs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSurahsAyahs();
  }, []);

  console.log(data);
  const [focused, setFocused] = useState('');
  return (
    <View style={{flex: 1, padding: 0}}>
       <View style={styles.topnav}>
        <MaterialIcons name="arrow-back"
                    size={30}
                    color='white'
                    style={styles.icon}
                    onPress={() => navigation.goBack()} />
          <Text style={styles.topnavtext}>Ayahs</Text>
        </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <View style={styles.surah}>
                <Text style={styles.number}>{item.number}.</Text>
                <Text style={styles.surahArabic}>{item.text}</Text>
                {/* <Image
                style={styles.image}
                source={require('../../images/quran.png')}/> */}
                <Text
                  style={{
                    marginLeft: 200,
                    marginTop: 10,
                    fontSize: normalize(14),
                    fontWeight: '600'
                  }}>
                  Number in Surah: {item.numberInSurah}
                </Text>
                <Text
                  style={{
                    marginLeft: 200,
                    marginTop: 5,
                    fontSize: normalize(14),
                    fontWeight: '600'
                  }}>
                  Ruku: {item.ruku}
                </Text>
                {item.sajda ? (
                  <>
                    <Text
                      style={{
                        marginLeft: 250,
                      }}>
                      Sajda
                    </Text>
                  </>
                ) : (
                null
                )}
              </View>
            )}
          />
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
    marginTop: 0,
    height: 60,
    width: windowWidth/1,
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
    marginTop: 10,
},
  image: {
    marginTop: 50,
    marginRight: 120,
    height: 30,
    width: 25,
    backgroundColor: 'grey',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  surah: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center',
    height: 'auto',
    width:  windowWidth /1.1,
    backgroundColor: '#ffffff',
    elevation: 20,
    borderRadius: 20,
    padding: 10
  },
  number: {
    marginTop: 15,
    marginLeft: 5,
  },
  surahArabic: {
    marginTop: -20,
    marginRight: 20,
    marginLeft: 10,
    fontSize: normalize(18),
    fontWeight: '600',
    // width: 200
  },
  surahEnglish: {
    marginTop: 2,
    marginLeft: 40,
    fontSize: 16,
    fontWeight: '700',
  },
  verses: {
    marginTop: 2,
    fontSize: 14,
    marginLeft: 40,
  },
  revelation: {
    marginTop: 2,
    fontSize: 14,
    marginLeft: 40,
  },
  iconheart: {
    marginLeft: 330,
    marginTop: -51,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  English: {
    marginTop: 20,
    marginLeft: 15,
    height: 30,
    width: 100,
    backgroundColor: 'blue',
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 1,
  },
  Hindi: {
    marginTop: -29,
    marginLeft: 155,
    height: 30,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 1,
  },
  Urdu: {
    marginTop: -31,
    marginLeft: 295,
    height: 30,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 1,
  },
});

export default ArabicAyahs;
