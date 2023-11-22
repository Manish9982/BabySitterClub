
import { Alert, FlatList, ImageBackground, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Chip, Searchbar, Text } from 'react-native-paper'
import BabySitterCard from '../components/BabySitterCard';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { convertTimeRangeTo12HourFormat, formatDate, formatDate_mmddyyyy, handlePostRequest } from '../helper/Utils';
import { useIsFocused } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import { DatePickerModal } from 'react-native-paper-dates';

const SearchBabySitter_Parent = ({ navigation }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const [filterdata, setFilterdata] = useState([])
    const [babySittersData, setBabySittersData] = useState([])
    const [loader, setLoader] = useState(false)
    const [users, setUsers] = useState([])
    const [searchText, setSearchText] = useState("")
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [open, setOpen] = useState(false);

    const selectedService = useSelector(state => state.global.selectedService)

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getUsers()
        }
    }, [isFocused, range])

    const onDismiss = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirm = useCallback(
        ({ startDate, endDate }) => {
            setOpen(false);
            setRange({ startDate, endDate });
            console.log("Range===>", { startDate, endDate })
        },
        [setOpen, setRange]
    );

    const getUsers = async () => {
        setLoader(true)
        var formdata = new FormData()
        formdata.append('start_date', formatDate(range?.startDate, true))
        formdata.append('end_date', formatDate(range?.endDate))
        const result = await handlePostRequest('filter_users', formdata)
        setBabySittersData(result)

        if (result?.status == '200') {
            setBabySittersData(result)
            setUsers(result?.users)
        }
        setLoader(false)
    }
    const handleFavourite = async (Id) => {
        const formdata = new FormData()
        formdata.append('userId', Id)
        const result = await handlePostRequest('add_fav', formdata)
        if (result?.status == '200') {
            //Alert.alert("Alert", result?.message)
            getUsers()
        } else if (result?.status == '201') {
            Alert.alert("Alert", result?.message)
        }
    };

    const handleNavigation = (userid, roleid) => {
        navigation.navigate("ProfileOfSitterDuringBooking_Parent", { 'userID': userid, bookingDate: JSON.stringify(range) })
    }

    const throwChipSelection = (name) => {
        if (filterdata?.includes(name)) {
            return true
        }
    }

    const onPressChip = (name) => {
        if (filterdata?.includes(name)) {
            setFilterdata(prev => prev?.filter(item => item !== name))
        }
        else {
            setFilterdata(prev => [...prev, name])
        }
    }

    function haveCommonElements(arr1, arr2) {
        for (let i = 0; i < arr1?.length; i++) {
            for (let j = 0; j < arr2?.length; j++) {
                if (arr1[i] === arr2[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    const renderBabysitterCard = ({ item }) => {
        if ((haveCommonElements(filterdata, item?.service) || filterdata?.length == 0) && (item?.name?.toLowerCase()?.includes(searchText?.toLowerCase()))) {
            return (
                <BabySitterCard
                    rating={item?.rating}
                    profilePicture={`${babySittersData?.url}${item?.profilePicture}`}
                    name={item?.name}
                    description={item?.description}
                    hourlyPrice={item?.hourlyPrice}
                    isFavourite={item?.isFavourite}
                    onPressFavourite={() => handleFavourite(item?.Id)}
                    onPressItemSelected={() => handleNavigation(item?.Id)}
                />
            )
        }
    }

    const renderfilters = ({ item }) => {
        return (
            <Chip
                style={styles.chip}
                selectedColor={Colors.blue}
                onPress={() => onPressChip(item.service_name)}
                selected={throwChipSelection(item.service_name)}
            >{item.service_name}</Chip>
        )
    }

    const onPressFilter = () => {
        navigation.navigate('Filters')
    }

    return (
        loader
            ?
            <Loader />
            :
            <ImageBackground
                source={require('../assets/images/background.png')}
                style={{ flex: 1 }}>
                <View style={styles.upperconatiner}>
                    {/* <Text >Hello, James</Text> */}
                    <Text style={[styles.textQuery, Fonts.medMedium]}>When would you like to schedule a sitter?</Text>

                    {/* <CustomDateTimePicker
                        labelAndroid={'Choose Date'}
                        show={showPicker}
                        style={styles.datePicker}
                        value={bookingDate}
                        onChangeAndroid={onChangeAndroidPicker}
                        onChangeIos={onChangeIosPicker}
                        minimumDate={new Date()}
                    /> */}
                    <Button style={styles.button} onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                        {(range?.startDate && range?.endDate) ? `${formatDate_mmddyyyy(range.startDate, true)} - ${formatDate_mmddyyyy(range.endDate)}` : 'Pick Start and End Date'}
                    </Button>

                    <DatePickerModal
                        validRange={{ startDate: new Date() }}
                        locale="en"
                        mode="multiple"
                        visible={open}
                        onDismiss={onDismiss}
                        startDate={range.startDate}
                        endDate={range.endDate}
                        onConfirm={onConfirm}
                        style={{
                            backgroundColor: 'red'
                        }}
                    />
                    <Searchbar
                        loading={false}
                        mode='bar'
                        placeholder='Search'
                        style={[styles.searchBar, Fonts.medMedium]}
                        onChangeText={(text) => setSearchText(text)}
                    />
                    {
                        babySittersData?.status == '200' &&
                        <View style={styles.uppercontainer2}>
                            <FlatList
                                horizontal={true}
                                data={babySittersData?.filters}
                                renderItem={renderfilters}
                                keyExtractor={(item) => item.id}
                            />

                        </View>
                    }

                </View>
                {
                    babySittersData?.users?.length == 0
                        ?
                        range?.endDate ?
                            <Text style={styles.nothingToShow}>Please select a date range to see results.</Text>
                            :
                            <Text style={styles.nothingToShow}>No Sitters are available for this date range. Kindly try splitting your range to see results</Text>
                        :
                        <FlatList
                            data={users}
                            renderItem={renderBabysitterCard}
                            keyExtractor={(item) => item.Id}
                        />
                }

            </ImageBackground>
    );
};

export default SearchBabySitter_Parent

const makeStyles = (H, W) => StyleSheet.create({

    upperconatiner: {
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        padding: Spaces.vsm,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    uppercontainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: Spaces.sm,

    },

    searchBar:
    {
        width: W * 0.9,
        height: H * 0.07,
        marginVertical: Spaces.sm
    },
    filterBox:
    {
        borderWidth: 0.6,
        borderColor: Colors.buttoncolor,
        alignSelf: 'flex-end',
        margin: Spaces.sm,
        padding: Spaces.sm,
        borderRadius: 8,
        backgroundColor: Colors.white,
    },
    text:
    {
        ...Fonts.medBold
    },
    nothingToShow:
    {
        alignSelf: 'center',
        marginTop: H * 0.3,
        textAlign:'center',
        marginHorizontal:W*0.05,
    },
    horizontal:
    {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    textQuery:
    {
        marginTop: Spaces.sm,
        color: Colors.black
    },
    datePicker:
    {
        marginBottom: Spaces.sm
    },
    chip:
    {
        // margin:5
    },
    button:
    {
        backgroundColor: Colors.white
    }
})
