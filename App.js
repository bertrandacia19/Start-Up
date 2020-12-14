//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  View } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer }from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import useDatabase from "./src/hoock/useDataBase";
import  { DramaContextProvider } from "./src/context/Dramacontext";
import  DramaListScreen  from "./src/Screens/DramaListScreen";
//import { StackActions } from '@react-navigation/native';
//import { ScreenStack } from 'react-native-screens';


const Stack = createStackNavigator();
export default function App() {
  // Prevenir que la pantalla de splash se oculte
  SplashScreen.preventAutoHideAsync();

  const isLoadingComplete = useDatabase();


  // Ocultar la pantalla de splash
  if (isLoadingComplete) SplashScreen.hideAsync();
  return (
    <View >
      <DramaContextProvider>
        <NavigationContainer>
          <Stack.Screen name= "ListScreen" component ={DramaListScreen} />
        </NavigationContainer>
        
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
