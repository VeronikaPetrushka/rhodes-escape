import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EventsScreen from './src/screens/EventsScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import SignEventScreen from './src/screens/SignEventScreen';
import BeachesScreen from './src/screens/BeachesScreen';
import BeachDetailsScreen from './src/screens/BeachDetailsScreen';
import AddBeachScreen from './src/screens/AddBeachScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import GameLevelsScreen from './src/screens/GameLevelsScreen';
import GameScreen from './src/screens/GameScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    return (
      <NavigationContainer>
              <Stack.Navigator initialRouteName="EventsScreen">
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
                      name="SignEventScreen" 
                      component={SignEventScreen} 
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
      </NavigationContainer>
    );
};

export default App;
