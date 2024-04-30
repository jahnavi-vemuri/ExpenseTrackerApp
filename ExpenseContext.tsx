import React, { createContext, useReducer, useContext, ReactNode } from 'react';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SET_EXPENSES = 'SET_EXPENSES';

interface Expense {
  date: string;
  id: string;
  title: string;
  description: string;
  amount: number;
  category: string;
}

interface ExpenseAction {
  type: string;
  payload: any;
}

interface ExpenseContextType {
  expenses: Expense[];
  dispatch: React.Dispatch<ExpenseAction>;
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
    {
      id: '1',
      title: 'Grocery Shopping',
      description: 'Weekly grocery shopping at Walmart',
      amount: 100,
      category: 'Groceries',
      date: '2024-04-29'
    },
    {
      id: '2',
      title: 'Movie Night',
      description: 'Watching a movie with friends',
      amount: 50,
      category: 'Entertainment',
      date: '2024-04-28'
    },
    {
      id: '3',
      title: 'Book Purchase',
      description: 'Buying novels from a bookstore',
      amount: 30,
      category: 'Education',
      date: '2024-04-30'
    },
  ]);

  return (
    <ExpenseContext.Provider value={{ expenses, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};
