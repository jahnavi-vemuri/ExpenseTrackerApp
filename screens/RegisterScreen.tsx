// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { MaterialIcons } from '@expo/vector-icons';
// import { RootStackParamList } from '../App';

// type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

// const RegisterScreen = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigation = useNavigation<RegisterScreenNavigationProp>();
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

//   const handleRegister = () => {
//     console.log('Username:', username);
//     console.log('Email:', email);
//     console.log('Password:', password);
//     console.log('Confirm Password:', confirmPassword);
//   };

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         onChangeText={text => setUsername(text)}
//         value={username}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={text => setEmail(text)}
//         value={email}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Enter Password"
//           secureTextEntry={!isPasswordVisible}
//           value={password}
//           onChangeText={text => setPassword(text)}
//         />
//         <TouchableOpacity
//           style={styles.eyeIcon}
//           onPress={togglePasswordVisibility}
//         >
//           <MaterialIcons name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Confirm Password"
//           secureTextEntry={!isConfirmPasswordVisible}
//           value={confirmPassword}
//           onChangeText={text => setConfirmPassword(text)}
//         />
//         <TouchableOpacity
//           style={styles.eyeIcon}
//           onPress={toggleConfirmPasswordVisibility}
//         >
//           <MaterialIcons name={isConfirmPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Register</Text>
//       </TouchableOpacity>
//       <View style={{ flexDirection: 'row', marginTop: 10 }}>
//         <Text>Already have an account? </Text>
//         <TouchableOpacity 
//           onPress={() => navigation.navigate('Login')}
//         >
//           <Text style={{ color: '#102C57', textDecorationLine: 'underline' }}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FEFAF6',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 50,
//     borderColor: '#102C57',
//     borderWidth: 2,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     fontSize: 16,
//     padding: 16,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '80%',
//     borderColor: '#102C57',
//     borderWidth: 2,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   passwordInput: {
//     flex: 1,
//     fontSize: 16,
//     padding: 16,
//   },
//   eyeIcon: {
//     padding: 10
//   },
//   button: {
//     backgroundColor: '#102C57',
//     width: '80%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default RegisterScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../App';
import * as Network from 'expo-network';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match");
      return;
    }
    try {
      const networkState = await Network.getNetworkStateAsync();
      console.log(networkState.isConnected, networkState.isInternetReachable, networkState.type)
      if (!networkState.isConnected || !networkState.isInternetReachable) {
        Alert.alert('No internet connection');
        return;
      }
      Alert.alert('You are connected to the internet');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Failed to check internet connection');
    }
    // await Network.getIpAddressAsync();
    // try {
    //   const response = await fetch('https://expense-tracker-backend-78kj.onrender.com/users', {
    //     method: 'GET',
    //     // headers: {
    //     //   'Content-Type': 'application/json',
    //     // },
    //     // body: JSON.stringify({username, email, password }),
    //   });
  
    //   const responseData = await response.json();
    //   console.log('Response:', responseData);
  
    //   if (response.ok) {
    //     Alert.alert('Registration successful');
    //     navigation.navigate('Login');
    //   } else {
    //     Alert.alert('Registration failed');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   // console.error('Error:', error?.message);
    //   Alert.alert('Registration failed');
    // }
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
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}
        >
          <MaterialIcons name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
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
