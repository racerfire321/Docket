import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';


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
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Calendar':
                iconName = 'calendar';
                break;
              case 'Timer':
                iconName = 'clock-o';  // Updated to 'clock-o'
                break;
              case 'Settings':
                iconName = 'cogs';  // Updated to 'cogs'
                break;
              default:
                iconName = 'home';
            }

            return true;
          },
          tabBarLabelStyle: { fontSize: 14 }, // Increase font size here
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
        onPress={() => {
         
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
    backgroundColor: '#3a5f3c',
    transform: [{ translateX: 24 }], 
  },
});

export default App;
