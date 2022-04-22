import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  Dimensions,
  PixelRatio,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { SkypeIndicator } from 'react-native-indicators';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay'
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

const English = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getSurahs = async () => {
    try {
      const response = await fetch('http://api.alquran.cloud/v1/surah');
      const json = await response.json();
      setData(json.data);
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
        <MaterialIcons name="arrow-back"
                    size={30}
                    color='white'
                    style={styles.icon}
                    onPress={() => navigation.goBack()} />
          <Text style={styles.topnavtext}>English Version</Text>
        </View>
      <ScrollView>
        <View>
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
          <ScrollView>
            <FlatList
              data={data}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('englishAyahs', {
                      code: item.number,
                    })
                  }>
                  <View style={styles.surah}>
                    <Text style={styles.number}>{item.number}.</Text>
                    {/* <Text style={styles.surahArabic}>{item.name}</Text> */}
                    <Text style={styles.surahEnglish}>
                      {item.englishName},{item.englishNameTranslation}
                    </Text>
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
    width: windowWidth /1,
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
  surah: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: windowHeight/7,
    width:  windowWidth /1.1,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 20,
  },
  number: {
    marginTop: 22,
    marginLeft: 10,
  },
  surahArabic: {
    marginTop: -24,
    marginRight: 20,
    marginLeft: 0,
    fontSize: 22,
    fontWeight: '600',
  },
  surahEnglish: {
    marginTop: -20,
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
});

export default English;
