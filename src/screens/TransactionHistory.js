import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use other icon libraries as well
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';
import { handleGetRequest } from '../helper/Utils';


const TransactionCard = ({ transaction }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>Transaction ID: {transaction?.transaction_id}</Text>
            <Text>Name: {transaction?.first_name} {transaction?.last_name}</Text>
            <Text>Booking ID: {transaction?.b_id}</Text>
            <Text style={styles.amount}>Amount: ${transaction?.amount}</Text>
            <Text>Payment Method: {transaction?.payment_method}</Text>
            <Text>Booking Slot: {transaction?.bookingSlot}</Text>
            <Text>{transaction?.transaction_status}</Text>
        </View>
    )
}

const TransactionHistory = ({ navigation }) => {

    const [transactions, setTransactions] = useState(null)

    useEffect(() => {
        getTransactionDetails()
    }, [])

    const getTransactionDetails = async () => {
        const result = await handleGetRequest('get_transaction')
        //console.log('Transaction===>', result)
        if (result?.status == '200') {
            setTransactions(result)
        }
        else {
            Alert.alert('Info', result?.message, [
                {
                    text: 'Ok',
                    onPress: () => navigation.goBack()
                }
            ])
        }
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={transactions?.data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LIGHT_GRAY,
        padding: Spaces.sm,
    },
    card: {
        borderWidth: 1,
        borderColor: Colors.DEEP_GRAY,
        borderRadius: 8,
        backgroundColor: Colors.SUBTLE_WHITE,
        padding: Spaces.sm,
        marginBottom: Spaces.sm,
    },
    name: {
        color: Colors.black,
        fontWeight: 'bold',
    },
    amount: {
        ...Fonts.medBold,
        color: Colors.DARK_BLUE,
    },
    paymentStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spaces.sm,
    },
});

export default TransactionHistory;
