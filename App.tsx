import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import MainScreen from "./src/screens/MainScreen";
import { store } from "./src/redux/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/LoginScreen";
import Toast from "react-native-toast-message";
import React from "react";
import app from "./firebase";

export default function App() {
  const Stack = createNativeStackNavigator();
  app();

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Main"
              component={MainScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
