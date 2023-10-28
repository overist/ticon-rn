import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/home/HomeScreen";
import ChatScreen from "../screens/chat/ChatListScreen";

export default function BottomNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarIcon: ({ focused, size, color }) => {
          let iconName: any = "";
          if (route.name === "home") {
            iconName = focused ? "home-sharp" : "home-outline";
            color = focused ? "#000" : "#ccc";
          } else if (route.name === "chat") {
            iconName = focused
              ? "chatbubble-ellipses-sharp"
              : "chatbubble-ellipses-outline";
            color = focused ? "#000" : "#ccc";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* <Tab.Screen name="home" component={TestScreen} /> */}
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}
