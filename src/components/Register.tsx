import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const RegisterModal = ({ visible, closeModal }: { visible: boolean, closeModal: any }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      if (users.find((user: any) => user.email === email)) {
        Alert.alert('Email already registered');
        return;
      }

      const newUser = { username, email, password };
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('Registration Successful');
      closeModal();
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <LinearGradient colors={['#FFBCD9', 'pink']} style={styles.modalContent}>
          <Text style={styles.modalTitle}>Register Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholderTextColor="#888"
          />

         <View style={styles.buttons}>
         
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
         </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 5, 0.8, 0)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  buttons:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  registerButton: {
    flex: 1,
    marginLeft: 25,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    flex: 1,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default RegisterModal;
