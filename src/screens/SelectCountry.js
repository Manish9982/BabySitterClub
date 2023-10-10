import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';
import Fonts from '../helper/Fonts';
import { Text } from 'react-native-paper';

const SelectCountry = ({ navigation }) => {
    const [selectedCity, setSelectedCity] = useState('');

    const cities = [
        'Dallas',
    ];

    const onPressContinue = () => {
        if ((selectedCity !== 'Choose a city') && (selectedCity !== '')) {
            navigation.navigate("ChooseUserType")
        }
    }

    const handleCountrySelect = (city) => {
        setSelectedCity(city);
    };
    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets/images/background.png')}
            style={styles.container}>
            <View style={styles.box}>
                <Text style={[styles.heading, Fonts.xlSemiBold]}>Select your city</Text>
                {(
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={{
                                fontFamily: 'Poppins-Regular',
                                ...Fonts.med,
                                color: Colors.black
                            }}
                            selectedValue={selectedCity}
                            onValueChange={(itemValue) => handleCountrySelect(itemValue)}
                        >
                            <Picker.Item fontFamily='Poppins-Regular' key={0} label='Choose a city' value='Choose a city' />
                            {cities.map((city, index) => (
                                <Picker.Item fontFamily='Poppins-Regular' key={index + 1} label={city} value={city} />
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
        // opacity: 0.4
    },
    box:
    {
        backgroundColor: Colors.white,
        padding: Spaces.med,
        borderRadius: 8, elevation: 2
    },
    heading: {
        // fontSize: 24,
        // fontWeight: 'bold',
        marginBottom: Spaces.xl,
        textAlign: 'center',
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