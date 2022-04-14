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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Arabic = ({navigation}) => {
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
                    size={40}
                    color='white'
                    style={styles.icon}
                    onPress={() => navigation.goBack()} />
          <Text style={styles.topnavtext}>Arabic Version</Text>
        </View>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            <FlatList
              data={data}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                // <View style={styles.topnav}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('arabicAyahs', {
                    code: item.number,
                  })}>
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
    width: 412,
    backgroundColor: '#4b7bf2',
  },
  topnavtext: {
    marginTop: -35,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 22,
    color: 'white'
  },
  icon: {
    marginLeft: 20,
    marginTop: 10,
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
    height: 100,
    width: 390,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 20,
  },
  number: {
    marginTop: 22,
    marginLeft: 10,
    fontWeight: '600'
  },
  surahArabic: {
    marginTop: -24,
    marginRight: 20,
    marginLeft: 0,
    fontSize: 22,
    fontWeight: '600',
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
    fontWeight: '600',
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

});

export default Arabic;
