import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import useDatabase from "./src/hoock/useDataBase";
import { DramaContextProvider } from "./src/context/Dramacontext";

export default function App() {
   // Prevenir que la pantalla de splash se oculte
  SplashScreen.preventAutoHideAsync();

  const isLoadingComplete = useDatabase();

  // Ocultar la pantalla de splash
  if (isLoadingComplete) SplashScreen.hideAsync();
  
  return (
    <View style={styles.container}>
        <DramaContextProvider>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      </DramaContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
