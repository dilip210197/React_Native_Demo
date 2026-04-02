import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DinersNavigation = ({ 
  activeTab, 
  onTabPress, 
  searchQuery, 
  onSearchChange, 
  isSearchActive, 
  setIsSearchActive 
}) => {
  const searchWidth = useRef(new Animated.Value(58)).current;

  const toggleSearch = () => {
    if (isSearchActive) {
      Animated.spring(searchWidth, {
        toValue: 58,
        friction: 8,
        useNativeDriver: false,
      }).start(() => {
        setIsSearchActive(false);
        onSearchChange('');
        Keyboard.dismiss();
      });
    } else {
      setIsSearchActive(true);
      Animated.spring(searchWidth, {
        toValue: width - 40,
        friction: 8,
        useNativeDriver: false,
      }).start();
    }
  };

  const tabs = [
    { id: 'Home', icon: 'home' },
    { id: 'Lounges', icon: 'briefcase' },
    { id: 'Benefits', icon: 'help-circle' }
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      style={styles.floatingWrapper}
    >
      <View style={styles.navRow}>
        {/* Tab Bar - Hidden when searching */}
        {!isSearchActive && (
          <View style={styles.tabBarPill}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => onTabPress(tab.id)}
                  style={[styles.tabItem, isActive && styles.activeTabBg]}
                >
                  <Feather 
                    name={tab.icon} 
                    size={22} 
                    color={isActive ? '#004c97' : '#97999b'} 
                  />
                  {isActive && <Text style={styles.tabLabel}>{tab.id}</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Search Bar */}
        <Animated.View style={[styles.searchPill, { width: searchWidth }]}>
          {isSearchActive ? (
            <View style={styles.searchInner}>
              <Feather name="search" size={20} color="#00a3e0" />
              <TextInput
                style={styles.input}
                placeholder={`Search in ${activeTab}`}
                autoFocus
                value={searchQuery}
                onChangeText={onSearchChange}
                placeholderTextColor="#97999b"
                returnKeyType="search"
              />
              <TouchableOpacity onPress={toggleSearch}>
                <Feather name="x" size={20} color="#97999b" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.searchIconBtn} onPress={toggleSearch}>
              <Feather name="search" size={24} color="#00a3e0" />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabBarPill: {
    flex: 1,
    flexDirection: 'row',
    height: 58,
    backgroundColor: '#fff',
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 12,
    borderWidth: 0.5,
    borderColor: '#eee',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeTabBg: {
    backgroundColor: 'rgba(0, 163, 224, 0.1)',
  },
  tabLabel: {
    color: '#004c97',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 14,
  },
  searchPill: {
    height: 58,
    backgroundColor: '#fff',
    borderRadius: 29,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#eee',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  searchIconBtn: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#004c97',
    height: '100%',
  },
});

export default DinersNavigation;

  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);


  <DinersNavigation 
        activeTab={activeTab}
        onTabPress={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />
