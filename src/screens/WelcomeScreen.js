import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Text } from 'react-native-paper';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';

const slides = [
    {
        key: 1,
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: require('../assets/images/account.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('../assets/images/account.png'),
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../assets/images/account.png'),
        backgroundColor: '#22bcb5',
    }
];

export default function WelcomeScreen({ navigation }) {
    const [showRealApp, setShowRealApp] = useState(false)

    const renderItem = ({ item, index }) => {
        switch (index) {
            case 0: {
                return (
                    <ImageBackground
                        source={{ uri: 'https://images.pexels.com/photos/2731820/pexels-photo-2731820.jpeg?auto=compress&cs=tinysrgb&w=600' }}
                        style={[styles.container,]}>
                        <Text
                            style={[styles.heading, { marginTop: '40%', marginBottom: '10%' }]}>
                            Welcome to SitterSphere.
                        </Text>
                        <Text style={styles.text}>
                            Our all-in-one sitting solution! From babies to fur babies, and everything in between, we've got you covered. Find trusted sitters, book with ease, and enjoy peace of mind wherever life takes you. Let's get sitting!
                        </Text>
                    </ImageBackground>

                )
            }
            case 1: {
                return (
                    <ImageBackground
                        source={require('../assets/images/background.png')}
                        style={styles.container2}>
                        <Text>Coming Soon..</Text>
                    </ImageBackground>
                )
            }
            case 2: {
                return (
                    <ImageBackground
                        source={require('../assets/images/background.png')}
                        style={styles.container3}>
                        <Text>Coming Soon..</Text>
                    </ImageBackground>
                );
            }
            default: {
                break;
            }

        }


    }
    const onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        navigation.navigate('SelectCountry')
    }

    const renderDoneButton = () => {
        return (
            <View style={styles.doneButton}>
                <Text style={styles.doneText}>DONE</Text>
            </View>
        )
    }
    const renderNextButton = () => {
        return (
            <View style={styles.doneButton}>
                <Text style={styles.doneText}>Proceed</Text>
            </View>
        )

    }

    return (
        <AppIntroSlider
            renderItem={renderItem}
            renderNextButton={renderNextButton}
            activeDotStyle={styles.activeDotStyle}
            data={slides}
            renderDoneButton={renderDoneButton}
            onDone={onDone} />
    )
}

const styles = StyleSheet.create({
    image: {
        height: '30%',
        width: '50%',
        resizeMode: 'contain',
        backgroundColor: 'red'
    },
    container:
    {
        flex: 1,
        alignItems: 'center'
    },
    container2:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container3:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading:
    {
        fontSize: 25,
        //fontWeight: '700',
        fontFamily: "Poppins-SemiBold",
        textAlign: 'center',
        color: 'white',
        //textShadowColor: Colors.Secondary,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 }, // Adjust the width and height as needed
        textShadowRadius: 2,
    },
    text:
    {
        color: 'white',
        margin: 10,
        lineHeight: 25,
        //textShadowColor: Colors.Secondary,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 }, // Adjust the width and height as needed
        textShadowRadius: 2,
    },
    doneButton:
    {
        backgroundColor: Colors.selectedcolor,
        padding: 5,
        borderRadius: 8,
    },
    doneText: {
        color: '#fff'
    },
    activeDotStyle:
    {
        backgroundColor: Colors.selectedcolor
    }
})