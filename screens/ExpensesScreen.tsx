import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { IconButton, Card } from 'react-native-paper';
import { RootStackParamList } from '../App';
import { useExpenseContext } from '../ExpenseContext';
import { StackNavigationProp } from '@react-navigation/stack';
import ExpenseItem from '../ExpenseItem'; // Import ExpenseItem component

type ExpensesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const ExpensesScreen = () =>{
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const { expenses } = useExpenseContext();
    const navigation = useNavigation<ExpensesScreenNavigationProp>();

    const renderItem = ({ item }: { item: Expense }) => (
        <ExpenseItem item={item} />
    );

    const formattedDate = (date: string) => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    }

    const groupedExpenses = expenses.reduce((acc: { [key: string]: Expense[] }, expense) => {
        const formatted = formattedDate(expense.date);
        if (acc[formatted]) {
            acc[formatted].push(expense);
        } else {
            acc[formatted] = [expense];
        }
        return acc;
    }, {});

    return(
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <View style={styles.topContainer}>
                <TextInput
                    style={[styles.searchText, { borderColor: isSearchFocused ? '#102C57' : '#DAC0A3' }]}
                    placeholder="Search by Name or Category"
                    value={searchQuery}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)} 
                    onChangeText={setSearchQuery}
                />
            </View>
            <FlatList
                data={Object.entries(groupedExpenses)}
                renderItem={({ item }) => (
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{item[0]}</Text>
                        <FlatList
                            data={item[1]}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal
                        />
                    </View>
                )}
                keyExtractor={item => item[0]}
            />
            <TouchableOpacity
                testID='addButton'
                style={styles.button}
                onPress={() => {navigation.navigate('AddExpense')}}>
                <IconButton icon="plus"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    topContainer:{
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#FEFAF6', 
        marginTop: 20,
        paddingHorizontal: 10,
        zIndex: 1
    },
    searchText:{
        flex: 1, 
        borderWidth: 2, 
        borderRadius: 5, 
        padding: 10, 
        marginRight: 1
    },
    button:{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#DAC0A3',
        borderRadius: 50,
        padding: 8,
        elevation: 5,
        marginLeft: 10
    },
    dateContainer: {
        marginVertical: 10,
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default ExpensesScreen;
