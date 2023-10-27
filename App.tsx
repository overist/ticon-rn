import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import React, { useEffect } from "react";
import Navigation from "./src/navigation";
import * as SplashScreen from "expo-splash-screen";
import { RecoilRoot } from "recoil";
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";

export default function App() {
  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }
    hideSplashScreen();
  }, []);

  return (
    <>
      <RecoilRoot>
        <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
          <Navigation />
        </ReactNativeRecoilPersistGate>
      </RecoilRoot>
      <Toast />
    </>
  );
}
