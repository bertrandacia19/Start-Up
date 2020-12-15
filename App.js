import React from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import useDatabase from "./src/hoock/useDataBase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DramaContextProvider } from "./src/context/Dramacontext";
import DramaListScreen from "./src/Screens/DramaListScreen";
/* import NoteCreateScreen from "./src/screens/NoteCreateScreen";
import NoteModifyScreen from "./src/screens/NoteModifyScreen"; */

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
          <Stack.Navigator initialRouteName="notesList">
            <Stack.Screen name="notesList" component={DramaListScreen} />
            {/* <Stack.Screen name="noteCreate" component={NoteCreateScreen} />
            <Stack.Screen name="noteModify" component={NoteModifyScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </DramaContextProvider>
    </View>
  );
}
