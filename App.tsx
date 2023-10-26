import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import Toast from "react-native-toast-message";
import React from "react";
import { getAuthInstance } from "./src/modules/firebaseConfig";
import Navigation from "./src/navigation";

export default function App() {
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
