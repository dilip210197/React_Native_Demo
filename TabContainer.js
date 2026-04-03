import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons as Icon } from '@expo/vector-icons';

// 1. Define your screens (or import them)
const HomeScreen = () => <View style={styles.screen}><Text>Home!</Text></View>;
const NewScreen = () => <View style={styles.screen}><Text>Enterprise!</Text></View>;
const RadioScreen = () => <View style={styles.screen}><Text>Podcast!</Text></View>;
const LibraryScreen = () => <View style={styles.screen}><Text>Music!</Text></View>;

// 2. Create a Dynamic Config Array
// To add a new tab, just add a new object to this list!
const TABS_DATA = [
  { name: 'Home', label: 'Home', activeIcon: 'home', inactiveIcon: 'home-outline', component: HomeScreen },
  { name: 'New', label: 'New', activeIcon: 'grid', inactiveIcon: 'grid-outline', component: NewScreen },
  { name: 'Radio', label: 'Radio', activeIcon: 'radio', inactiveIcon: 'radio-outline', component: RadioScreen },
  { name: 'Library', label: 'Library', activeIcon: 'musical-notes', inactiveIcon: 'musical-notes-outline', component: LibraryScreen },
];

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#FF3B30',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: styles.tabBarContainer,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      {TABS_DATA.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({ focused, color }) => (
              <Icon 
                name={focused ? tab.activeIcon : tab.inactiveIcon} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderTopWidth: 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
  },
  tabItem: {
    padding: 5,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
  }
});
