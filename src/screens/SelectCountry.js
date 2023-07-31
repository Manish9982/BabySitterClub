import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';

const SelectCountry = ({navigation}) => {
    const [selectedCountry, setSelectedCountry] = useState('');

    const countries = [
        'United States',
        'United Kingdom',
        'Canada',
        'Australia',
        'India',
        'Germany',
    ];

    const onPressContinue = () => {
      navigation.navigate("Login")
    }

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Select your country:</Text>
            {(
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCountry}
                        onValueChange={(itemValue) => handleCountrySelect(itemValue)}
                    >
                        <Picker.Item key={0} label='Choose a country' value='Choose a country' />
                        {countries.map((country, index) => (
                            <Picker.Item key={index + 1} label={country} value={country} />
                        ))}
                    </Picker>
                </View>
            )}

            <CustomButton
                title={'Continue'}
                onPressButton={onPressContinue}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spaces.xl,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: Spaces.xl,
    },
    countryBox: {
        borderWidth: 1,
        borderColor: Colors.outlineColor,
        borderRadius: 8,
        padding: Spaces.med,
        width: '100%',
        marginBottom: Spaces.xl,
    },
    selectedCountry: {
        fontSize: 18,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    pickerContainer: {
        width: '100%',
        maxHeight: 200,
        borderColor: Colors.outlineColor,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
    },
});

export default SelectCountry;