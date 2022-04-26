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
import {SkypeIndicator} from 'react-native-indicators';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MMKV} from 'react-native-mmkv';

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

const ArabicAyahs = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [quran, setQuran] = useState([]);

  const storage = new MMKV();

  // const getSurahsAyahs = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://api.alquran.cloud/v1/surah/${route.params.code}`,
  //     );
  //     const json = await response.json();
  //     setData(json.data.ayahs);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const quran = JSON.parse(storage.getString('quran'));
    const currentSurah = quran.filter(
      surah => surah.number === route.params.code,
    )[0];
    setData(currentSurah);
    setQuran(quran);
    setLoading(false);
  }, []);
  var page = 1;

  const [focused, setFocused] = useState('');
  return (
    <View style={{flex: 1, padding: 0}}>
      <View style={styles.topnav}>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="white"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.topnavtext}>Ayahs</Text>
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
        // <ScrollView>

        // <FlatList
        //   data={data.ayahs}
        //   keyExtractor={({number}, index) => number}
        //   renderItem={({item}) => (
        //     <View style={styles.surah}>
        //       <Text style={styles.number}>{item.number}.</Text>
        //       <Text style={styles.surahArabic}>{item.text}</Text>
        //       {/* <Image
        //         style={styles.image}
        //         source={require('../../images/quran.png')}/> */}
        //       <Text
        //         style={{
        //           marginLeft: 200,
        //           marginTop: 10,
        //           fontSize: normalize(14),
        //           fontWeight: '600',
        //           color: '#555',
        //         }}>
        //         Number in Surah: {item.numberInSurah}
        //       </Text>
        //       <Text
        //         style={{
        //           marginLeft: 200,
        //           marginTop: 5,
        //           fontSize: normalize(14),
        //           fontWeight: '600',
        //           color: '#555',
        //         }}>
        //         Ruku: {item.ruku}
        //       </Text>
        //       {item.sajda ? (
        //         <>
        //           <Text
        //             style={{
        //               marginLeft: 250,
        //             }}>
        //             Sajda
        //           </Text>
        //         </>
        //       ) : null}
        //     </View>
        //   )}
        // />
        //</ScrollView>
        <ScrollView>
          {quran.map(surah => {
            return surah.ayahs.map(ayah => {
              if (page === ayah.page) {
                return (
                  <Text
                    key={Math.random() * 10000}
                    style={{fontSize: 20, paddingHorizontal: normalize(10)}}>
                    {ayah.text}
                  </Text>
                );
              } else {
                return (
                  <View key={Math.random() * 10000}>
                    <Text
                      style={{fontSize: 18, paddingHorizontal: normalize(10)}}>
                      {page++}
                    </Text>
                    <Text
                      style={{fontSize: 20, paddingHorizontal: normalize(10)}}>
                      {ayah.text}
                    </Text>
                  </View>
                );
              }
            });
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
    marginTop: 0,
    height: 60,
    width: windowWidth / 1,
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
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'center',
    height: 'auto',
    width: windowWidth / 1.1,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 10,
    padding: 10,
  },
  number: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: normalize(12),
    color: '#555',
  },
  surahArabic: {
    marginTop: -20,
    marginRight: 20,
    marginLeft: 40,
    fontSize: normalize(16),
    fontWeight: '600',
    color: '#555',
    // width: 200
  },
  surahEnglish: {
    marginTop: 2,
    marginLeft: 40,
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
  },
  verses: {
    marginTop: 2,
    fontSize: 14,
    marginLeft: 40,
    color: '#555',
  },
  revelation: {
    marginTop: 2,
    fontSize: 14,
    marginLeft: 40,
    color: '#555',
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
    color: '#555',
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
    color: '#555',
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
    color: '#555',
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
    color: '#555',
  },
});

export default ArabicAyahs;
