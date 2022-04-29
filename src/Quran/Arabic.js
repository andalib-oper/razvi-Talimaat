import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SkypeIndicator} from 'react-native-indicators';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import axios from 'axios';

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

const Arabic = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getSurahs = async () => {
    try {
      const response = await axios.get('http://api.alquran.cloud/v1/surah');
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSurahs();
  }, []);
  const [focused, setFocused] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.topnav}>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="white"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.topnavtext}>Arabic Version</Text>
      </View>
      <ScrollView>
        {isLoading ? (
          <OrientationLoadingOverlay
            visible={true}
            color="white"
            indicatorSize="large"
            messageFontSize={24}
            // message="Loading... 😀😀😀"
          />
        ) : (
          <ScrollView style={{marginBottom: normalize(10)}}>
            <FlatList
              data={data}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                // <View style={styles.topnav}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('arabicAyahs', {
                      code: item.number,
                    })
                  }>
                  {/* <View>
                    <ArabicAyahs code = {item.number}/>
                  </View> */}
                  <View style={styles.surah}>
                    <Text style={styles.number}>{item.number}.</Text>
                    <Text style={styles.surahArabic}>{item.name}</Text>
                    {/* <Text style={styles.surahEnglish}>
                    {item.englishName},{item.englishNameTranslation}
                  </Text> */}
                    <Text style={styles.verses}>
                      Verses {item.numberOfAyahs}
                    </Text>
                    <Text style={styles.revelation}>{item.revelationType}</Text>
                    {/* <FontAwesome
                name='heart-o'
                size={30}
                color={focused ? "black" : "#808080"}
                style={styles.iconheart} /> */}
                  </View>
                </TouchableOpacity>
                // </View>
              )}
            />
          </ScrollView>
        )}
      </ScrollView>
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
    color: 'white',
  },
  icon: {
    marginLeft: 20,
    marginTop: 15,
  },
  image: {
    marginTop: 0,
    height: 250,
    width: 425,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomLeftRadius: 30,
  },
  surah: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center',
    height: windowHeight / 7,
    width: windowWidth / 1.1,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 20,
    color: '#555',
  },
  number: {
    marginTop: 22,
    marginLeft: 10,
    fontWeight: '600',
    color: '#555',
  },
  surahArabic: {
    marginTop: -24,
    marginRight: 20,
    marginLeft: 0,
    fontSize: normalize(18),
    fontWeight: '600',
    color: '#555',
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
    fontWeight: '600',
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
});

export default Arabic;
