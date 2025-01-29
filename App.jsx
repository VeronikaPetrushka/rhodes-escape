import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EventsScreen from './src/screens/EventsScreen';
import DetailsScreen from './src/screens/DetailsScreen';

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
                      name="DetailsScreen" 
                      component={DetailsScreen} 
                      options={{ headerShown: false }} 
                  />
              </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
