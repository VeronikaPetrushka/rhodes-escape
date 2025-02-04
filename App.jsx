import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, View, StyleSheet, Animated, ImageBackground  } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EventsScreen from './src/screens/EventsScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import BeachesScreen from './src/screens/BeachesScreen';
import BeachDetailsScreen from './src/screens/BeachDetailsScreen';
import AddBeachScreen from './src/screens/AddBeachScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import GameLevelsScreen from './src/screens/GameLevelsScreen';
import GameScreen from './src/screens/GameScreen';

import EulaModal from './src/components/EulaModal';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
  const [loaderIsEnded, setLoaderIsEnded] = useState(false);

  const loaderAnim = useRef(new Animated.Value(0)).current;

  const firstLoaderImage = require('./src/assets/loaders/1.png');
  const secondLoaderImage = require('./src/assets/loaders/2.png');

  const [currentLoader, setCurrentLoader] = useState(firstLoaderImage);

  useEffect(() => {
      Animated.timing(loaderAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
      }).start(() => {
          setCurrentLoader(secondLoaderImage);

          loaderAnim.setValue(0);
          Animated.timing(loaderAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
          }).start(() => {
              setLoaderIsEnded(true);
          });
      });
  }, []);

  const [showEula, setShowEula] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEulaConsent = async () => {
      const consent = await AsyncStorage.getItem('eulaAccepted');
      if (consent !== 'true') {
        setShowEula(true);
      }
      setLoading(false);
    };
    checkEulaConsent();
  }, []);

  const handleAcceptEula = async () => {
    try {
      await AsyncStorage.setItem('eulaAccepted', 'true');
      setShowEula(false);
    } catch (error) {
      console.error('Error saving EULA consent:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
      <NavigationContainer>
        {
            !loaderIsEnded ? (
                <View style={{ flex: 1 }}>
                    <ImageBackground style={{ flex: 1 }} source={currentLoader}>
                        <View style={styles.container}>
                            <Animated.View style={[styles.imageContainer, { opacity: loaderAnim }]}>
                                <ImageBackground source={currentLoader} style={styles.image} />
                            </Animated.View>
                        </View>
                    </ImageBackground>
                </View>
            ) : (
              <Stack.Navigator initialRouteName={"EventsScreen" }>
                  <Stack.Screen 
                        name="EventsScreen" 
                        component={EventsScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="EventDetailsScreen" 
                      component={EventDetailsScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="BeachesScreen" 
                      component={BeachesScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="BeachDetailsScreen" 
                      component={BeachDetailsScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="AddBeachScreen" 
                      component={AddBeachScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="SettingsScreen" 
                      component={SettingsScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="FavoritesScreen" 
                      component={FavoritesScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="GameLevelsScreen" 
                      component={GameLevelsScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="GameScreen" 
                      component={GameScreen} 
                      options={{ headerShown: false }} 
                  />
              </Stack.Navigator>
              )
            }
            <EulaModal visible={showEula} onAccept={handleAcceptEula} />
      </NavigationContainer>
    );
};

const styles = StyleSheet.create({

    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },

    imageContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
  },

    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },

  });

export default App;
