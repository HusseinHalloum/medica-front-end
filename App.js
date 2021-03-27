import "react-native-gesture-handler";
import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Navigation from "./navigation/Navigation";
import { useFonts } from "expo-font";
import {
  BalsamiqSans_400Regular,
  BalsamiqSans_700Bold,
} from "@expo-google-fonts/balsamiq-sans";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

export default function App() {
  let [fontsLoaded] = useFonts({
    BalsamiqSans_400Regular,
    BalsamiqSans_700Bold,
  });
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
