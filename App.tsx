import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import Toast from "react-native-toast-message";
import React, { useEffect } from "react";
import { getAuthInstance } from "./src/modules/firebaseConfig";
import Navigation from "./src/navigation";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }
    hideSplashScreen();
  }, []);

  getAuthInstance();
  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
      <Toast />
    </>
  );
}
