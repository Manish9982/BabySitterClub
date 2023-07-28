import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';

const SelectCountry = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const countries = [
        'United States',
        'United Kingdom',
        'Canada',
        'Australia',
        'India',
        'Germany',
        // Add more countries as needed
    ];

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
       // setShowPicker(false); // Hide the picker after a country is selected
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Select your country:</Text>
            <TouchableOpacity
                style={styles.countryBox}
                onPress={() => setShowPicker(!showPicker)}
            >
                <Text style={styles.selectedCountry}>{selectedCountry || 'Choose a country'}</Text>
            </TouchableOpacity>
            {showPicker && (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCountry}
                        onValueChange={(itemValue) => handleCountrySelect(itemValue)}
                    >
                        {countries.map((country, index) => (
                            <Picker.Item key={index} label={country} value={country} />
                        ))}
                    </Picker>
                </View>
            )}
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => console.log('Continue button pressed')}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
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
    continueButton: {
        backgroundColor: Colors.blue,
        paddingVertical: Spaces.med,
        paddingHorizontal: Spaces.xl,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
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