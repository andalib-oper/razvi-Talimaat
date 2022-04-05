// import React from 'react';
// import {View,Text, StyleSheet} from 'react-native'

// const Quran = () =>{
//     return(
//         <View style={styles.container}>
//             <Text>
//                 Quran
//             </Text>
//         </View>
//     )
// }

// const styles=StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// })

// export default Quran;

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

export default Quran = () => {
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

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <Text>
              {item.number}, {item.name}, {item.englishName},{' '}
              {item.englishNameTranslation}, {item.numberOfAyahs},{' '}
              {item.revelationType}
            </Text>
          )}
        />
      )}
    </View>
  );
};
