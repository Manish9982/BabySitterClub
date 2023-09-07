import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton, Text } from 'react-native-paper';
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';
import { Picker } from '@react-native-picker/picker';
import { convertTo24HourFormat, formatDate, handleGetRequest, handlePostRequest } from '../helper/Utils';
import Loader from '../components/Loader';

const AddAvailabiltity_Sitter = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [repeatOption, setRepeatOption] = useState('');
    const [showPicker, setShowPicker] = useState(false)
    const [customDate, setCustomDate] = useState(new Date())
    const [chosenService, setChosenService] = useState({ "id": null, "service_name": "Choose Service" })
    const [filteredServices, setFilteredServices] = useState([])
    const [loader, setLoader] = useState(true)
    const [loaderButton, setLoaderButton] = useState(false)

    useEffect(() => {
        applyFilterToServices()
    }, [])

    const applyFilterToServices = async () => {
        const result = await handleGetRequest('filters')
        if (result?.status == '200') {
            setFilteredServices(result?.filters)
            setLoader(false)
        }
        else {
            Alert.alert('Error', result?.message)
        }
    }


    const handleStartTimeChange = (selectedTime) => {
        setStartTime(selectedTime);
        // Ensure end time is always greater than start time
        if (endTime <= selectedTime) {
            const newEndTime = new Date(selectedTime);
            newEndTime.setHours(selectedTime.getHours() + 1); // Ensuring at least a minute difference
            setEndTime(newEndTime);
        }
    };

    const handleEndTimeChange = (selectedTime) => {
        // Ensure end time is always greater than start time
        if (selectedTime <= startTime) {
            const newStartTime = new Date(selectedTime);
            newStartTime.setHours(selectedTime.getHours() - 1); // Ensuring at least a minute difference
            setStartTime(newStartTime);
        }
        setEndTime(selectedTime);
    };

    const addOneHourToTime = (timestamp) => {
        const originalDate = new Date(timestamp);
        originalDate.setHours(originalDate.getHours() + 1);
        const updatedDateTime = originalDate.toISOString();
        return updatedDateTime
    }

    const onPressPickerContainer = () => {
        setShowPicker(prev => !prev)
    }

    const onSelectService = (t) => {
        console.log("picker==>", t)
        setChosenService(prev => {
            return ({ ...prev, id: t })
        })
    }
    const onPressAddAvailability = async () => {
        setLoaderButton(true)
        var formdata = new FormData()
        formdata.append("date", formatDate(date));
        formdata.append("start_time", convertTo24HourFormat(startTime));
        formdata.append("end_time", convertTo24HourFormat(endTime));
        formdata.append("repeat", repeatOption);
        formdata.append("service_id", JSON.stringify(chosenService?.id));
        const result = await handlePostRequest('slot_availability', formdata)
        if (result?.status == '200') {
            Alert.alert('Availability added', result?.message)
            navigation.navigate('MyProfile_Sitter')
        }
        else {
            Alert.alert('Error', result?.message)
        }
        setLoaderButton(false)
    }
    return (
        loader
            ?
            <Loader />
            :
            <ScrollView
                style={styles.bg}
                contentContainerStyle={styles.container}>
                <Text style={styles.headingText}>Select Service:</Text>
                {
                    showPicker ?

                        <Picker
                            selectedValue={chosenService?.id}
                            onValueChange={onSelectService}
                            style={styles.pickerContainer}>
                            {
                                filteredServices?.map(item => <Picker.Item key={item?.id} value={item?.id} label={item?.service_name} />)
                            }
                        </Picker>
                        :
                        <TouchableOpacity
                            onPress={onPressPickerContainer}
                            style={styles.pickerLabelContainer}>
                            <Text style={{ ...Fonts.medBold }}>{chosenService?.service_name}</Text>
                        </TouchableOpacity>
                }
                <Text style={styles.headingText}>Select Date:</Text>
                <DateTimePicker
                    style={styles.datePicker}
                    value={date}
                    mode="date"
                    onChange={(event, selectedDate) => setDate(selectedDate)}
                />

                <View style={styles.durationContainer}>
                    <View style={styles.durationPicker}>
                        <Text style={[styles.headingText, { marginBottom: Spaces.vsm }]}>Start Time</Text>
                        <DateTimePicker
                            is24Hour={true}
                            themeVariant='light'
                            style={styles.timePicker}
                            value={startTime}
                            mode="time"
                            onChange={(event, selectedTime) => handleStartTimeChange(selectedTime)}
                        />
                    </View>
                    <View style={styles.dashContainer}>
                        {/* <Text style={styles.redText}>Min Duration:{'\n'}1 hour</Text> */}
                        <Text style={{ ...Fonts.larBold, alignSelf: 'center' }}>-</Text>
                    </View>
                    <View style={styles.durationPicker}>
                        <Text style={[styles.headingText, { marginBottom: Spaces.vsm }]}>End Time</Text>
                        <DateTimePicker
                            is24Hour={true}
                            minimumDate={new Date(startTime)}
                            themeVariant='light'
                            style={styles.timePicker}
                            value={endTime}
                            mode="time"
                            onChange={(event, selectedTime) => handleEndTimeChange(selectedTime)}
                        />
                    </View>
                </View>

                <Text style={styles.headingText}>Repeat:</Text>
                <RadioButton.Group onValueChange={(value) => setRepeatOption(prev => prev == value ? null : value)} value={repeatOption}>
                    <RadioButton.Item label="Everyday" value="everyday" />
                    <RadioButton.Item label="Every Week" value="everyweek" />
                    <RadioButton.Item label="Every Month" value="everymonth" />
                    {/* <RadioButton.Item label="Custom" value="custom" /> */}
                </RadioButton.Group>
                {
                    repeatOption == 'custom'
                    &&
                    <>
                        <Text style={styles.guideText}>Add a custom date where you want availability to be repeated</Text>
                        <DateTimePicker
                            style={styles.datePicker}
                            value={date}
                            mode="date"
                            onChange={(event, selectedDate) => setDate(selectedDate)}
                        />
                    </>
                }
                <CustomButton
                    loader={loaderButton}
                    onPressButton={onPressAddAvailability}
                    title={'Add Availability'} />
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingBottom: Spaces.xxl
    },
    bg:
    {
        flex: 1,
        backgroundColor: Colors.white
    },
    headingText: {
        ...Fonts.larBold,
        margin: Spaces.med,
    },
    datePicker: {
        alignSelf: 'flex-start'
    },
    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: Spaces.med,
        borderWidth: 0.6,
        padding: Spaces.med,
        borderRadius: 8,
        borderColor: Colors.PRIMARY
    },
    durationPicker: {
        //backgroundColor: Colors.PRIMARY,
        borderRadius: 8
    },
    timePicker: {
        alignSelf: 'flex-start',
        // backgroundColor:Colors.white,
        margin: Spaces.vsm,
        borderWidth: 0.8,
        borderRadius: 8,
        borderColor: Colors.white,
    },
    guideText:
    {
        ...Fonts.medBold,
        alignSelf: 'center',
        margin: Spaces.med
    },
    dashContainer:
    {
        justifyContent: 'center'
    },
    redText:
    {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'red',
        ...Fonts.sm
    },
    pickerLabelContainer:
    {
        borderWidth: 0.6,
        borderColor: Colors.PRIMARY,
        padding: Spaces.lar,
        margin: Spaces.sm,
        borderRadius: 8
    },
    pickerContainer:
    {
        borderWidth: 0.6,
        borderColor: Colors.PRIMARY,
        padding: Spaces.lar,
        margin: Spaces.sm,
        borderRadius: 8
    }

});

export default AddAvailabiltity_Sitter;
