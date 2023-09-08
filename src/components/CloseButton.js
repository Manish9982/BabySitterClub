import { View, Text, Touchable, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { ActivityIndicator } from 'react-native-paper'
import { handlePostRequest } from '../helper/Utils'

const CloseButton = ({ onPress, size = 20, id, callBack }) => {
    const [loader, setLoader] = useState(false)

    const deleteSlot = async (deleteValue) => {
        setLoader(true)
        var formdata = new FormData()
        formdata.append("slot_id", id);
        formdata.append("all_data", deleteValue);
        const result = await handlePostRequest('delete_slot', formdata)
        if (result?.status == '200') {
            await callBack()
            setLoader(false)
        }
    }


    const showDeletPopup = async () => {

        Alert.alert('Delete Slot Alert', "Delete this slot availability or want to delete all future slot availability also?", [
            {
                text: 'Delete All',
                onPress: () => { deleteSlot("true") },
                style: 'cancel',
               
            },

            { text: 'Delete', onPress: () => deleteSlot("false") },
        ],
        {
            cancelable: true,
        }
        
        );
    }


    return (
        <TouchableOpacity
            disabled={loader}
            style={styles.closeButton}
            onPress={() => showDeletPopup()}>
            {loader ?
                <ActivityIndicator size={size} color='red' />
                :
                <AntDesign name='closecircleo' color='red' size={size} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    closeButton:
    {
        alignSelf: 'flex-end'
    }
})

export default CloseButton