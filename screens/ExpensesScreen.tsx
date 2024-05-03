import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { RootStackParamList } from '../App';
import { useExpenseContext } from '../context/ExpenseContext';
import ExpenseItem from '../components/ExpenseItem';
import { StackNavigationProp } from '@react-navigation/stack';

type ExpensesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  userId: string;
}

const ExpensesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sortedExpensesTitle, setSortedExpensesTitle] = useState('All Expenses');
  const { expenses, loggedInUserId, deleteExpense } = useExpenseContext();
  const navigation = useNavigation<ExpensesScreenNavigationProp>();
  const animationValues = useRef(new Map()).current;
  const { setSelectedExpense } = useExpenseContext();
  const [isSortClicked, setIsSortClicked] = useState(false);

  useEffect(() => {
    console.log("Logged-in user expenses:", expenses.filter(expense => expense.userId === loggedInUserId));
  }, [expenses, loggedInUserId]);

  const animatedValue = (id: string) => {
    if (!animationValues.has(id)) {
      animationValues.set(id, new Animated.Value(0));
    }
    return animationValues.get(id);
  };

  const animateItemEntrance = (id: string) => {
    Animated.timing(animatedValue(id), {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    expenses.forEach(expense => {
      animateItemEntrance(expense.id);
    });
  }, [expenses]);

  const renderItem = ({ item }: { item: [string, Expense[]] }) => (
    <View style={styles.dateContainer}>
      <Text style={styles.date}>{formattedDate(item[0])}</Text>
      {item[1].map(expense => (
        <Animated.View
          key={expense.id}
          style={{
            opacity: animatedValue(expense.id),
            transform: [
              {
                translateY: animatedValue(expense.id).interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          }}
        >
          <ExpenseItem item={expense} onDelete={handleDelete} onEdit={handleEditClick} />
        </Animated.View>
      ))}
    </View>
  );

  const formattedDate = (date: string) => {
    return date;
  }

  const handleDelete = (id: string) => {
    deleteExpense(id);
  };

  const handleEditClick = (expense: Expense) => {
    setSelectedExpense(expense);
    navigation.navigate('AddExpense');
  };

  const filteredExpenses = expenses.filter(expense => expense.userId === loggedInUserId);

  const groupedExpenses = filteredExpenses.reduce((acc: { [key: string]: Expense[] }, expense) => {
    const formatted = formattedDate(expense.date);
    if (acc[formatted]) {
      acc[formatted].push(expense);
    } else {
      acc[formatted] = [expense];
    }
    return acc;
  }, {});

  const sortedGroupedExpenses = Object.entries(groupedExpenses).sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    return dateB.getTime() - dateA.getTime();
  });

  sortedGroupedExpenses.reverse();

  let filteredItems = sortedGroupedExpenses.filter(([date, expenses]) => {
    return expenses.some(expense =>
      expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (sortedExpensesTitle === 'High Expenses') {
    filteredItems = filteredItems.filter(([date, expenses]) => {
      return expenses.some(expense => expense.amount > 2000);
    });
  }

  const changeSortedExpensesTitle = () => {
    setIsSortClicked(!isSortClicked);
    const newTitle = sortedExpensesTitle === 'All Expenses' ? 'High Expenses' : 'All Expenses';
    setSortedExpensesTitle(newTitle);
    if (newTitle === 'High Expenses') {
      filteredItems = filteredItems.filter(([date, expenses]) => {
        return expenses.some(expense => expense.amount > 2000);
      });
    }
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <View style={styles.topContainer}>
        <TextInput
          style={[styles.searchText, { borderColor: isSearchFocused ? '#102C57' : '#AF8260' }]}
          placeholder="Search by Name or Category"
          value={searchQuery}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onChangeText={setSearchQuery}
        />
        <IconButton
        icon="sort"
        iconColor={isSortClicked ? '#102C57' : '#AF8260'}
        size={30}
        onPress={changeSortedExpensesTitle}/>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{sortedExpensesTitle}</Text>
      </View>
      {filteredItems.length === 0 ? (
        <View style={styles.noItemsContainer}>
          <Image source={require('../assets/no-items-found.png')} style={styles.noItemsImage} />
          <Text style={styles.noItemsText}>No items found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => renderItem({ item })}
          keyExtractor={item => item[0]}
        />
      )}
      <TouchableOpacity
        testID='addButton'
        style={styles.button}
        onPress={() => { navigation.navigate('AddExpense') }}>
        <IconButton icon="plus" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
    zIndex: 1
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  searchText: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginRight: 1
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#AF8260',
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
  noItemsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },  
  noItemsImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  noItemsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExpensesScreen;
