import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../App';
import { API_URLS } from '../constants/apiConstants';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match");
      return;
    }
    if (username.length < 6) {
      Alert.alert('Username must be at least 6 characters long');
      return;
    }
  
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters long');
      return;
    }
  
    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Please enter a valid Gmail address');
      return;
    }
    //check whether simulator has network access - iOS
    // try {
    //   const networkState = await Network.getNetworkStateAsync();
    //   console.log(networkState.isConnected, networkState.isInternetReachable, networkState.type)
    //   if (!networkState.isConnected || !networkState.isInternetReachable) {
    //     Alert.alert('No internet connection');
    //     return;
    //   }
    //   Alert.alert('You are connected to the internet');
    // } catch (error) {
    //   console.error('Error:', error);
    //   Alert.alert('Failed to check internet connection');
    // }
    // await Network.getIpAddressAsync();
    try {
      const response = await fetch(`${API_URLS.BASE_URL}${API_URLS.USERS}`);
      const users = await response.json();

    const existingUsername = users.find((user: any) => user.username === username);
    if (existingUsername) {
      Alert.alert('Username already exists. Please choose a different username');
      return;
    }

    const existingEmail = users.find((user: any) => user.email === email);
    if (existingEmail) {
      Alert.alert('Email already exists. Please enter a different email');
      return;
    }
    const registerResponse = await fetch(`${API_URLS.BASE_URL}${API_URLS.USERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (registerResponse.ok) {
      navigation.navigate('Login');
    } else {
      Alert.alert('Registration failed');
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Registration failed');
  }
  };   

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: focusedField === 'username' ? '#102C57' : '#AF8260' }]}
        placeholder="Username(min 6 chars)"
        onChangeText={text => setUsername(text)}
        value={username}
        onFocus={() => setFocusedField('username')}
        onBlur={() => setFocusedField('')}
      />
      <TextInput
      style={[styles.input, { borderColor: focusedField === 'email' ? '#102C57' : '#AF8260' }]}
      placeholder="Gmail address"
      onChangeText={text => setEmail(text)}
      value={email}
      keyboardType="email-address"
      autoCapitalize="none"
      onFocus={() => setFocusedField('email')}
      onBlur={() => setFocusedField('')}/>
<View style={[styles.passwordContainer, { borderColor: focusedField === 'password' ? '#102C57' : '#AF8260' }]}>
  <TextInput
    style={styles.passwordInput}
    placeholder="Enter Password (min 6 chars)"
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

<View style={[styles.passwordContainer, { borderColor: focusedField === 'confirmPassword' ? '#102C57' : '#AF8260' }]}>
  <TextInput
    style={styles.passwordInput}
    placeholder="Confirm Password"
    secureTextEntry={!isConfirmPasswordVisible}
    value={confirmPassword}
    onChangeText={text => setConfirmPassword(text)}
    onFocus={() => setFocusedField('confirmPassword')}
    onBlur={() => setFocusedField('')}
  />
  <TouchableOpacity
    style={styles.eyeIcon}
    onPress={toggleConfirmPasswordVisibility}
  >
    <MaterialIcons name={isConfirmPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="black" />
  </TouchableOpacity>
</View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text>Already have an account? </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ color: '#102C57', textDecorationLine: 'underline' }}>Login</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
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

export default RegisterScreen;
