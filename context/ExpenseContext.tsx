import React, { createContext, useReducer, useContext, ReactNode, useState } from 'react';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SET_EXPENSES = 'SET_EXPENSES';

export interface Expense {
  date: string;
  id: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  userId: string; 
}

interface ExpenseAction {
  type: string;
  payload: any;
}

interface ExpenseContextType {
  expenses: Expense[];
  dispatch: React.Dispatch<ExpenseAction>;
  loggedInUserId: string;
  setLoggedInUserId: React.Dispatch<React.SetStateAction<string>>;
  deleteExpense: (id: string) => void;
  editExpense: (expense: Expense) => void;
  selectedExpense: Expense | null;
  setSelectedExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};

const expenseReducer = (state: Expense[], action: ExpenseAction) => {
  switch (action.type) {
    case SET_EXPENSES:
      return action.payload;
    case ADD_EXPENSE:
      return [...state, action.payload];
    case DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== action.payload);
    case EDIT_EXPENSE:
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
    default:
      return state;
  }
};

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, dispatch] = useReducer(expenseReducer, [
  ]);

  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const [loggedInUserId, setLoggedInUserId] = useState('');

  const deleteExpense = (id: string) => {
    dispatch({ type: DELETE_EXPENSE, payload: id });
  };

  const editExpense = (editedExpense: Expense) => {
    dispatch({ type: EDIT_EXPENSE, payload: editedExpense });
  };

  return (
    <ExpenseContext.Provider value={{ expenses, dispatch, loggedInUserId, setLoggedInUserId, deleteExpense, editExpense, selectedExpense, setSelectedExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};