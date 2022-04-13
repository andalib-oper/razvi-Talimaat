import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const Quran = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topnav}>
        <MaterialIcons name="arrow-back"
                    size={40}
                    color='white'
                    style={styles.icon}
                    onPress={() => navigation.goBack()} />
          <Text style={styles.topnavtext}>Quran</Text>
        </View>
      <TouchableOpacity
        style={styles.English}
        onPress={() => navigation.navigate('arabic')}>
        <View style={styles.verses}>
          <Image
            style={{
              height: 130,
              width: 140,
              borderRadius: 10,
              margin: 10,
            }}
            source={{
              uri: 'https://www.linkpicture.com/q/quran.png',
            }}
          />
          <Text style={styles.translate}>Arabic Version</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.English}
        onPress={() => navigation.navigate('english')}>
        <View style={styles.verses}>
          <Image
            style={{
              height: 130,
              width: 140,
              borderRadius: 10,
              margin: 10,
            }}
            source={{
              uri: 'https://www.linkpicture.com/q/quran.png',
            }}
          />
          <Text style={styles.translate}>English Version</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.English}
        onPress={() => navigation.navigate('urdu')}>
        <View style={styles.verses}>
          <Image
            style={{
              height: 130,
              width: 140,
              borderRadius: 10,
              margin: 10,
            }}
            source={{
              uri: 'https://www.linkpicture.com/q/quran.png',
            }}
          />
          <Text style={styles.translate}>Urdu Version</Text>
        </View>
      </TouchableOpacity>
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
  verses: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 200,
    width: 390,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 20,
    // display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'column',
    alignItems: 'center',
  },
  verseheader: {
    marginTop: 20,
    marginLeft: 13,
    fontSize: 18,
    color: 'black',
  },
  verseby: {
    marginTop: 2,
    marginLeft: 15,
    fontSize: 14,
    color: 'blue',
  },
  versesurat: {
    marginTop: 2,
    marginLeft: 15,
    fontSize: 14,
    color: 'black',
  },
  ayat: {
    fontSize: 18,
    marginRight: 20,
    marginTop: 10,
    fontWeight: '700',
    color: 'black',
  },

  translate: {
    // marginTop: 10,
    fontSize: 18,
    // marginLeft: 15,
    fontWeight: '600',
    color: 'black',
  },
});

export default Quran;
