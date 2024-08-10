import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLogin } from '../context/auth/AuthContext';
import { ThemeContext } from '../context/Theme/ThemContext';
import { Picker } from '@react-native-picker/picker';

const SettingsScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [localization, setLocalization] = useState<string>('en');
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [tempUsername, setTempUsername] = useState<string>('');
  const navigation = useNavigation();
  const { logout } = useLogin();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedLocalization = await AsyncStorage.getItem('localization');
        
        if (storedUsername) setUsername(storedUsername);
        if (storedLocalization) setLocalization(storedLocalization);
        
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
      await AsyncStorage.setItem('theme', theme === 'dark' ? 'dark' : 'light');
      Alert.alert('Success', 'Settings saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
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

  return (
    <LinearGradient
      colors={theme === 'dark' ? ['#333', '#444'] : ['pink', 'white']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#FF69B4' }]}>
          Welcome Back, {username || 'User'}
        </Text>

        {isEditingUsername ? (
          <>
            <TextInput
              style={[styles.input, { borderColor: theme === 'dark' ? '#555' : '#FF69B4' }]}
              value={tempUsername}
              onChangeText={setTempUsername}
              placeholder="Enter new username"
              placeholderTextColor={theme === 'dark' ? '#888' : '#555'}
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme === 'dark' ? '#1E90FF' : '#4CAF50' }]}
              onPress={handleEditUsername}
            >
              <Ionicons name="save" size={20} color="#fff" />
              <Text style={styles.buttonText}>Save Username</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setIsEditingUsername(false)}
            >
              <Ionicons name="close" size={20} color="#fff" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme === 'dark' ? '#1E90FF' : '#4CAF50' }]}
            onPress={() => setIsEditingUsername(true)}
          >
            <Ionicons name="pencil" size={20} color="#fff" />
            <Text style={styles.buttonText}>Edit Username</Text>
          </TouchableOpacity>
        )}

        <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#FF69B4' }]}>Localization</Text>
        <Picker
          selectedValue={localization}
          style={[styles.picker, { color: theme === 'dark' ? 'white' : 'black' }]}
          onValueChange={(itemValue: string) => setLocalization(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
        </Picker>

        <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#FF69B4' }]}>Theme</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#FF69B4' }]}>
            {theme === 'dark' ? 'Dark Theme' : 'Light Theme'}
          </Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            thumbColor={theme === 'dark' ? '#fff' : '#4CAF50'}
            trackColor={{ false: '#767577', true: '#1E90FF' }}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme === 'dark' ? '#1E90FF' : '#4CAF50' }]}
          onPress={handleSave}
        >
          <Ionicons name="checkmark" size={20} color="#fff" />
          <Text style={styles.buttonText}>Save Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={logout}
        >
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
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default SettingsScreen;
