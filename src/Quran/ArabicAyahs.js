import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ArabicAyahs = ({route}) => {
  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <Text
        style={{
          color: 'red',
          fontSize: 30,
        }}>
        {route.params.code}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ArabicAyahs;
