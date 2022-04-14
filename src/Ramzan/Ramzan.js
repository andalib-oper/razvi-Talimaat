import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable,
  FlatList, Modal
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Ramzan = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>RAMZAN</Text>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Ramzan;