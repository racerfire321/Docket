import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screen/HomeScreen';
import TimerScreen from './src/screen/TimerScreen';
import CalendarScreen from './src/screen/CalenderScreen';
import SettingsScreen from './src/screen/SettingScreen';
import ThemeProvider from './src/context/Theme/ThemeProvider';
import { TasksProvider } from './src/context/TaskContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './src/screen/LoginScreen';
import { LoginProvider, useLogin } from './src/context/auth/AuthContext';
import { ThemeContext } from './src/context/Theme/ThemContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  const { theme } = useContext(ThemeContext); 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Calendar':
              iconName = 'calendar-outline';
              break;
            case 'Timer':
              iconName = 'timer-outline';
              break;
            case 'Settings':
              iconName = 'settings-outline';
              break;
            default:
              iconName = 'home-outline';
          }
          color = focused ? '#FF69B4' : '#FFBCD9'; 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor: '#FF69B4',
        tabBarInactiveTintColor: '#FFBCD9',
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#333' : '#FFF',
        },
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#222' : '#FFF',
        },
        headerTintColor: theme === 'dark' ? '#FFF' : '#000',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Timer" component={TimerScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};


const AppNavigator = () => {
  const { isLoggedIn } = useLogin();

  return (
    isLoggedIn ? (
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {props => <LoginScreen {...props}  />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  );
};

const App = () => (
  <I18nextProvider i18n={i18n}>
  <ThemeProvider>
  <LoginProvider>
    <TasksProvider>

      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </TasksProvider>
  </LoginProvider>
  </ThemeProvider>
  </I18nextProvider>
);

export default App;
