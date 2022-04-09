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
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SwitchSelector from 'react-native-switch-selector';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {setGestureState} from 'react-native-reanimated/src/reanimated2/NativeMethods';
// import ArabicAyahs from './ArabicAyahs';

const ArabicAyahs = ({route}) => {
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
    <View style={{flex: 1, padding: 2}}>
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
                <Text
                  style={{
                    marginLeft: 200,
                  }}>
                  Number in Surah: {item.numberInSurah}
                </Text>
                <Text
                  style={{
                    marginLeft: 200,
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
  switchselector: {
    marginTop: 20,
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  surah: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 'auto',
    width: 390,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 20,
    padding: 10
  },
  number: {
    marginTop: 18,
    marginLeft: 5,
  },
  surahArabic: {
    marginTop: -24,
    marginRight: 20,
    marginLeft: 10,
    fontSize: 22,
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
