import React, { useState, useEffect } from 'react';
import { Text, Divider, Checkbox } from 'react-native-paper';
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';
import { handlePostRequest } from '../helper/Utils';

const Filters = ({ navigation }) => {
    const [checkedItems, setCheckedItems] = useState({});
    const [filterdata, setFilterdata] = useState()

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


    useEffect(() => {
 //   getFilters()
    }, [])
    

    const getFilters = async () => {
        const result = await handlePostRequest('filters', formdata)
        setFilterdata(result)
        setLoader(false)
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

            {/* <Divider style={styles.divider} /> */}

            {/* <CategoryOptions
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
            <Slider style={styles.slider} /> */}
            <CustomButton title={'Submit'}
                onPressButton={onPressSubmit}
            />
        </ScrollView>
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
                color={Colors.Secondary}
                status={checked ? 'checked' : 'unchecked'}
                onPress={onChange}
            />
            <Text style={styles.option}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: Spaces.lar,
        backgroundColor: 'white'
    },
    header: {
        ...Fonts.medBold,
        marginBottom: Spaces.sm,
    },
    option: {
        ...Fonts.med,
        marginBottom: 4,
    },
    divider: {
        marginVertical: Spaces.sm,
    },
    slider: {
        marginTop: Spaces.sm,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Filters;
