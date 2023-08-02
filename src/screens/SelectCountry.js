import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';
import Fonts from '../helper/Fonts';

const SelectCountry = ({ navigation }) => {
    const [selectedCity, setSelectedCity] = useState('');

    const cities = [
        'Dallas',
    ];
 
    const onPressContinue = () => {
        if ((selectedCity !== 'Choose a city') && (selectedCity !== '')) {
            navigation.navigate("Services")
        }
    }

    const handleCountrySelect = (city) => {
        setSelectedCity(city);
    };
    console.log('selectedCity', selectedCity)
    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets/images/app_bg.webp')}
            style={styles.container}>
            <View style={styles.box}>
                <Text style={[styles.heading, Fonts.larMedium]}>Select your city:</Text>
                {(
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedCity}
                            onValueChange={(itemValue) => handleCountrySelect(itemValue)}
                        >
                            <Picker.Item key={0} label='Choose a city' value='Choose a city' />
                            {cities.map((city, index) => (
                                <Picker.Item key={index + 1} label={city} value={city} />
                            ))}
                        </Picker>
                    </View>
                )}

                <CustomButton
                    btnColor={((selectedCity !== 'Choose a city') && (selectedCity !== '')) ? Colors.buttoncolor : Colors.gray}
                    title={'Continue'}
                    onPressButton={onPressContinue}
                />

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spaces.xl,
    },
    imageStyle:
    {
        opacity: 0.4
    },
    box:
    {
        backgroundColor: Colors.white,
        padding: Spaces.med,
        borderRadius: 8
    },
    heading: {
        // fontSize: 24,
        // fontWeight: 'bold',
        marginBottom: Spaces.xl,
        color: "black"
    },
    countryBox: {
        borderWidth: 1,
        borderColor: Colors.outlineColor,
        borderRadius: 8,
        padding: Spaces.med,
        width: '100%',
        marginBottom: Spaces.xl,
    },
    selectedCity: {
        fontSize: 18,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    pickerContainer: {
        maxHeight: 200,
        borderColor: Colors.outlineColor,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
    },
});

export default SelectCountry;