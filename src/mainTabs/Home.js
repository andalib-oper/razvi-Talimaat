import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                {/* <ImageBackground
                    style={styles.image}
                    source={require('../../images/madina.png')}> */}
<Text style={{
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white'
}}>Home</Text>
                    <Text style={{
                        marginLeft: 50,
                        fontSize: 16,
                        // color: '#023c54',
                        color: 'white',
                        fontWeight: '600',
                        marginTop: 40,
                    }}>Now</Text>
                    <Text style={{
                        marginLeft: 50,
                        fontSize: 22,
                        fontWeight: '600',
                        color: 'white',
                        marginTop: 5,
                    }}>ISHA</Text>
                    <Ionicons name="moon" size={30} color='black'
                        style={{
                            marginLeft: 300,
                            marginTop: -55
                        }} />
                    <Text style={{
                        marginLeft: 350,
                        fontSize: 22,
                        marginRight: 10,
                        fontWeight: '600',
                        color: 'white',
                        marginTop: -30,
                    }}>3</Text>
                    <Text style={{
                        marginLeft: 236,
                        marginRight: 10,
                        fontSize: 18,
                        fontWeight: '600',
                        color: 'white',
                        marginTop: 10,
                    }}>Ramadan, 1443</Text>
                    <Text style={{
                        marginLeft: 295,
                        marginRight: 10,
                        fontSize: 18,
                        fontWeight: '600',
                        color: 'white',
                        marginTop: 5,
                    }}>Monday</Text>
                {/* </ImageBackground> */}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        // backgroundColor: '#ade0f5',
        backgroundColor: '#035173',
        height: 230,
        width: 420,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    image: {
        marginTop: -100,
        height: 350,
        width: 415,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 30,
    },
})
export default Home;