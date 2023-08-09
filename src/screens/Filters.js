import React, { useState } from 'react';
import { Text, Divider, Checkbox } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';

const Filters = ({ navigation }) => {
    const [checkedItems, setCheckedItems] = useState({});

    // const handleCheckboxChange = (category, option) => {
    //     setCheckedItems((prevCheckedItems) => ({
    //         ...prevCheckedItems,
    //         [category]: {
    //             ...prevCheckedItems[category],
    //             [option]: !prevCheckedItems[category]?.[option] || true,
    //         },
    //     }));
    // };
    const handleCheckboxChange = (category, option) => {
        setCheckedItems((prevCheckedItems) => {
            const updatedCategory = {
                ...prevCheckedItems[category],
                [option]: !prevCheckedItems[category]?.[option],
            };

            return {
                ...prevCheckedItems,
                [category]: updatedCategory,
            };
        });
    };

    const onPressSubmit = () => {
        navigation.goBack()
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CategoryOptions
                category="type"
                title="Type of babysitter needed"
                options={['Babysitter', 'Nanny', 'Petsitter', 'Homekeeper']}
                checkedItems={checkedItems}
                onChange={handleCheckboxChange}
            />

            <Divider style={styles.divider} />

            <CategoryOptions
                category="age"
                title="Age of children"
                options={['Baby', 'Toddler', 'Preschooler', 'Gradeschooler', 'Teenager']}
                checkedItems={checkedItems}
                onChange={handleCheckboxChange}
            />

            <Divider style={styles.divider} />

            <CategoryOptions
                category="verification"
                title="Verifications"
                options={['Government ID', 'Has reviews or references']}
                checkedItems={checkedItems}
                onChange={handleCheckboxChange}
            />

            <Divider style={styles.divider} />

            <CategoryOptions
                category="location"
                title="Preferred babysitting location"
                options={['At the babysitter\'s', 'At the family']}
                checkedItems={checkedItems}
                onChange={handleCheckboxChange}
            />

            <Divider style={styles.divider} />

            <Text style={styles.header}>Minimum rate per hour</Text>
            <Slider style={styles.slider} />
            <CustomButton title={'Submit'}
                onPressButton={onPressSubmit}
            />
        </ScrollView>
    );
};

const CategoryOptions = ({ category, title, options, checkedItems, onChange }) => {
    console.log('checked items', checkedItems)
    return (
        <View>
            <Text style={styles.header}>{title}</Text>
            {options.map((option) => (
                <CheckboxItem
                    key={option}
                    label={option}
                    checked={checkedItems[category]?.[option]}
                    onChange={() => onChange(category, option)}
                />
            ))}
        </View>
    );
};

const CheckboxItem = ({ label, checked, onChange }) => {
    return (
        <View style={styles.checkboxContainer}>
            <Checkbox.Android
                color={Colors.blue}
                status={checked ? 'checked' : 'unchecked'}
                onPress={onChange}
            />
            <Text style={styles.option}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Spaces.lar,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
        marginBottom: 100,
        paddingBottom: 100,
    },
    header: {
        ...Fonts.medBold,
        marginBottom: Spaces.med,
    },
    option: {
        ...Fonts.med,
        marginBottom: 4,
    },
    divider: {
        marginVertical: Spaces.med,
    },
    slider: {
        marginTop: Spaces.med,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Filters;
