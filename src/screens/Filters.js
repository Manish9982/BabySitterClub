import React, { useState } from 'react';
import { Text, Divider, Checkbox } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { View, StyleSheet } from 'react-native';

const Filters = () => {
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (category, option) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [category]: {
                ...prevCheckedItems[category],
                [option]: !prevCheckedItems[category]?.[option] || true,
            },
        }));
    };

    return (
        <View style={styles.container}>
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

            <Text style={styles.header}>Minimum rate per hour</Text>
            <Slider style={styles.slider} />
        </View>
    );
};

const CategoryOptions = ({ category, title, options, checkedItems, onChange }) => {
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
                status={checked ? 'checked' : 'unchecked'}
                onPress={onChange}
            />
            <Text style={styles.option}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
        margin: 16,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    option: {
        fontSize: 14,
        marginBottom: 4,
    },
    divider: {
        marginVertical: 10,
    },
    slider: {
        marginTop: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Filters;
