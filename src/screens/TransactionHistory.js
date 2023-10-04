import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use other icon libraries as well
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';
import { handleGetRequest } from '../helper/Utils';


const TransactionCard = ({ transaction }) => (
    <View style={styles.card}>
        <Text style={styles.name}>Name: {transaction.name}</Text>
        <Text>Transaction ID: {transaction?.transaction_id}</Text>
        <Text style={styles.amount}>Amount: ${transaction?.amount}</Text>
        <Text>Payment Method: {transaction?.payment_method}</Text>
        <Text>Booking Slot: {transaction.bookingSlot}</Text>
        <View style={styles.paymentStatus}>
            <Icon
                name={transaction.paymentStatus === 'confirmed' ? 'check-circle' : 'exclamation-circle'}
                size={20}
                color={transaction.paymentStatus === 'confirmed' ? Colors.MUTED_GREEN : Colors.COMPLEMENTARY_ORANGE}
            />
            <Text
                style={{
                    color: transaction.paymentStatus === 'confirmed' ? Colors.MUTED_GREEN : Colors.COMPLEMENTARY_ORANGE,
                }}
            >
                {transaction.paymentStatus === 'confirmed' ? 'Confirmed' : 'Pending'}
            </Text>
        </View>
    </View>
);

const TransactionHistory = () => {

    const [transactions, setTransactions] = useState(null)

    useEffect(() => {
        getTransactionDetails()
    }, [])

    const getTransactionDetails = async () => {
        const result = await handleGetRequest('get_transaction')
        console.log('Transaction===>', result)
        setTransactions(result)
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
        padding: Spaces.med,
    },
    card: {
        borderWidth: 1,
        borderColor: Colors.DEEP_GRAY,
        borderRadius: 8,
        backgroundColor: Colors.SUBTLE_WHITE,
        padding: Spaces.med,
        marginBottom: Spaces.med,
    },
    name: {
        color: Colors.buttoncolor,
        fontWeight: 'bold',
        marginBottom: Spaces.sm,
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
