import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';

const TimeSlotScreen = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);

    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
        timeSlots.push({ id: hour, time: `${hour}:00` });
    }

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };

    const renderItem = (item, index) => (
        <TouchableOpacity
            key={index}
            style={[
                styles.slotItem,
                selectedSlot === item.time && styles.selectedSlot,
            ]}
            onPress={() => handleSlotSelect(item.time)}
        >
            <Text style={styles.slotText}>{item.time}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.slots}>
                <FlatList
                    data={timeSlots}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderItem(item)}
                    numColumns={3}
                />
            </View>

            <TouchableOpacity
                style={styles.proceedButton}
                disabled={!selectedSlot}
                onPress={() => {
                    // Handle proceed button click here
                }}
            >
                <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    slotList: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    slotItem: {
        justifyContent: 'center',
        backgroundColor: Colors.COMPLEMENTARY_ORANGE,
        borderRadius: 5,
        alignItems: 'center',
        width: 100,
        height: 50,
        margin: Spaces.sm
    },
    selectedSlot: {
        backgroundColor: '#007bff',
    },
    slotText: {
        fontSize: 16,
        color: '#333',
    },
    proceedButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    slots:
    {
        borderWidth: 0.6,
        height: 400,
    }
});

export default TimeSlotScreen;
