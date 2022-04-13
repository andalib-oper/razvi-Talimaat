import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, 
  FlatList, 
  ActivityIndicator,
TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Hindi = ({navigation}) => {
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
  const [focused, setFocused] = useState('')
  return (
    <View style={styles.container}>
      <ScrollView>

        <View
        // style={styles.topContainer}
        >
          <ImageBackground
            style={styles.image}
            source={require('../../images/background3.jpeg')}>
            <View>
              <Text style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: 22,
                color: 'white',
                fontWeight: '600',
                marginTop: -40,
                marginBottom: -60,
              }}>Quran</Text>
            </View>
            <Text style={{
              textAlign: 'left',
              marginLeft: -340,
              fontSize: 16,
              // color: '#023c54',
              color: 'white',
              fontWeight: '600',
              marginTop: 20,
            }}>Now</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: -330,
              fontSize: 20,
              // color: '#023c54',
              color: 'white',
              fontWeight: '600',
              marginTop: 5,
            }}>ISHA</Text>
            <Text style={{
              textAlign: 'left',
              marginLeft: -300,
              fontSize: 16,
              // color: '#023c54',
              color: 'white',
              fontWeight: '600',
              marginTop: 5,
            }}>Upcoming</Text>
            <View>
              <FontAwesome name="moon-o" size={30} color='white'
                style={{
                  marginLeft: 330,
                  marginTop: -100
                }} />
            </View>
            <Text style={{
              marginLeft: 370,
              fontSize: 22,
              marginRight: 10,
              fontWeight: '600',
              color: 'white',
              marginTop: -70,
            }}>3</Text>
            <Text style={{
              marginLeft: 260,
              marginRight: 10,
              fontSize: 18,
              fontWeight: '600',
              color: 'white',
              marginTop: 10,
            }}>Ramadan, 1443</Text>
            <Text style={{
              marginLeft: 320,
              marginRight: 10,
              fontSize: 18,
              fontWeight: '600',
              color: 'white',
              marginTop: 5,
            }}>Monday</Text>
          </ImageBackground>
        </View>
        <View >
          {/* <SwitchSelector
            initial={0}
            style={styles.switchselector}
            // onPress={value => this.setState({ gender: value })}
            onPress={value => navigation.navigate(`home${value}`)}
            textColor="#0303e0" //'#7a44cf'
            selectedColor="white"
            buttonColor="#0303e0"
            borderColor="#0303e0"
            hasPadding
            options={[
              { label: "English", value:'' }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: "Hindi", value: ''},
              { label: "Urdu", value: '' } //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
          /> */}
      <TouchableOpacity style={styles.English} onPress={()=>navigation.navigate('quran')}>
        <Text style={{
          alignSelf: 'center',
          fontSize: 14,
          color: 'white',
          marginTop: 5
        }}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Hindi} onPress={()=>navigation.navigate('hindi')}>
        <Text style={{
          alignSelf: 'center',
          fontSize: 14,
          color: 'blue',
          marginTop: 5
        }}>Hindi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Urdu} onPress={()=>navigation.navigate('urdu')}>
        <Text style={{
          alignSelf: 'center',
          fontSize: 14,
          color: 'blue',
          marginTop: 5
        }}>Urdu</Text>
      </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView >
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View style={styles.surah}>
                  <Text style={styles.number}>{item.number}.</Text>
                  <Text style={styles.surahArabic}>{item.name}</Text>
                  <Text style={styles.surahEnglish}>{item.englishName},{item.englishNameTranslation}</Text>
                  <Text style={styles.verses}>Verses {item.numberOfAyahs}</Text>
                  <Text style={styles.revelation}>{item.revelationType}</Text>
                  {/* <FontAwesome
                name='heart-o'
                size={30}
                color={focused ? "black" : "#808080"}
                style={styles.iconheart} /> */}
                </View>
              )}
            />
          </ScrollView>
        )}
      </ScrollView >
    </View >
  )
}

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
    height: 130,
    width: 390,
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
    marginRight: 220,
    marginLeft: 0,
    fontSize: 22,
    fontWeight: '600',
  },
  surahEnglish: {
    marginTop: 2,
    marginLeft: 40,
    fontSize: 16,
    fontWeight: '700'
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
    borderWidth: 1
  },
  Hindi: {
    marginTop: -29,
    marginLeft: 155,
    height: 30,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 1
  },
  Urdu: {
    marginTop: -31,
    marginLeft: 295,
    height: 30,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'blue',
    borderWidth: 1
  },

})

export default Hindi;