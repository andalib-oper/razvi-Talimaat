import React from 'react';
import {View,Text, StyleSheet} from 'react-native'

const Quran = () =>{
    return(
        <View style={styles.container}>
            <Text>
                Quran
            </Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Quran;