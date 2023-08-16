import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Divider, List, Text } from 'react-native-paper'
import { Searchbar } from 'react-native-paper'
import Spaces from '../helper/Spaces'

const CountryList = () => {

    const countries = [
        'United States',
        'Canada',
        'United Kingdom',
        'Australia',
        'India'
        // ... add more countries as needed
    ];

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCountries, setFilteredCountries] = useState(countries);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = countries.filter(country =>
            country.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCountries(filtered);
    };

    return (
        <View style={styles.container}>
            <Searchbar
                style={styles.searchBar}
                placeholder="Search"
                onChangeText={handleSearch}
                value={searchQuery}
            />
            <Divider />
            <FlatList
                data={filteredCountries}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                    <>
                        <List.Item
                            onPress={() => {}}
                            title={item} />
                        <Divider />
                    </>
                )}
            />
        </View>
    )
}

export default CountryList

const makeStyles = (H, W) => StyleSheet.create({
    container:
    {
        flex: 1
    },
    searchBar:
    {
        width: W * 0.9,
        alignSelf: 'center',
        margin: Spaces.sm
    }
})