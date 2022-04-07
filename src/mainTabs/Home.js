import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Home = ({ navigation }) => {
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
                            }}>Home</Text>
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
                <View style={styles.topbar}>
                    <FontAwesome5
                        name='quran'
                        size={30}
                        color={focused ? "black" : "#808080"}
                        style={styles.iconQuran}
                        onPress={() => navigation.navigate('about')} />
                    <FontAwesome5
                        name='calendar-alt'
                        size={30}
                        color={focused ? "black" : "#808080"}
                        style={styles.iconCalendar}
                        onPress={() => navigation.navigate('quran')} />
                    <FontAwesome5
                        name='calendar-alt'
                        size={30}
                        color={focused ? "black" : "#808080"}
                        style={styles.iconRamzan}
                        onPress={() => navigation.navigate('quran')} />
                </View>
                <View style={styles.verses}>
                    <Text style={styles.verseheader}> Verse</Text>
                    <Text style={styles.verseby}> By Cool & Cool</Text>
                    <Text style={styles.versesurat}> Surat-us-Saaffaat</Text>
                    <Text style={styles.ayat}> رَبِّ هَبْ لِى مِنَ ٱلصَّـٰلِحِينَ
                    </Text>
                    <Text style={styles.translate}>My Lord, grant me [a child] from among the righteous.</Text>
                </View>
                <View style={styles.umrah}>
                    <View style={{
                        backgroundColor: 'grey',
                        height: 130,
                        width: 140,
                        borderRadius: 10,
                        margin: 10,
                    }}>
                    </View>
                    <View style={{
                        margin: 10,
                        // backgroundColor: 'pink',
                        height: 130,
                        width: 215,
                        marginTop: -140,
                        marginLeft: 160,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'black'
                        }}>Umrah Guidance</Text>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: 'black'
                        }}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe dolore delectus placeat sint repudiandae ipsa ullam? Reprehenderit fugiat quod ad quos ipsa.
                        </Text>
                    </View>
                </View>
                <View style={styles.hajj}>
                    <View style={{
                        backgroundColor: 'grey',
                        height: 130,
                        width: 140,
                        borderRadius: 10,
                        margin: 10,
                    }}>

                    </View>
                    <View style={{
                        margin: 10,
                        // backgroundColor: 'pink',
                        height: 130,
                        width: 215,
                        marginTop: -140,
                        marginLeft: 160,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'black'
                        }}>Hajj Guidance</Text>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: 'black'
                        }}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe dolore delectus placeat sint repudiandae ipsa ullam? Reprehenderit fugiat quod ad quos ipsa.
                        </Text>
                    </View>
                </View>
                <View style={styles.wordsmean}>
                    <View style={{
                        backgroundColor: '#054c9c',
                        height: 150,
                        width: 150,
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                        margin: 0.5,
                        marginBottom: 10,
                    }}>
                    </View>
                    <View style={{
                        margin: 10,
                        // backgroundColor: 'pink',
                        height: 130,
                        width: 215,
                        marginTop: -140,
                        marginLeft: 160,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'black',
                            alignSelf: 'center',
                            marginTop: 5,
                        }}>AL-MUNTAQIM</Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '400',
                            color: 'black',
                            marginRight: 10,
                            marginTop: 15,
                        }}>
                            نہ فرمان کو سجہ دینے والا
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: 'black',
                            marginLeft: 10,
                            marginTop: 5,
                        }}>
                            The Avenger. The one who victoriously prevails.
                        </Text>
                    </View>
                </View>
            </ScrollView>
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
        height: 250,
        width: 425,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderBottomLeftRadius: 30,
    },
    topbar: {
        // backgroundColor: 'pink',
        height: 50,
        width: 411,
        marginTop: 10,
    },
    iconQuran: {
        marginLeft: 30,
        marginTop: 10,
    },
    iconCalendar: {
        marginLeft: 200,
        marginTop: -33,
    },
    iconRamzan: {
        marginLeft: 350,
        marginTop: -31,
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
    },
    verseheader: {
        marginTop: 20,
        marginLeft: 13,
        fontSize: 18,
        color: 'black'
    },
    verseby: {
        marginTop: 2,
        marginLeft: 15,
        fontSize: 14,
        color: 'blue'
    },
    versesurat: {
        marginTop: 2,
        marginLeft: 15,
        fontSize: 14,
        color: 'black'
    },
    ayat: {
        fontSize: 18,
        marginRight: 20,
        marginTop: 10,
        fontWeight: '700',
        color: 'black'
    },
    translate: {
        marginTop: 10,
        fontSize: 18,
        marginLeft: 20,
        fontWeight: '600',
        color: 'black',
    },
    umrah: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 150,
        width: 390,
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 20,
    },
    hajj: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 150,
        width: 390,
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 20,
    },
    wordsmean: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 150,
        width: 390,
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 20,
    },
})
export default Home;