import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { ADD_EXPENSE, EDIT_EXPENSE, useExpenseContext } from '../context/ExpenseContext';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons';
import { API_URLS} from "../constants/apiConstants";

type AddExpenseScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const AddExpenseScreen = () =>{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const navigation = useNavigation<AddExpenseScreenNavigationProp>();
    const { dispatch, loggedInUserId, setSelectedExpense, selectedExpense } = useExpenseContext();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [isOtherCategory, setIsOtherCategory] = useState(false);


    const formatDate = (date: Date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    const handleDateConfirm = (date: Date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    useEffect(() => {
        if (selectedExpense) {
            setTitle(selectedExpense.title);
            setDescription(selectedExpense.description);
            setAmount(selectedExpense.amount.toString());
            const categoryItem = data.find(item => item.label === selectedExpense.category);
            if (categoryItem) {
                setCategory(categoryItem.value);
            } else {
                setCategory(null);
            }
            setSelectedDate(moment(selectedExpense.date, 'DD/MM/YYYY').toDate());
            navigation.setOptions({ title: 'Update Expense' });
        }
        else{
            navigation.setOptions({ title: 'Add Expense' });
        }
    }, [selectedExpense]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSelectedExpense(null);
            };
        }, [])
    );

    const data = [
        { label: 'Gadgets', value: '1' },
        { label: 'Entertainment', value: '2' },
        { label: 'Education', value: '3' },
        { label: 'Groceries', value: '4' },
        { label: 'Clothes', value: '5' },
        { label: 'Rent', value: '6' },
        { label: 'Bills', value: '7' },
        { label: 'Food', value: '8' },
        { label: 'Other', value: 'other' },
    ];

    const handleCategoryChange = (item: { value: React.SetStateAction<string | null>; }) => {
        if (item.value === 'other') {
            setIsOtherCategory(true);
        } else {
            setIsOtherCategory(false);
            setCategory(item.value);
        }
    };

    function handleSaveExpense(): void {
        if (!title || !description || !amount || !category || !selectedDate) {
            Alert.alert("Please fill all the fields");
            return;
        }
        const expense = {
            id: selectedExpense ? selectedExpense.id : Math.random().toString(36).substr(2, 9),
            title,
            description,
            amount: parseFloat(amount), 
            category: category ? data.find(item => item.value === category)?.label : '',
            date: selectedDate ? formatDate(selectedDate) : new Date().toLocaleDateString(),
            userId: loggedInUserId,
        };
    
        const actionType = selectedExpense ? EDIT_EXPENSE : ADD_EXPENSE; 
        dispatch({ type: actionType, payload: expense });
    
        if (selectedExpense) {
            updateExpenseOnServer(expense);
        } else {
            addExpenseToServer(expense);
        }
        setSelectedExpense(null);
        navigation.navigate('Expenses');
    }
    
    function addExpenseToServer(expense: {
            id: string; 
            title: string; 
            description: string; 
            amount: number; 
            category: string | undefined; date: string;
            userId: string;
        }) {
        fetch(`${API_URLS.BASE_URL}${API_URLS.EXPENSES}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Added Expense:', expense);
        })
        .catch(error => {
            console.error('Error adding expense:', error);
        });
    }
    
    function updateExpenseOnServer(expense: { id: any; title?: string; description?: string; amount?: number; category?: string | undefined; date?: string; userId?: string; }) {
        fetch(`${API_URLS.BASE_URL}${API_URLS.USERS}/${expense.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Updated Expense:', expense);
        })
        .catch(error => {
            console.error('Error updating expense:', error);
        });
    }

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <View style={styles.datetimeContainer}>
                <TextInput
                style={styles.datetime}
                placeholder="Date"
                editable={false}
                value={selectedDate ? formatDate(selectedDate) : ''}
                />
               <TouchableOpacity onPress={() => setShowCalendar(true)}>
                <Icon name="calendar-outline" size={50} color="#102C57" />
               </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Amount in Rs"
                value={amount}
                onChangeText={setAmount}
            />
            {isOtherCategory ? (
    <TextInput
        style={styles.input}
        placeholder="Enter Custom Category"
        value={category || ''} // Make sure this always has a string value
        onChangeText={(text) => setCategory(text)}
    />
) : (
    <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Category' : '...'}
        searchPlaceholder="Search..."
        value={category}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleCategoryChange}
    />
)}
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleSaveExpense()} >
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
                {selectedExpense ? 'Save' : 'Add'}
                </Text>
            </TouchableOpacity>
            <DateTimePickerModal
            isVisible={showCalendar}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setShowCalendar(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        margin: 16, 
        backgroundColor: '#FEFAF6'
    },
    input: {
        borderColor: '#102C57',
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 10,
        fontSize: 16,
        padding: 16, 
        marginBottom: 10,
        color: '#102C57', // Text color
    },
    button:{
        backgroundColor: "#102C57",
        borderRadius: 6,
        paddingVertical: 12,
        marginVertical: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },
    dropdown: {
        height: 50,
        borderColor: '#102C57',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 8,
        padding: 25,
        borderStyle: "solid",
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: '#DAC0A3',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'gray',
        paddingLeft: 11
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    datetimeContainer:{
        flexDirection: "row",
        alignItems: "center"
      },
    datetime:{
        flex:1,
        borderColor: '#102C57',
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 10,
        fontSize: 16,
        padding: 16, 
        marginBottom: 10
      },
});

export default AddExpenseScreen;
