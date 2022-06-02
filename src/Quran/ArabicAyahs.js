import React, {useState, useEffect, useRef} from 'react';
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
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MMKV} from 'react-native-mmkv';
import data from '../../data/Chapters.json';

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

const Page = ({pageContent, index}) => {
  // console.log(pageContent);

  const toArabic = number => {
    var persianDigits = '۰۱۲۳۴۵٦۷۸۹';
    var persianMap = persianDigits.split('');
    return number.replace(/\d/g, function (m) {
      return persianMap[parseInt(m)];
    });
  };

  const Juz = {
    1: 'آلم',
    2: 'سَيَقُولُ',
    3: 'تِلْكَ ٱلْرُّسُلُ',
    4: 'لن تنالوا',
    5: 'وَٱلْمُحْصَنَاتُ',
    6: 'لَا يُحِبُّ ٱللهُ',
    7: 'وَإِذَا سَمِعُوا',
    8: 'وَلَوْ أَنَّنَا',
    9: 'قَالَ ٱلْمَلَأُ',
    10: 'وَٱعْلَمُواْ',
    11: 'يَعْتَذِرُونَ',
    12: 'وَمَا مِنْ دَآبَّةٍ',
    13: 'وَمَا أُبَرِّئُ',
    14: 'رُبَمَا',
    15: 'سُبْحَانَ ٱلَّذِى',
    16: 'قَالَ أَلَمْ',
    17: 'ٱقْتَرَبَ لِلْنَّاسِ',
    18: 'قَدْ أَفْلَحَ',
    19: 'وَقَالَ ٱلَّذِينَ',
    20: 'أَمَّنْ خَلَقَ',
    21: 'أُتْلُ مَاأُوْحِیَ',
    22: 'وَمَنْ يَّقْنُتْ',
    23: 'وَمَآ لي',
    24: 'فَمَنْ أَظْلَمُ',
    25: 'إِلَيْهِ يُرَدُّ',
    26: 'حم',
    27: 'قَالَ فَمَا خَطْبُكُم',
    28: 'قَدْ سَمِعَ ٱللهُ',
    29: 'تَبَارَكَ ٱلَّذِى',
    30: 'عَمَّ',
  };

  return (
    <View
      style={{
        // backgroundColor: 'green',
        // flexDirection: 'column',
        paddingVertical: normalize(15),
        paddingTop: normalize(0),
        backgroundColor: 'white',
        width: windowWidth / 1.1,
        height: 'auto',
        margin: 10,
        // marginTop: 0,
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
      }}>
      <Image
        source={require('../../images/corner.png')}
        style={{
          height: normalize(50),
          width: normalize(50),
          // paddingVertical: normalize(25),
          // paddingHorizontal: normalize(15),
          alignSelf: 'center',
          position: 'absolute',
          top: 5,
          left: 5,
        }}
      />
      <Image
        source={require('../../images/corner.png')}
        style={{
          height: normalize(50),
          width: normalize(50),
          // paddingVertical: normalize(25),
          // paddingHorizontal: normalize(15),
          alignSelf: 'center',
          position: 'absolute',
          top: 5,
          right: 5,
          transform: [
            {
              rotateY: '180deg',
            },
          ],
        }}
      />
      <Image
        source={require('../../images/corner.png')}
        style={{
          height: normalize(50),
          width: normalize(50),
          // paddingVertical: normalize(25),
          // paddingHorizontal: normalize(15),
          alignSelf: 'center',
          position: 'absolute',
          bottom: 5,
          left: 5,
          transform: [
            {
              rotateX: '180deg',
            },
          ],
        }}
      />
      <Image
        source={require('../../images/corner.png')}
        style={{
          height: normalize(50),
          width: normalize(50),
          // paddingVertical: normalize(25),
          // paddingHorizontal: normalize(15),
          alignSelf: 'center',
          position: 'absolute',
          bottom: 5,
          right: 5,
          transform: [
            {
              rotateX: '180deg',
            },
            {
              rotateY: '180deg',
            },
          ],
        }}
      />
      <View
        style={{
          // backgroundColor: 'purple',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // height: 'auto',
          marginBottom: normalize(20),
          width: '60%',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            // flexDirection: 'row',
            // backgroundColor: 'red',
            color: '#d79c03',
            width: '40%',
            fontSize: 12,
            // marginVertical: 10,
            paddingVertical: normalize(10),
            textAlign: 'left',
            // backgroundColor: 'yellow'
          }}>
          {pageContent[pageContent.length - 1].surah}
        </Text>
        <Text
          style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
            color: '#d79c03',
            fontSize: 14,
            fontWeight: 'bold',
            width: '20%',
            // marginLeft: 10,
            // width: '10%',
            // paddingHorizontal: normalize(5),
            // justifyContent: 'space-between',
            // alignContent: 'center',
            // alignItems: 'center',
            // alignSelf: 'center',
            // paddingVertical: normalize(10),
            textAlign: 'center',
          }}>
          {pageContent[0].page}
        </Text>
        <Text
          style={{
            color: '#d79c03',
            fontSize: 12,
            textAlign: 'right',
            flexDirection: 'row',
            alignItems: 'center',
            width: '40%',
          }}>
          {pageContent[0].juz}{' '}
          <Text style={{fontSize: 14}}>{Juz[pageContent[0].juz]}</Text>
        </Text>
      </View>
      <Text
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
          alignSelf: 'center',
          textAlign: 'center',
          // marginBottom: 20,
          marginTop: 10,
          paddingHorizontal: normalize(15),
          paddingBottom: normalize(20),
          // backgroundColor: 'green'
          // textAlign: 'justify',
          // direction: 'rtl',
          // width: '100%',
        }}
        adjustsFontSizeToFit>
        {pageContent.map((content, idx) => {
          // console.log(content);
          return (
            <Text key={content.number * 100000000}>
              {content.numberInSurah === 1 && (
                <View
                  style={{
                    width: windowWidth,
                    alignSelf: 'center',
                    // paddingVertical: normalize(5),
                    marginBottom: normalize(10),
                    // marginTop: normalize(30),
                    // backgroundColor: 'orange',
                    // marginTop: 5,
                    // marginLeft: 20,
                    // backgroundColor: 'pink',
                  }}>
                  <Text
                    style={{
                      color: '#d79c03',
                      fontSize: 22,
                      marginBottom: normalize(10),
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
                // key={`${Math.random() * 100000}`}
                style={{
                  // color: '#05d944',
                  // backgroundColor: 'grey',
                  alignSelf: 'center',
                  paddingHorizontal: normalize(10),
                  paddingVertical: normalize(15),
                  fontSize: 20,
                  marginTop: 10,
                  textAlign: 'center',
                  // color: '#115be2',
                  color: '#696761',
                  // color: '#037735',
                  width:
                    content.surah === 'سُورَةُ ٱلْفَاتِحَةِ' &&
                    content.numberInSurah === 1
                      ? windowWidth
                      : null,
                  // flexWrap: 'wrap',
                  // borderBottomColor: '#ccc',
                  // borderBottomWidth: 2,
                  marginRight: 5,
                  // paddingBottom: normalize(10),
                  lineHeight: 32,
                }}
                allowFontScaling={false}
                selectable={true}>
                {content.text}
                <Text style={styles.number2}>
                  {toArabic(`${content.numberInSurah}`)}&#1757;
                  {pageContent[idx + 1]?.numberInSurah === 1 ? '\n\n' : null}
                </Text>
              </Text>
            </Text>
          );
        })}
      </Text>
      {/* </Image> */}
      {/* <Text>{pageContent.page}</Text> */}
    </View>
  );
};

const ArabicAyahs = ({route, navigation}) => {
  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  const [quran, setQuran] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const flatListRef = useRef(null);
  // const scrollIntoView = useScrollIntoView();
  // const viewRef = useRef();

  useEffect(() => {
    var page_quran = {};
    const new_quran = data.surahs
      .map(surah =>
        surah.ayahs.map(ayah => ({
          ...ayah,
          surah: surah.name,
          surahNumber: surah.number,
        })),
      )
      .flat();
    new_quran.forEach(ayah => {
      page_quran[ayah.page] = Object.keys(page_quran).includes(`${ayah.page}`)
        ? [...page_quran[`${ayah.page}`], ayah]
        : [ayah];
    });

    const sIndex =
      new_quran.find(ayah => ayah.surahNumber === route.params.surahIndex)
        .page - 1;
    setScrollIndex(sIndex);
    // scrollIntoView(viewRef.current);
    setQuran(page_quran);
    setTimeout(() => {
      flatListRef?.current?.scrollToIndex({index: sIndex, animated: false});
    }, 500);
  }, []);

  const scrollToIndexFailed = err => {
    const offset = err.averageItemLength * err.index;
    flatListRef?.current?.scrollToOffset({offset});
    setTimeout(
      () => flatListRef?.current?.scrollToIndex({index: err.index}),
      100,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topnav}>
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color="white"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
      </View>
      <FlatList
        data={Object.keys(quran)}
        // keyExtractor={(it, idx) => `${Math.random() * 1000}`}
        // keyExtractor={quran[it].number}
        keyExtractor={(it, idx) => {
          return it * 10000;
        }}
        ref={flatListRef}
        renderItem={({item}) => {
          return <Page pageContent={quran[item]} index={item} />;
        }}
        onScrollToIndexFailed={err => scrollToIndexFailed(err)}
        initialNumToRender={60}
      />
      {/* <ScrollIntoView scrollIntoViewKey={scrollIndex} ref={viewRef}>
        {Object.keys(quran).map(item => (
          <Page pageContent={quran[item]} key={item} />
        ))}
      </ScrollIntoView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topnav: {
    marginTop: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    // width: windowWidth / 1,
    backgroundColor: '#4169E1',
  },
  topnavtext: {
    marginTop: -35,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: normalize(22),
    color: 'white',
  },
  icon: {
    marginLeft: 15,
    // marginTop: 10,
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
    fontSize: 15,
    marginRight: 5,
    // flexDirection: 'row-reverse',
    // alignItems: 'center',
    // justifyContent: 'center',
    // color: DEFAULT_COLOR_THEME,
  },
});

export default ArabicAyahs;
