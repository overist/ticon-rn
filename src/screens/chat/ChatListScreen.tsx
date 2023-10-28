import { StyleSheet } from "react-native";

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const NOW = new Date();
export default function ChatListScreen() {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "15%",
    flex: 1,
    alignItems: "center",
  },
});
