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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
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

  useEffect(() => {
    const quran = JSON.parse(storage.getString('quran'));
    const new_quran = quran
      .map(surah => surah.ayahs.map(ayah => ({...ayah, surah: surah.name})))
      .flat();
    // const currentSurah = quran.filter(
    //   surah => surah.number === route.params.code,
    // )[0];
    // setData(currentSurah);
    setQuran(new_quran);
    setLoading(false);
  }, []);
  var page = 1;

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
        <FlatList
        // style={styles.surah}
          data={quran}
          keyExtractor={it => it.number}
          renderItem={({item}) => {
            if (page === item.page) {
              if (item.numberInSurah === 1) {
                return (
                  <View 
                  style={styles.surah}
                  >
                    <Text style={{color: '#ff0000', 
                    fontSize: 20,
                    alignSelf:'center'
                    }}>{item.surah}</Text>
                    <Text>{item.text}</Text>
                  </View>
                );
              }
              return <View 
              style={styles.pageStyle2}
              >
                <Text style={{
                color: '#000000',
                alignSelf: 'center',
                fontSize: 20,
                paddingHorizontal: normalize(20),
              }}>{item.text}, 
              <View style={{
                backgroundColor: 'white',
                // alignItems: 'center',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#000',
                alignContent: 'flex-end'
              }}>
              {/* <MaterialCommunityIcon name='circle-outline'> */}
                <Text style={{
                fontSize: 14,
                fontWeight: '600',
                alignItems: 'center',
              }} >
                {item.numberInSurah}
                </Text>
              {/* </MaterialCommunityIcon> */}
                </View>
                </Text>
              </View>;
            } else {
              page = item.page;
              return (
                <View 
                style={styles.pageStyle}
                >
                  <Text
                    style={{fontSize: 18, 
                    paddingHorizontal: normalize(10),
                    alignSelf: 'center',
                    color: '#05d944',
                    paddingVertical: normalize(10)}}>
                    {page}
                  </Text>
                  {item.numberInSurah === 1 ? (
                    <View 
                    style={styles.pageStyle1}
                    >
                      <Text style={{color: '#05d944', 
                      fontSize: 20,
                      alignSelf: 'center'
                      }}>{item.surah}</Text>
                      <Text style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        color: '#05d944',
                        paddingHorizontal: normalize(10)
                      }}>{item.text}</Text>
                    </View>
                  ) : (
                    // <View
                    // // style={styles.pageStyle}
                    // >
                    // <Text 
                    // style={{
                    //   color: '#000000',
                    //   fontSize: 16,
                    //   alignSelf: 'center',
                    //   paddingHorizontal: normalize(20)
                    // }}>{item.text}{item.numberInSurah}</Text>
                    // </View>
                    null
                  )}
                </View>
              );
            }
          }}
        />
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
  pageStyle:{
    backgroundColor: 'white',
    marginTop: 10,
    width: windowWidth/1.1,
    alignSelf: 'center',
    padding: 10,
   marginLeft: 10,
   marginRight: 10,
  //  elevation: 5,

  },
  pageStyle1:{
    backgroundColor: 'white',
    // marginTop: 10,
    // flexDirection: 'row',
    alignItems: 'flex-start',
    width: windowWidth/1.1,
    // elevation: 2,
    alignSelf: 'center',
  //   padding: 10,
    marginLeft: 10,
   marginRight: 10,
  //  marginBottom: 10,
  },
  pageStyle2:{
    backgroundColor: 'white',
    // marginTop: 10,
    // flexDirection: 'row',
    alignItems: 'flex-start',
    width: windowWidth/1.1,
    // elevation: 2,
    alignSelf: 'center',
  //   padding: 10,
    marginLeft: 10,
   marginRight: 10,
  //  marginBottom: 10,
  },
});

export default ArabicAyahs;