import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import { ExpenseProvider } from './context/ExpenseContext';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Expenses: undefined;
  AddExpense: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ExpenseProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Expenses" component={ExpensesScreen} />
        <Stack.Screen  name="AddExpense" component={AddExpenseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ExpenseProvider>
  );
}


