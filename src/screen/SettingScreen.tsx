import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLogin } from '../context/auth/AuthContext';
import { ThemeContext } from '../context/Theme/ThemContext';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

const SettingsScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [localization, setLocalization] = useState<string>('en');
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [tempUsername, setTempUsername] = useState<string>('');
  const navigation = useNavigation();
  const { logout } = useLogin();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedLocalization = await AsyncStorage.getItem('localization');
        
        if (storedUsername) setUsername(storedUsername);
        if (storedLocalization) {
          setLocalization(storedLocalization);
          i18n.changeLanguage(storedLocalization);
        }
        console.log('Loaded settings:', { storedUsername, storedLocalization });
        
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
      i18n.changeLanguage(localization);
      Alert.alert('Success', t('Settings saved!'));
    } catch (error) {
      Alert.alert('Error', t('Failed to save settings'));
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

  const handleLanguageChange = (language: string) => {
    setLocalization(language);
    i18n.changeLanguage(language);
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
        <Text style={[styles.note, { color: theme === 'dark' ? '#fff' : '#FF69B4' }]}>
          {t('Note: Save the settings to apply changes')}
        </Text>
        
        <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#FF69B4' }]}>
          {t('welcome')}, {username || t('User')}
        </Text>

        {isEditingUsername ? (
          <>
            <TextInput
              style={[styles.input, { borderColor: theme === 'dark' ? '#555' : '#FF69B4' }]}
              value={tempUsername}
              onChangeText={setTempUsername}
              placeholder={t('Enter new username')}
              placeholderTextColor={theme === 'dark' ? '#888' : '#555'}
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme === 'dark' ? '#1E90FF' : '#4CAF50' }]}
              onPress={handleEditUsername}
            >
              <Ionicons name="save" size={20} color="#fff" />
              <Text style={styles.buttonText}>{t('Save Username')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setIsEditingUsername(false)}
            >
              <Ionicons name="close" size={20} color="#fff" />
              <Text style={styles.buttonText}>{t('Cancel')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.smallButton, { backgroundColor: theme === 'dark' ? '#1E90FF' : '#4CAF50' }]}
            onPress={() => setIsEditingUsername(true)}
          >
            <Ionicons name="pencil" size={16} color="#fff" />
            <Text style={styles.smallButtonText}>{t('edit_username')}</Text>
          </TouchableOpacity>
        )}

        <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#FF69B4' }]}>{t('localization')}</Text>
        <Picker
          selectedValue={localization}
          style={[styles.picker, { color: theme === 'dark' ? 'white' : 'black' }]}
          onValueChange={handleLanguageChange}
        >
          <Picker.Item label={t('English')} value="en" />
          <Picker.Item label={t('Spanish')} value="es" />
          <Picker.Item label={t('French')} value="fr" />
        </Picker>

        <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#FF69B4' }]}>{t('theme')}</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#FF69B4' }]}>
            {theme === 'dark' ? t('dark_theme') : t('light_theme')}
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
          <Text style={styles.buttonText}>{t('save_settings')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={logout}
        >
          <Ionicons name="log-out" size={20} color="#fff" />
          <Text style={styles.buttonText}>{t('logout')}</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  note: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF69B4',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
  cancelButton: {
    backgroundColor: '#FF6347',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF4500',
  },
  smallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  smallButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
});

export default SettingsScreen;
