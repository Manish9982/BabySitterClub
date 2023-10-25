import React, { useState } from 'react';
import { View, TextInput, FlatList, Alert } from 'react-native';
import { Text } from 'react-native-paper';

const API_KEY = 'AIzaSyAiLpu932j2g8W6nfKLmQsxdpobCUYWXo8';
const PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

const AutoCompleteScreen = () => {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState([]);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length > 1) {
      const url = `${PLACES_API_BASE}?input=${text}&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.status === 'OK') {
          setPredictions(result.predictions);
        } else {
          setPredictions([]);
        }
      } catch (error) {
        Alert.alert('Error fetching address: ', error);
      }
    } else {
      setPredictions([]);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search Places"
        onChangeText={handleSearch}
        value={query}
      />
      <FlatList
        data={predictions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.description}</Text>
        )}
      />
    </View>
  );
};

export default AutoCompleteScreen;