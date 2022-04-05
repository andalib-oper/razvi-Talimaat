import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const Home = () => {
    return (
        <View style={styles.container}>
            <View 
            // style={styles.topContainer}
            >
                <ImageBackground
                    style={styles.image}
                    source={require('../../images/2.png')}>
                        <View>
                        <Text style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        fontSize: 22,
                        color: 'white',
                        fontWeight: '600',
                        marginTop: -100,
                        marginBottom: 10,
                    }}>Home</Text>
                        </View>
                    <Text style={{
                        textAlign: 'left',
                        marginLeft: -340,
                        fontSize: 16,
                        // color: '#023c54',
                        color: 'white',
                        fontWeight: '600',
                        marginTop: -60,
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
                    <FontAwesome name="moon-o" size={30} color='black'
                        style={{
                            marginLeft: 250,
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
                </ImageBackground>
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
        marginTop: 0,
        height: 270,
        width: 425,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderBottomLeftRadius: 30,
    },
})
export default Home;