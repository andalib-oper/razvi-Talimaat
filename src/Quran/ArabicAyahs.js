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

const Page = ({pageContent}) => {
  // console.log(pageContent);

  const toArabic = number => {
    var persianDigits = '۰۱۲۳۴۵٦۷۸۹';
    var persianMap = persianDigits.split('');
    return number.replace(/\d/g, function (m) {
      return persianMap[parseInt(m)];
    });
  };

  return (
    <View>
      <Text>{pageContent[0].page}</Text>
      <Text
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
          // textAlign: 'justify',
          // direction: 'rtl',
          // width: '100%',
        }}
        adjustsFontSizeToFit>
        {pageContent.map((content, idx) => {
          return (
            <>
              {content.numberInSurah === 1 && (
                <View style={{width: windowWidth}}>
                  <Text
                    key={`${content.number + 8000}.${idx}`}
                    style={{
                      color: '#05d944',
                      fontSize: 18,
                      // jus: 'center',
                      // flex: 1,
                      textAlign: 'center',
                      // backgroundColor: 'pink',
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
                  fontSize: 18,
                  textAlign: 'center',
                  width:
                    content.surah === 'سُورَةُ ٱلْفَاتِحَةِ' &&
                    content.numberInSurah === 1
                      ? windowWidth
                      : null,
                  // flexWrap: 'wrap',
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 2,
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
      {/* <Text>{pageContent.page}</Text> */}
    </View>
  );
};

const ArabicAyahs = ({route, navigation}) => {
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
        .map(surah => surah.ayahs.map(ayah => ({...ayah, surah: surah.name})))
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
          data={Object.keys(quran).sort((a, b) => a - b)}
          keyExtractor={it => it}
          renderItem={({item}) => {
            return <Page pageContent={quran[item]} />;
            // if (page === item.page) {
            //   if (item.numberInSurah === 1) {
            //     return (
            //       <View
            //         style={
            //           {
            //             // backgroundColor: 'white',
            //             // marginBottom: 10,
            //           }
            //         }>
            //         {/* <Text style={{color: '#ff0000'}}>{item.surah}</Text>
            //         <Text style={{
            //           backgroundColor: 'grey'
            //         }}>{item.text}</Text> */}
            //       </View>
            //     );
            //   }
            //   return (
            //     <Text
            //       style={{
            //         backgroundColor: 'white',
            //         alignSelf: 'center',
            //         width: windowWidth / 1.1,
            //         textAlign: 'center',
            //         fontSize: 18,
            //         flexWrap: 'wrap',
            //         // marginTop: 5,
            //         paddingHorizontal: normalize(10),
            //       }}>
            //       {item.text}.{item.numberInSurah}
            //     </Text>
            //   );
            // } else {
            //   page = item.page;
            //   return (
            //     <View
            //       style={{
            //         // backgroundColor: 'white',
            //         alignSelf: 'center',
            //         width: windowWidth / 1.1,
            //       }}>
            //       <Text
            //         style={{
            //           fontSize: 18,
            //           marginTop: 20,
            //           paddingVertical: normalize(10),
            //           width: windowWidth / 1.1,
            //           backgroundColor: 'white',
            //           color: '#05d944',
            //           textAlign: 'center',
            //           flexWrap: 'wrap',
            //           // paddingHorizontal: normalize(10)
            //         }}>
            //         {page}
            //       </Text>
            //       {item.numberInSurah === 1 ? (
            //         <View
            //           style={{
            //             backgroundColor: 'white',
            //             // flexWrap: 'wrap',
            //             paddingHorizontal: normalize(10),
            //           }}>
            //           <Text
            //             style={{
            //               color: '#05d944',
            //               fontSize: 18,
            //               alignSelf: 'center',
            //               textAlign: 'center',
            //             }}>
            //             {item.surah}
            //           </Text>
            //           <Text
            //             style={{
            // color: '#05d944',
            // fontSize: 18,
            // alignSelf: 'center',
            // textAlign: 'center',
            //             }}>
            //             {item.text}
            //           </Text>
            //         </View>
            //       ) : (
            //         <Text
            //           style={{
            //             backgroundColor: 'white',
            //             fontSize: 18,
            //             paddingHorizontal: normalize(20),
            //             textAlign: 'center',
            //             // alignSelf: 'center',
            //           }}>
            //           {item.text}
            //         </Text>
            //       )}
            //     </View>
            //   );
            // }
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
    // flexDirection: 'row-reverse',
    // alignItems: 'center',
    // justifyContent: 'center',
    // color: DEFAULT_COLOR_THEME,
  },
});

export default ArabicAyahs;
