import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLogin } from '../context/auth/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RegisterModal from '../components/Register';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      Alert.alert('Login Successful');

    } else {
      Alert.alert('Invalid credentials. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
  };

  return (
    <LinearGradient colors={['#FFBCD9', 'pink']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Docket</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        <View style={styles.bottomLinks}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text style={styles.linkText}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Uncomment and use RegisterModal if needed */}
      <RegisterModal
        visible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'rgba(0.6,0.5,0,0.3)',
  },
  title: {
    color: 'white',
    fontSize: 49,
    fontWeight: 'bold',
    borderColor: 'black',
    marginBottom: 50,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    backgroundColor: '#FFBCD9',
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomLinks: {
    alignItems: 'center',
    marginTop: 80,
  },
  linkText: {
    color: '#FFEFEF',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default LoginScreen;
