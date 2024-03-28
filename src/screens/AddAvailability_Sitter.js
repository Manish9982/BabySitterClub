import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Platform, useWindowDimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, RadioButton, Text } from 'react-native-paper';
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';
import { Picker } from '@react-native-picker/picker';
import { convertTo12HourFormat, convertTo24HourFormat, formatDate, formatDate_mmddyyyy, handleGetRequest, handlePostRequest } from '../helper/Utils';
import Loader from '../components/Loader';
import TextInputComponent from '../components/TextInputComponent';

const AddAvailability_Sitter = ({ navigation, route }) => {

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [date, setDate] = useState(new Date());
    const [showStartTimePicker, setShowStartTimePicker] = useState(false)
    const [startTime, setStartTime] = useState(new Date());
    const [showEndTimePicker, setShowEndTimePicker] = useState(false)
    const [endTime, setEndTime] = useState(new Date());
    const [repeatOption, setRepeatOption] = useState('');
    const [showPicker, setShowPicker] = useState(false)
    const [chosenService, setChosenService] = useState(null)
    const [filteredServices, setFilteredServices] = useState([])
    const [loader, setLoader] = useState(true)
    const [loaderButton, setLoaderButton] = useState(false)
    const [loaderForStartEndTime, setLoaderForStartEndTime] = useState(false)
    const [slotCheckData, setSlotCheckData] = useState(null)
    const [price, setPrice] = useState('')
    const [children, setChildren] = useState('1')
    const [children2, setChildren2] = useState('1')
    const [children3, setChildren3] = useState('1')
    const [children4, setChildren4] = useState('1')
    const [price1, setPrice1] = useState('1')
    const [price2, setPrice2] = useState('1')
    const [price3, setPrice3] = useState('1')
    const [price4, setPrice4] = useState('1')
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    const [visibleView, setVisibleView] = useState(null);
    const [inputs, setInputs] = useState([]);

    const [childrenValues, setChildrenValues] = useState(['1', '2', '3', '4']);
    const [priceValues, setPriceValues] = useState(['', '', '', '']);

    const handleToggleView = () => {
        setVisibleView(prevVisibleView => prevVisibleView + 1);
        setInputs([...inputs, { children: '', price: '' }]);
    };


    // Function to handle input change for children
    const handleChildrenChange = (text, index) => {
        let newChildrenValues = [...childrenValues];
        newChildrenValues[index] = text;
        setChildrenValues(newChildrenValues);
    };

    // Function to handle input change for price
    const handlePriceChange = (text, index) => {
        let newPriceValues = [...priceValues];
        newPriceValues[index] = text;
        setPriceValues(newPriceValues);
    };


    const handleMinusButton = (index) => {
        // Update visibleView to hide the last view
        setVisibleView(visibleView - 1);

        // Clear the input values for the specified index if the view is not visible
        if (index >= visibleView) {
            const newInputs = [...inputs];
            newInputs[index] = ''; // Clear the input values for the specified index
            setInputs(newInputs);
        }
    };




    useEffect(() => {
        applyFilterToServices()
    }, [])

    useEffect(() => {
        checkSlots()
    }, [startTime, endTime, date, chosenService])


    const checkSlots = async () => {
        setLoaderForStartEndTime(true)
        var formdata = new FormData()
        formdata.append("date", formatDate(date));
        formdata.append("start_time", convertTo24HourFormat(startTime));
        formdata.append("end_time", convertTo24HourFormat(endTime));
        formdata.append("service_id", JSON.stringify(chosenService?.id));
        const result = await handlePostRequest('slot_check', formdata)
        console.log("slot check====>", result)
        setSlotCheckData(result)
        setLoaderForStartEndTime(false)
    }

    const applyFilterToServices = async () => {
        const result = await handleGetRequest('filters')
        if (result?.status == '200') {
            console.log("result?.filters==>", result)
            setFilteredServices(result?.filters)
            if (route?.params?.service == 1) {
                //babysitter
                setChosenService({ "id": 1, "service_name": "Baby Sitter" })
            }
            else if (route?.params?.service == 2) {
                //petsitter
                setChosenService({ "id": 2, "service_name": "Pet Sitter" })
            }
            else if (route?.params?.service == 3) {
                //homesitter
                setChosenService({ "id": 3, "service_name": "Home Sitter" })
            }
            else {
                setChosenService(result?.filters[0])
            }
            setLoader(false)
        }
        else {
            Alert.alert('Error', result?.message)
        }
    }

    const handleStartTimeChange = (selectedTime) => {
        setShowStartTimePicker(false)
        setStartTime(selectedTime);
        // Ensure end time is always greater than start time
        // if (endTime <= selectedTime) {
        //     const newEndTime = new Date(selectedTime);
        //     newEndTime.setHours(selectedTime.getHours() + 1); // Ensuring at least a minute difference
        //     setEndTime(newEndTime);
        // }
    };

    const handleEndTimeChange = (selectedTime) => {
        setShowEndTimePicker(false)
        // Ensure end time is always greater than start time
        // if (selectedTime <= startTime) {
        //     const newStartTime = new Date(selectedTime);
        //     newStartTime.setHours(selectedTime.getHours() - 1); // Ensuring at least a minute difference
        //     setStartTime(newStartTime);
        // }
        setEndTime(selectedTime);
    };

    const onPressPickerContainer = () => {
        setShowPicker(prev => !prev)
    }

    // const handlePriceChange = (t) => {
    //     if (t?.length < 4 && (!isNaN(t)) && (!(t?.charAt(0) == '0'))) {
    //         setPrice(t)
    //     }
    //     else if (t?.charAt(0) == '0') {
    //         setPrice('')
    //     }
    // }

    const onSelectService = (t) => {
        console.log("picker==>", t)
        setChosenService(prev => {
            return ({ ...prev, id: t })
        })
    }
    const onPressAddAvailability = async () => {

        // if (price == '') {
        //     Alert.alert('Price Missing', 'Kindly add your hourly price to add your slot')
        // }
        // else {
        //     setLoaderButton(true)
        //     var formdata = new FormData()
        //     formdata.append("date", formatDate(date));
        //     formdata.append("start_time", convertTo24HourFormat(startTime));
        //     formdata.append("end_time", convertTo24HourFormat(endTime));
        //     formdata.append("repeat", repeatOption);
        //     // formdata.append("hour_price", price);
        //     formdata.append("children", childrenValues);
        //     formdata.append("hour_price", priceValues);
        //     formdata.append("service_id", JSON.stringify(chosenService?.id));
        //     const result = await handlePostRequest('slot_availability', formdata)
        //     if (result?.status == '200') {
        //         Alert.alert('Availability added', result?.message)
        //         navigation.goBack()
        //     }
        //     else {
        //         Alert.alert('Error', result?.message)
        //     }
        //     setLoaderButton(false)
        // }

        setLoaderButton(true)
        var formdata = new FormData()
        formdata.append("date", formatDate(date));
        formdata.append("start_time", convertTo24HourFormat(startTime));
        formdata.append("end_time", convertTo24HourFormat(endTime));
        formdata.append("repeat", repeatOption);
        // formdata.append("hour_price", price);
        formdata.append("children", JSON.stringify(childrenValues)); // Serialize the array to a string
        formdata.append("hour_price", JSON.stringify(priceValues));
        formdata.append("service_id", JSON.stringify(chosenService?.id));
        const result = await handlePostRequest('slot_availability', formdata)
        console.log("CHILDREN VALUES", childrenValues)
        console.log("PRICE VALUES", priceValues)
        if (result?.status == '200') {
            Alert.alert('Availability added', result?.message)
            navigation.goBack()
        }
        else {
            Alert.alert('Error', result?.message)
        }
        setLoaderButton(false)

    }
    console.log("route?.params?.service ====>", route?.params?.service)
    console.log("chosenService ====>", chosenService)
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
                    <Picker
                        //itemStyle={{ color: 'black' }}
                        //selectionColor={'black'}
                        selectedValue={chosenService?.id}
                        onValueChange={onSelectService}
                        style={styles.pickerContainer}
                    >
                        {
                            filteredServices?.map(item => <Picker.Item key={item?.id} value={item?.id} label={item?.service_name} />)
                        }
                    </Picker>
                }
                <Text style={styles.headingText}>Select Date:</Text>

                {
                    Platform.OS == "android"
                    &&
                    <TouchableOpacity
                        style={[styles.datetext, Fonts.medMedium]}
                        onPress={() => setShowDatePicker(prev => !prev)}>
                        <Text style={[Fonts.lar]}>{formatDate_mmddyyyy(date)}</Text>
                    </TouchableOpacity>
                }
                {
                    Platform.OS == 'android'
                        ?
                        showDatePicker
                        &&
                        <DateTimePicker
                            style={styles.datePicker}
                            value={date}
                            mode="date"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false)
                                setDate(selectedDate)
                            }}
                        />
                        :
                        <DateTimePicker
                            style={styles.datePicker}
                            value={date}
                            mode="date"
                            onChange={(event, selectedDate) => setDate(selectedDate)}
                        />
                }

                <View style={styles.durationContainer}>
                    <View style={styles.durationPicker}>
                        <Text style={[styles.headingText, { marginBottom: Spaces.vsm }]}>Start Time</Text>

                        {
                            Platform.OS == "android"
                            &&
                            <TouchableOpacity
                                style={styles.timetext}

                                onPress={() => setShowStartTimePicker(prev => !prev)}>
                                <Text
                                    numberOfLines={1}
                                    style={[Fonts.lar]}>{convertTo12HourFormat(convertTo24HourFormat(startTime))}</Text>
                            </TouchableOpacity>
                        }

                        {
                            Platform.OS == 'android'
                                ?
                                showStartTimePicker
                                &&
                                <DateTimePicker
                                    themeVariant='light'
                                    style={styles.timePicker}
                                    value={startTime}
                                    mode="time"
                                    onChange={(event, selectedTime) => handleStartTimeChange(selectedTime)}
                                />
                                :
                                <DateTimePicker
                                    themeVariant='light'
                                    style={styles.timePicker}
                                    value={startTime}
                                    mode="time"
                                    onChange={(event, selectedTime) => handleStartTimeChange(selectedTime)}
                                />
                        }

                    </View>
                    <View style={styles.dashContainer}>
                        {
                            loaderForStartEndTime
                                ?
                                <ActivityIndicator color={Colors.Secondary} />
                                :
                                <Text style={slotCheckData?.status == '200' ? styles.greenText : styles.redText}>{slotCheckData?.message}</Text>
                        }

                        <Text style={{ ...Fonts.larBold, alignSelf: 'center' }}>-</Text>
                    </View>
                    <View style={styles.durationPicker}>
                        <Text style={[styles.headingText, { marginBottom: Spaces.vsm }]}>End Time</Text>

                        {
                            Platform.OS == "android"
                            &&
                            <TouchableOpacity
                                style={[styles.timetext]}
                                onPress={() => setShowEndTimePicker(prev => !prev)}>
                                <Text
                                    numberOfLines={1}
                                    style={[Fonts.lar]}>{convertTo12HourFormat(convertTo24HourFormat(endTime))}</Text>
                            </TouchableOpacity>
                        }



                        {
                            Platform.OS == 'android'
                                ?
                                showEndTimePicker
                                &&
                                <DateTimePicker
                                    minimumDate={new Date(startTime)}
                                    themeVariant='light'
                                    style={styles.timePicker}
                                    value={endTime}
                                    mode="time"
                                    onChange={(event, selectedTime) => handleEndTimeChange(selectedTime)}
                                />
                                :
                                <DateTimePicker
                                    minimumDate={new Date(startTime)}
                                    themeVariant='light'
                                    style={styles.timePicker}
                                    value={endTime}
                                    mode="time"
                                    onChange={(event, selectedTime) => handleEndTimeChange(selectedTime)}
                                />
                        }

                    </View>
                </View>


                <View style={styles.horizontalContainer}>

                </View>


                <Text style={styles.sectionHeader}>No of children and Price</Text>

                {/* 1st view */}
                {/* <View style={styles.horizontalContainer}>
                <TextInputComponent
                    keyboardType='numeric'
                    placeholder={"Children 1"}
                    style={styles.input}
                    onChangeText={text => handleInputChange(text, 0, 'children')} />

                <TextInputComponent
                    keyboardType='numeric'
                    placeholder={"Price ($)"}
                    style={styles.input} 
                    onChangeText={text => handleInputChange(text, 0, 'price')}/>

                <TouchableOpacity style={styles.textBackground} onPress={handleToggleView}>
                    <Text style={styles.sectionHeader}>+</Text>
                </TouchableOpacity>

                {visibleView > 1 && (
                    <TouchableOpacity style={styles.textBackgroundMinus} onPress={handleMinusButton}>
                        <Text style={styles.sectionHeader}>-</Text>
                    </TouchableOpacity>
                )}
            </View> */}

                {/* 2nd view */}
                {/* {visibleView >= 2 && (
                <View style={styles.horizontalContainer}>
                    <TextInputComponent
                        keyboardType='numeric'
                        placeholder={"Children 2"}
                        style={styles.input} 
                        onChangeText={text => handleInputChange(text, index + 1, 'children')}/>

                    <TextInputComponent
                        keyboardType='numeric'
                        placeholder={"Price ($)"}
                        style={styles.input} 
                        onChangeText={text => handleInputChange(text, index + 1, 'price')}/>

                    <TouchableOpacity style={styles.textBackground} onPress={handleToggleView}>
                        <Text style={styles.sectionHeader}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.textBackgroundMinus} onPress={handleMinusButton}>
                        <Text style={styles.sectionHeader}>-</Text>
                    </TouchableOpacity>
                </View>
            )} */}

                {/* 3rd view */}
                {/* {visibleView >= 3 && (
                <View style={styles.horizontalContainer}>
                    <TextInputComponent
                        keyboardType='numeric'
                        placeholder={"Children 3"}
                        style={styles.input} 
                        onChangeText={text => handleInputChange(text, index + 1, 'children')}/>

                    <TextInputComponent
                        keyboardType='numeric'
                        placeholder={"Price ($)"}
                        style={styles.input}
                        onChangeText={text => handleInputChange(text, index + 1, 'price')}/>

                    <TouchableOpacity style={styles.textBackground} onPress={handleToggleView}>
                        <Text style={styles.sectionHeader}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.textBackgroundMinus} onPress={handleMinusButton}>
                        <Text style={styles.sectionHeader}>-</Text>
                    </TouchableOpacity>
                </View>
            )
            } */}
                {/* 4th */}
                {/* {visibleView >= 4 && (
                <View style={styles.horizontalContainer}>
                    <TextInputComponent
                        keyboardType='numeric'
                        placeholder={"Children 4"}
                        style={styles.input} 
                        onChangeText={text => handleInputChange(text, index + 1, 'children')}/>

                    <TextInputComponent
                        keyboardType='numeric'
                        placeholder={"Price ($)"}
                        style={styles.input}
                        onChangeText={text => handleInputChange(text, index + 1, 'price')} />

                    <TouchableOpacity style={styles.textBackground} onPress={handleToggleView}>
                        <Text style={styles.sectionHeader}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.textBackgroundMinus} onPress={handleMinusButton}>
                        <Text style={styles.sectionHeader}>-</Text>
                    </TouchableOpacity>
                </View>
            )
            } */}



                <View>
                    <View style={styles.horizontalContainer1}>
                        <TextInputComponent
                            editable={false}
                            keyboardType='numeric'
                            placeholder={"Children 1"}
                            style={styles.input}
                            onChangeText={text => handleChildrenChange(text, 0)}
                            value={childrenValues[0]} />

                        <TextInputComponent
                            keyboardType='numeric'
                            placeholder={"Price ($)"}
                            style={styles.input}
                            onChangeText={text => handlePriceChange(text, 0)}
                            value={priceValues[0]} />

                        <TouchableOpacity style={styles.textBackground} onPress={handleToggleView}>
                            <Text
                                onPress={handleToggleView}
                                style={styles.sectionHeader}>+</Text>
                        </TouchableOpacity>
                    </View>

                    {visibleView >= 2 && (
                        <View style={styles.horizontalContainer}>
                            <TextInputComponent
                                editable={false}
                                keyboardType='numeric'
                                placeholder={"Children 2"}
                                style={styles.input}
                                onChangeText={text => handleChildrenChange(text, 1)}
                                value={childrenValues[1]} />

                            <TextInputComponent
                                keyboardType='numeric'
                                placeholder={"Price ($)"}
                                style={styles.input}
                                onChangeText={text => handlePriceChange(text, 1)}
                                value={priceValues[1]} />

                            <TouchableOpacity style={styles.textBackground} onPress={handleToggleView}>
                                <Text
                                    onPress={handleToggleView}
                                    style={styles.sectionHeader}>+</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.textBackgroundMinus} onPress={handleMinusButton}>
                                <Text onPress={handleMinusButton}
                                    style={styles.sectionHeader}>-</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {visibleView >= 3 && (
                        <View style={styles.horizontalContainer}>
                            <TextInputComponent
                                editable={false}
                                keyboardType='numeric'
                                placeholder={"Children 3"}
                                style={styles.input}
                                onChangeText={text => handleChildrenChange(text, 2)}
                                value={childrenValues[2]} />

                            <TextInputComponent
                                keyboardType='numeric'
                                placeholder={"Price ($)"}
                                style={styles.input}
                                onChangeText={text => handlePriceChange(text, 2)}
                                value={priceValues[2]} />

                            <TouchableOpacity style={styles.textBackground} onPress={handleToggleView}>
                                <Text
                                    onPress={handleToggleView}
                                    style={styles.sectionHeader}>+</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.textBackgroundMinus} onPress={handleMinusButton}>
                                <Text onPress={handleMinusButton}
                                    style={styles.sectionHeader}>-</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {visibleView >= 4 && (
                        <View style={styles.horizontalContainer1}>
                            <TextInputComponent
                                editable={false}
                                keyboardType='numeric'
                                placeholder={"Children 4+"}
                                style={styles.input}
                                onChangeText={text => handleChildrenChange(text, 3)}
                                value={childrenValues[3]} />

                            <TextInputComponent
                                keyboardType='numeric'
                                placeholder={"Price ($)"}
                                style={styles.input}
                                onChangeText={text => handlePriceChange(text, 3)}
                                value={priceValues[3]} />



                            <TouchableOpacity style={styles.textBackgroundMinus} onPress={handleMinusButton}>
                                <Text
                                    onPress={handleMinusButton}
                                    style={styles.sectionHeader}>-</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>




                {/* <Text style={styles.sectionHeader}>Hourly Rate (Per Hour)</Text>
                <TextInputComponent
                    keyboardType='numeric'
                    value={price}
                    maxlength={3}
                    onChangeText={(text) => {
                          handlePriceChange(text)
                    }}
                    placeholder={"USD ($)"}
                    style={styles.input} /> */}

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
                    disabled={loaderForStartEndTime || slotCheckData?.status !== 200}
                    btnColor={(loaderForStartEndTime || slotCheckData?.status !== 200) ? Colors.grayTransparent : Colors.PRIMARY}
                    onPressButton={onPressAddAvailability}
                    title={'Add Availability'} />
            </ScrollView>
    );
};

const makeStyles = (H, W) => StyleSheet.create({
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
        margin: Spaces.sm,
    },
    datePicker: {
        alignSelf: 'flex-start'
    },
    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: Spaces.sm,
        borderWidth: 0.6,
        padding: Spaces.sm,
        borderRadius: 8,
        borderColor: Colors.PRIMARY
    },
    durationPicker: {
        //backgroundColor: Colors.PRIMARY,
        borderRadius: 8,
        alignItems: "center"
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
        margin: Spaces.sm
    },
    dashContainer:
    {
        justifyContent: 'center',
        // marginTop:H*0.017,
        width: W * 0.3
    },
    redText:
    {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'red',
        ...Fonts.sm
    },
    greenText:
    {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'green',
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
        color: Colors.black,
        borderWidth: 0.6,
        borderColor: Colors.PRIMARY,
        padding: Spaces.lar,
        margin: Spaces.sm,
        borderRadius: 8,
        //placeholderTextColor: Colors.black
    },


    datetext: {
        borderColor: Colors.LIGHT_SILVER,
        backgroundColor: Colors.LIGHT_SILVER,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: W * 0.03,
        textAlign: 'center',
        alignItems: 'center',
        paddingHorizontal: Spaces.sm,
        alignSelf: 'flex-start'
    },
    timetext: {
        borderColor: Colors.LIGHT_SILVER,
        backgroundColor: Colors.LIGHT_SILVER,
        borderWidth: 1,
        //width: W * 0.25,
        borderRadius: 5,
        marginHorizontal: W * 0.03,
        textAlign: 'center',
        alignItems: 'center',
        paddingHorizontal: Spaces.sm,
    },
    sectionHeader: {
        ...Fonts.larBold,
        marginTop: Spaces.sm,
        marginBottom: Spaces.sm,
        margin: Spaces.sm,
    },
    textBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20, // half of width and height to make it a circle
        backgroundColor: 'green',
    },
    textBackgroundMinus: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20, // half of width and height to make it a circle
        backgroundColor: 'red',
    },
    addText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },

    horizontalContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 15,
        alignItems: 'center'
    },
    horizontalContainer1:
    {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 15,
        marginEnd: 55,
        alignItems: 'center'
    },
    input: {
        marginBottom: Spaces.sm,
        width: W * 0.3
    },

});


export default AddAvailability_Sitter;
