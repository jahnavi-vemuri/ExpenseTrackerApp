import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Card } from 'react-native-paper';
import { Expense } from './screens/ExpensesScreen';

interface ExpenseItemProps {
    item: Expense;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ item }) => {
    return (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.row}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.amountCategoryContainer}>
                            <Text style={styles.amount}>₹ {item.amount}</Text>
                            <Text style={styles.category}>{item.category}</Text>
                        </View>
                    </View>
                    <View style={styles.iconContainer}>
                        <IconButton
                            icon="pencil"
                            onPress={() => console.log('Edit')}
                            iconColor="white"
                        />
                        <IconButton
                            icon="delete"
                            onPress={() => console.log('Delete')}
                            iconColor="white"
                        />
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        backgroundColor: '#102C57',
        paddingVertical: 10,
        paddingHorizontal: 15,
        aspectRatio: 16 / 5, 
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ccc',
        marginBottom: 3,
    },
    amountCategoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        marginRight: 5,
    },
    category: {
        fontSize: 16,
        color: 'yellow',
        borderRadius: 5,
        padding: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
});

export default ExpenseItem;
