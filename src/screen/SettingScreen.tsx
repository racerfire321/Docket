import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [localization, setLocalization] = useState<string>('en');
  const [theme, setTheme] = useState<string>('light');
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [tempUsername, setTempUsername] = useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedLocalization = await AsyncStorage.getItem('localization');
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedUsername) setUsername(storedUsername);
        if (storedLocalization) setLocalization(storedLocalization);
        if (storedTheme) setTheme(storedTheme);
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('localization', localization);
      await AsyncStorage.setItem('theme', theme);
      alert('Settings saved!');
    } catch (error) {
      console.error('Failed to save settings', error);
    }
  };

  const handleEditUsername = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername);
      setTempUsername('');
      setIsEditingUsername(false);
    }
  };

  function alert(arg0: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <LinearGradient colors={['pink', 'white']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this value based on your layout
      >
        <Text style={styles.label}>Welcome Back, {username || 'User'}</Text>

        {isEditingUsername ? (
          <>
            <TextInput
              style={styles.input}
              value={tempUsername}
              onChangeText={setTempUsername}
              placeholder="Enter new username"
            />
            <TouchableOpacity style={styles.button} onPress={handleEditUsername}>
              <Ionicons name="save" size={20} color="#fff" />
              <Text style={styles.buttonText}>Save Username</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsEditingUsername(false)}>
              <Ionicons name="close" size={20} color="#fff" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => setIsEditingUsername(true)}>
            <Ionicons name="pencil" size={20} color="#fff" />
            <Text style={styles.buttonText}>Edit Username</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.label}>Localization</Text>
        <Picker
          selectedValue={localization}
          style={styles.picker}
          onValueChange={(itemValue: React.SetStateAction<string>) => setLocalization(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
        </Picker>

        <Text style={styles.label}>Theme</Text>
        <Picker
          selectedValue={theme}
          style={styles.picker}
          onValueChange={(itemValue: React.SetStateAction<string>) => setTheme(itemValue)}
        >
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Ionicons name="checkmark" size={20} color="#fff" />
          <Text style={styles.buttonText}>Save Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => {
          alert('Logged out!');
        }}>
          <Ionicons name="log-out" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#FF69B4',
  },
  input: {
    height: 40,
    borderColor: '#FF69B4',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#FF69B4',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    color:"black",
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: 'grey',
  },
  logoutButton: {
    backgroundColor: 'red',
  },
});

export default SettingsScreen;
