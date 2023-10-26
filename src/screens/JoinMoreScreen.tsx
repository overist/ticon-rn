import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Keyboard,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePicker from "../components/ImagePicker";

export default function JoinMoreScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "height"}
      style={styles.defaultLayout}
    >
      <SafeAreaView style={styles.container}>
        <Pressable onPress={Keyboard.dismiss} style={styles.inner}>
          <View style={styles.imageContainer}>
            <ImagePicker />
          </View>
          <View style={styles.row}>
            <TextInput placeholder="Username" style={styles.textInput} />
          </View>
          <View style={styles.row}>
            <TextInput placeholder="Username" style={styles.textInput} />
          </View>
          <View style={styles.row}>
            <TextInput placeholder="Username" style={styles.textInput} />
          </View>
          <Pressable style={styles.submitBtn} onPress={() => null}>
            <Text>Submit</Text>
          </Pressable>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  defaultLayout: {
    flex: 1,
    paddingTop: "12%",
    backgroundColor: "#F2F2F2",
  },
  container: {
    paddingTop: "15%",
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  inner: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  row: {
    padding: 12,
    paddingTop: 30,
    width: "100%",
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
  },
  submitBtn: {
    backgroundColor: "white",
    padding: 12,
    marginTop: 30,
    marginHorizontal: 16,
    alignItems: "center",
  },
});
