import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screen/HomeScreen';
import { TasksProvider } from './src/context/TaskContext';
import TimerScreen from './src/screen/TimerScreen';
import CalendarScreen from './src/screen/CalenderScreen';
import SettingsScreen from './src/screen/SettingScreen';
const Tab = createBottomTabNavigator();


const App = () => (
  <TasksProvider>
    <SafeAreaProvider>
      <NavigationContainer>
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
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Calendar" component={CalendarScreen}  options={{ headerShown: false }}/>
          <Tab.Screen name="Timer" component={TimerScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
        
      </NavigationContainer>
    </SafeAreaProvider>
  </TasksProvider>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: '10%',
    bottom: 50,
    fontWeight: '900',
    backgroundColor: '#FFBCD9',
    transform: [{ translateX: 24 }],
  },
});

export default App;
