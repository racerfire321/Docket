import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text>Home Screen</Text>
  </View>
);

const CalendarScreen = () => (
  <View style={styles.screen}>
    <Text>Calendar Screen</Text>
  </View>
);

const TimerScreen = () => (
  <View style={styles.screen}>
    <Text>Timer Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text>Settings Screen</Text>
  </View>
);


const App = () => (
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

            // Change the icon color for the active tab
            color = focused ? '#FF69B4' : '#FFBCD9'; // Change to desired active color

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: { fontSize: 14 },
          tabBarActiveTintColor: '#FF69B4', // Change to desired active color
          tabBarInactiveTintColor: '#FFBCD9', // Change to desired inactive color
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      <FAB
        style={styles.fab}
        icon="plus"
        color='white'
        onPress={() => {
          // Add your onPress functionality here
        }}
      />
    </NavigationContainer>
  </SafeAreaProvider>
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
    fontWeight: 900,
    backgroundColor: '#FFBCD9',
    transform: [{ translateX: 24 }],
  },
});

export default App;
