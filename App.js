import React from 'react';
import {  View } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import useDatabase from "./src/hoock/useDataBase";
import  DramaContextProvider  from "./src/context/Dramacontext";
import  DramaListScreen  from "./src/Screens/DramaListScreen";

export default function App() {
  // Prevenir que la pantalla de splash se oculte
  SplashScreen.preventAutoHideAsync();

  const isLoadingComplete = useDatabase();

  // Ocultar la pantalla de splash
  if (isLoadingComplete) SplashScreen.hideAsync();
  return (
    <View >
      <DramaContextProvider>
        <DramaListScreen/>
      </DramaContextProvider>
    </View>
  );
}

