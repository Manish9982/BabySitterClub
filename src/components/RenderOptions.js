import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'

const RenderOptions = ({ value: selectedValue, multipleSelection, onValueChange, data, visible, onClose, renderItem }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        // Set the default selected value when the component mounts
        if (!multipleSelection && selectedValue) {
            setSelectedItems([selectedValue]);
        }
    }, [multipleSelection, selectedValue]);

    const handleItemSelection = (item) => {
        if (multipleSelection) {
            const newSelection = selectedItems.includes(item) ?
                selectedItems.filter((selectedItem) => selectedItem !== item) :
                [...selectedItems, item];

            setSelectedItems(newSelection);
            onValueChange(newSelection);
        } else {
            setSelectedItems([item]);
            onValueChange(item);
            onClose();
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>

                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}><AntDesign name={"close"} size={18} color="red" /></Text>
                            </TouchableOpacity>
                            <FlatList
                                data={data}
                                renderItem={({ item }) => renderItem({ item, handleItemSelection, selectedItems })}
                                keyExtractor={(item, index) => index.toString()}
                            />

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '80%',
    },
    closeButton: {
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'red'
    },
    closeButtonText: {
        color: 'red',
    },
});

export default RenderOptions;
