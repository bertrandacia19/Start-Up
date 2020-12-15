import React from 'react';
import {  View } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import useDatabase from "./src/hoock/useDataBase";
import { createStackNavigator } from "@react-navigation/stack";
import  {DramaContextProvider}  from "./src/context/Dramacontext";
import  DramaListScreen  from "./src/Screens/DramaListScreen";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  // Prevenir que la pantalla de splash se oculte
  SplashScreen.preventAutoHideAsync();

  const isLoadingComplete = useDatabase();

  // Ocultar la pantalla de splash
  if (isLoadingComplete) SplashScreen.hideAsync();
  return (
    <View style={{ flex: 1 }}>
      <DramaContextProvider>
        <NavigationContainer>
         
          <Stack.Screen name="dramalist" component={DramaListScreen}></Stack.Screen>
          
        </NavigationContainer>

        <DramaListScreen/>

      </DramaContextProvider>
    </View>
  );
}

