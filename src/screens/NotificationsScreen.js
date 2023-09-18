import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';

const NotificationsScreen = () => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    // Dummy data for notifications (replace with actual data)
    const notifications = [
        { id: '1', message: 'Lorem ipsum dolor sit amet. ', image: 'https://img.freepik.com/premium-vector/pet-friendly-sign-stamp-with-paw-animal-icon-sticker-allowed-entrance-dog-cat_352905-715.jpg?w=1060', created: 'Sept 15th, 2023 at 9:52 AM' },
        { id: '2', message: 'Consectetur adipiscing A quick brown box jumped over a rock', image: 'https://img.freepik.com/premium-vector/pet-friendly-sign-stamp-with-paw-animal-icon-sticker-allowed-entrance-dog-cat_352905-715.jpg?w=1060', created: 'Sept 15th, 2023 at 9:52 AM' },
        { id: '3', message: 'Sed do eiusmod tempor incididunt.', image: 'https://img.freepik.com/premium-vector/pet-friendly-sign-stamp-with-paw-animal-icon-sticker-allowed-entrance-dog-cat_352905-715.jpg?w=1060', created: 'Sept 15th, 2023 at 9:52 AM' },
        // Add more notifications as needed
    ];

    const renderNotifications = ({ item }) => {
        return (
            <>
                <TouchableOpacity style={styles.notificationItem}>
                    <View style={styles.notificationContent}>
                        <View>
                            <Image source={{ uri: item?.image }}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.textView}>
                            <Text>{item.message}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.createdText}>{item?.created}</Text>
                    </View>
                </TouchableOpacity>
                <Divider style={styles.divider} />
            </>
        )
    }

    const styles = makeStyles(H, W)

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderNotifications}
            />
        </View>
    );
};

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    notificationItem: {

        padding: Spaces.med,
        paddingBottom: 0,
    },
    divider:
    {
        height: 1.2,
        backgroundColor: Colors.grayTransparent,
        marginVertical: 5,
    },
    notificationContent:
    {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    image:
    {
        height: H * 0.04,
        width: H * 0.04,
        marginRight: Spaces.med,
        borderRadius: 8,
    },
    createdText:
    {
        alignSelf: 'flex-end',
        ...Fonts.sm,
        color: Colors.gray
    },
    textView:
    {
        width: W * 0.8,
    }
});

export default NotificationsScreen;
