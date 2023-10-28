import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BottomNavigation from "./BottomNavigation";
import LoginScreen from "../screens/auth/LoginScreen";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms";
import JoinScreen from "../screens/auth/JoinScreen";

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const user = useRecoilValue(userAtom);
  const isLoggedIn = user?.email ? true : false;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "bottom" : "login"}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="join"
          component={JoinScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="bottom"
          component={BottomNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
