import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';

export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <Text>
        Ramzan 12
      </Text>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  }
})