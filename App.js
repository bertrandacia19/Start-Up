import React from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import useDataBase from "./src/hoock/useDataBase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DramasContextProvider } from "./src/context/Dramacontext";
import DramaListScreen from "./src/Screens/DramaListScreen";
import AddListScreen from "./src/Screens/AddListScreen";

const Stack = createStackNavigator();

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const isLoadingComplete = useDataBase();

    // Ocultar la pantalla de splash
    if (isLoadingComplete) SplashScreen.hideAsync();
    
  return (

    <View style={{ flex: 1 }}>
      <DramasContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Lista de Dramas">
            <Stack.Screen name="Lista de Dramas" component={DramaListScreen} />
             <Stack.Screen name="Agregar dorama" component={AddListScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </DramasContextProvider>
    </View>
  );
}
