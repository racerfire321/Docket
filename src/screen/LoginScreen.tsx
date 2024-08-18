import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLogin } from '../context/auth/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RegisterModal from '../components/Register';
import LottieView from 'lottie-react-native';

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
      navigation.navigate('Main');
    } else {
      Alert.alert('Invalid credentials. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('yet to be added');
  };

  return (
     <LinearGradient colors={['#FFBCD9', 'pink']} style={styles.background}>
      <View style={styles.container}>
     
        <Text style={styles.logo}> Docket<LottieView
            source={require('../assets/l.json')}
            autoPlay
            loop
            style={styles.animation}
          /></Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#BCC1C8"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#BCC1C8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.noAccountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text style={styles.registerText}>Create New Account</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  animation: {
    width: 100,
    height: 100,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 60,
    marginLeft: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#BCC1C8',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    backgroundColor: '#FFBCD9',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    marginBottom:20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noAccountText: {
    color: 'white',
  },
  registerText: {
    color: 'pink',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
