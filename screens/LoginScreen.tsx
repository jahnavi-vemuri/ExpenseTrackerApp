import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../App';
import { useExpenseContext } from '../context/ExpenseContext';
import { API_URLS } from '../constants/apiConstants';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { dispatch, setLoggedInUserId } = useExpenseContext();
  const [focusedField, setFocusedField] = useState('');

  const handleLogin = async () => {
    try {
        const response = await fetch(`${API_URLS.BASE_URL}${API_URLS.USERS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const users = await response.json();
        const user = users.find((user: any) => user.username === username && user.password === password);

        if (user) {
            setLoggedInUserId(user.id);
            setUsername(''); 
            setPassword('');
            console.log('Logged in user id:', user.id);
            console.log('Logged in username:', user.username);
            navigation.navigate('Expenses');
        } else {
            Alert.alert('Login failed', 'Invalid username or password');
        }
    } catch (error) {
        console.error('Error:', error);
        Alert.alert('Login failed', 'Please check your internet connection and try again');
    }
};

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: focusedField === 'username' ? '#102C57' : '#AF8260' }]}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
        onFocus={() => setFocusedField('username')}
        onBlur={() => setFocusedField('')}
      />
      <View style={[styles.passwordContainer, { borderColor: focusedField === 'password' ? '#102C57' : '#AF8260' }]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={text => setPassword(text)}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField('')}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}
        >
          <MaterialIcons name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{ color: '#102C57', textDecorationLine: 'underline' }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFAF6',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#102C57',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    padding: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderColor: '#102C57',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    padding: 16,
  },
  eyeIcon: {
    padding: 10
  },
  button: {
    backgroundColor: '#102C57',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginScreen;