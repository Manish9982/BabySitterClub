import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Divider, RadioButton, Text } from 'react-native-paper';
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';

const AddAvailabiltity_Sitter = () => {
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [repeatOption, setRepeatOption] = useState('everyday');
    const [customDate, setCustomDate] = useState(new Date())

    const handleStartTimeChange = (selectedTime) => {
        setStartTime(selectedTime);
        // Ensure end time is always greater than start time
        if (endTime <= selectedTime) {
            const newEndTime = new Date(selectedTime);
            newEndTime.setMinutes(selectedTime.getMinutes() + 1); // Ensuring at least a minute difference
            setEndTime(newEndTime);
        }
    };

    const handleEndTimeChange = (selectedTime) => {
        // Ensure end time is always greater than start time
        if (selectedTime <= startTime) {
            const newStartTime = new Date(selectedTime);
            newStartTime.setMinutes(selectedTime.getMinutes() - 1); // Ensuring at least a minute difference
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

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
                    <Text style={styles.redText}>Min Duration:{'\n'}1 hour</Text>
                    <Text style={{ ...Fonts.larBold, alignSelf: 'center' }}>-</Text>
                </View>
                <View style={styles.durationPicker}>
                    <Text style={[styles.headingText, { marginBottom: Spaces.vsm }]}>End Time</Text>
                    <DateTimePicker
                        is24Hour={true}
                        minimumDate={new Date(addOneHourToTime(startTime))}
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
                <RadioButton.Item label="Custom" value="custom" />
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
            <CustomButton title={'Add Availability'} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        borderColor: Colors.PRIMARY_BLUE
    },
    durationPicker: {
        //backgroundColor: Colors.PRIMARY_BLUE,
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
    }

});

export default AddAvailabiltity_Sitter;
