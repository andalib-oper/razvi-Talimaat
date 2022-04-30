import React, { useState, useEffect } from 'react';
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
import { SkypeIndicator } from 'react-native-indicators';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MMKV } from 'react-native-mmkv';

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

const Page = ({ pageContent }) => {
  // console.log(pageContent);

  const toArabic = number => {
    var persianDigits = '۰۱۲۳۴۵٦۷۸۹';
    var persianMap = persianDigits.split('');
    return number.replace(/\d/g, function (m) {
      return persianMap[parseInt(m)];
    });
  };

  return (
    <View style={{
      // backgroundColor: 'green',
      // flexDirection: 'column',
      paddingVertical: normalize(10),
      backgroundColor: 'white',
      width: windowWidth / 1.1,
      height: 'auto',
      margin: 10,
      elevation: 2,
      alignSelf: 'center',
      borderRadius: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      borderRadius: 2,
    }}>
      <Image
        source={require('../../images/borderquran2.jpg')}
        style={{
          height: 'auto',
        paddingVertical: normalize(25),
        paddingHorizontal: normalize(15),
          width: windowWidth/2.2,
          alignSelf: 'center'
        }}/>
        <View style={{
          // backgroundColor: 'purple',
          flexDirection: 'row',
          alignItems: 'center',
          height:'auto'
        }}>
          <Text style={{
            // flexDirection: 'row',
            // backgroundColor: 'red',
            color: 'blue',
            width: '40%',
            fontSize: 16,
            margin: 10,
            paddingVertical: normalize(10),
            textAlign: 'left',
            // backgroundColor: 'yellow'
          }}>{pageContent[pageContent.length-1].surah}
          </Text>
          <Text style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
            color: 'blue',
            fontSize: 18,
            marginLeft: 10,
            width: '10%',
            // paddingHorizontal: normalize(5),
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            // paddingVertical: normalize(10),
            textAlign: 'center',
          }}>{pageContent[0].page}
          {/* <Text>
            {pageContent[pageContent.length-1].surah}
          </Text> */}
          </Text>
        </View>
        <Text
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'center',
            alignSelf: 'center',
            textAlign: 'center',
            marginBottom: 20,
            paddingHorizontal: normalize(10),
            // backgroundColor: 'green'
            // textAlign: 'justify',
            // direction: 'rtl',
            // width: '100%',
          }}
          adjustsFontSizeToFit>
          {pageContent.map((content, idx) => {
            return (
              <>
                {content.numberInSurah === 1 && (
                  <View style={{
                    width: windowWidth / 1.1,
                    alignSelf: 'center',
                    paddingVertical: normalize(5),
                    // backgroundColor: 'orange',
                    marginTop: 5,
                    // marginLeft: 20,
                  }}>
                    <Text
                      key={`${content.number + 8000}.${idx}`}
                      style={{
                        color: 'blue',
                        fontSize: 18,
                        // margin: 10,
                        // jus: 'center',
                        // flex: 1,
                        paddingVertical: normalize(10),
                        alignSelf: 'center',
                        textAlign: 'center',
                        // backgroundColor: 'black',
                      }}>
                      {content.surah}
                      {/* {'\n'} */}
                    </Text>
                  </View>
                )}
                <Text
                  key={`${content.page}.${idx}`}
                  style={{
                    // color: '#05d944',
                    // backgroundColor: 'grey',
                    alignSelf: 'center',
                    paddingHorizontal: normalize(10),
                    paddingVertical: normalize(15),
                    fontSize: 18,
                    marginTop: 10,
                    textAlign: 'center',
                    width:
                      content.surah === 'سُورَةُ ٱلْفَاتِحَةِ' &&
                        content.numberInSurah === 1
                        ? windowWidth
                        : null,
                    // flexWrap: 'wrap',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 2,
                    margin: '5px'
                  }}
                  allowFontScaling={false}
                  selectable={true}>
                  {content.text}
                  <Text style={styles.number2}>
                    {toArabic(`${content.numberInSurah}`)}&#1757;
                  </Text>
                </Text>
              </>
            );
          })}
        </Text>
      {/* </Image> */}
      {/* <Text>{pageContent.page}</Text> */}
    </View>
  );
};

const ArabicAyahs = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [quran, setQuran] = useState([]);

  const storage = new MMKV();

  useEffect(() => {
    var page_quran = {};
    // storage.delete('pagewise_quran');
    if (!storage.contains('pagewise_quran')) {
      const quran = JSON.parse(storage.getString('quran'));
      const new_quran = quran
        .map(surah => surah.ayahs.map(ayah => ({ ...ayah, surah: surah.name })))
        .flat();
      new_quran.forEach(ayah => {
        page_quran[ayah.page] = Object.keys(page_quran).includes(`${ayah.page}`)
          ? [...page_quran[`${ayah.page}`], ayah]
          : [ayah];
      });
      storage.set('pagewise_quran', JSON.stringify(page_quran));
    } else {
      page_quran = JSON.parse(storage.getString('pagewise_quran'));
    }
    console.log(page_quran['1']);
    setQuran(page_quran);
    setLoading(false);
  }, []);

  return (
    <View style={{ flex: 1, padding: 0 }}>
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
          data={Object.keys(quran).sort((a, b) => a - b)}
          keyExtractor={it => it}
          renderItem={({ item }) => {
            return <Page pageContent={quran[item]} />;

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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  number2: {
    fontSize: 18,
    margin: '5px'
    // flexDirection: 'row-reverse',
    // alignItems: 'center',
    // justifyContent: 'center',
    // color: DEFAULT_COLOR_THEME,
  },
});

export default ArabicAyahs;
