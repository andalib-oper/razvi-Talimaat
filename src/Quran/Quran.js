import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SwitchSelector from "react-native-switch-selector";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const data = [
    {
        "nameArabic": "فتح",
        "nameEnglish": "Surat-Ul-Fateha",
        "verses": "Verses 7"
    },
    {
        "nameArabic": "فتح",
        "nameEnglish": "Surat-Ul-Fateha",
        "verses": "Verses 7"
    },
    {
        "nameArabic": "فتح",
        "nameEnglish": "Surat-Ul-Fateha",
        "verses": "Verses 7"
    },
    {
        "nameArabic": "فتح",
        "nameEnglish": "Surat-Ul-Fateha",
        "verses": "Verses 7"
    },
    {
        "nameArabic": "فتح",
        "nameEnglish": "Surat-Ul-Fateha",
        "verses": "Verses 7"
    },
]
const Quran = () => {
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
                <View>
                    <SwitchSelector
                        initial={0}
                        style={styles.switchselector}
                        // onPress={value => this.setState({ gender: value })}
                        textColor="#0303e0" //'#7a44cf'
                        selectedColor="white"
                        buttonColor="#0303e0"
                        borderColor="#0303e0"
                        hasPadding
                        options={[
                            { label: "English", }, //images.feminino = require('./path_to/assets/img/feminino.png')
                            { label: "Hindi", },
                            { label: "Urdu", } //images.masculino = require('./path_to/assets/img/masculino.png')
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                    />
                </View>
                    {/* {data.map((item) => { */}
                <View>
                        <View style={styles.surah}>
                            <Text style={styles.surahArabic}>
                                {/* {item.nameArabic}</Text> */}
                                فتح</Text>
                            <Text style={styles.surahEnglish}>
                                {/* {item.nameEnglish}</Text> */}
                                Surat-Ul-Fateha</Text>
                            <Text style={styles.verses}>
                                {/* {item.verses}</Text> */}
                                Verses 7</Text>
                            <FontAwesome
                                name='heart-o'
                                size={30}
                                color={focused ? "black" : "#808080"}
                                style={styles.iconheart} />
                        </View>
                </View>
                <View>
                        <View style={styles.surah}>
                            <Text style={styles.surahArabic}>
                                {/* {item.nameArabic}</Text> */}
                                فتح</Text>
                            <Text style={styles.surahEnglish}>
                                {/* {item.nameEnglish}</Text> */}
                                Surat-Ul-Fateha</Text>
                            <Text style={styles.verses}>
                                {/* {item.verses}</Text> */}
                                Verses 7</Text>
                            <FontAwesome
                                name='heart-o'
                                size={30}
                                color={focused ? "black" : "#808080"}
                                style={styles.iconheart} />
                        </View>
                </View>
                <View>
                        <View style={styles.surah}>
                            <Text style={styles.surahArabic}>
                                {/* {item.nameArabic}</Text> */}
                                فتح</Text>
                            <Text style={styles.surahEnglish}>
                                {/* {item.nameEnglish}</Text> */}
                                Surat-Ul-Fateha</Text>
                            <Text style={styles.verses}>
                                {/* {item.verses}</Text> */}
                                Verses 7</Text>
                            <FontAwesome
                                name='heart-o'
                                size={30}
                                color={focused ? "black" : "#808080"}
                                style={styles.iconheart} />
                        </View>
                </View>
                <View>
                        <View style={styles.surah}>
                            <Text style={styles.surahArabic}>
                                {/* {item.nameArabic}</Text> */}
                                فتح</Text>
                            <Text style={styles.surahEnglish}>
                                {/* {item.nameEnglish}</Text> */}
                                Surat-Ul-Fateha</Text>
                            <Text style={styles.verses}>
                                {/* {item.verses}</Text> */}
                                Verses 7</Text>
                            <FontAwesome
                                name='heart-o'
                                size={30}
                                color={focused ? "black" : "#808080"}
                                style={styles.iconheart} />
                        </View>
                </View>
                    {/* // })} */}
            </ScrollView>
        </View>
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
        height: 100,
        width: 390,
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 20,
    },
    surahArabic: {
        marginTop: 10,
        marginRight: 340,
        fontSize: 20,
        fontWeight: '600',
    },
    surahEnglish: {
        marginTop: 2,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: '700'
    },
    verses: {
        marginTop: 2,
        fontSize: 14,
        marginLeft: 20,
    },
    iconheart: {
        marginLeft: 330,
        marginTop: -51,
    },
})

export default Quran;