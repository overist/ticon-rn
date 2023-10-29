import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatDetailScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요!!!!!!!!!!!!", sender: "other", time: "17:12" },
    { id: 2, text: "안녕하세요!!!!!!!!!!!", sender: "me", time: "17:11" },
    { id: 3, text: "안녕하세요!!!!!!!!!!", sender: "other", time: "17:10" },
    { id: 4, text: "안녕하세요!!!!!!!!!", sender: "me", time: "17:09" },
    { id: 5, text: "안녕하세요!!!!!!!!", sender: "other", time: "17:08" },
    { id: 6, text: "안녕하세요!!!!!!!", sender: "me", time: "17:07" },
    { id: 7, text: "안녕하세요!!!!!!", sender: "other", time: "17:06" },
    { id: 8, text: "안녕하세요!!!!!", sender: "me", time: "17:05" },
    { id: 9, text: "안녕하세요!!!!", sender: "other", time: "17:04" },
    { id: 10, text: "안녕하세요!!!", sender: "me", time: "17:03" },
    { id: 11, text: "안녕하세요!!", sender: "other", time: "17:02" },
    { id: 12, text: "안녕하세요!", sender: "me", time: "17:01" },
    { id: 13, text: "안녕하세요", sender: "other", time: "17:00" },
  ]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 300 : 0}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            style={{ flex: 1 }}
            inverted={true}
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <Text
                  style={[
                    styles.timeText,
                    item.sender === "me" && { alignSelf: "flex-end" },
                  ]}
                >
                  {item.time}
                </Text>
                <View
                  style={[
                    styles.message,
                    item.sender === "me" && styles.myMessage,
                  ]}
                >
                  <Text>{item.text}</Text>
                </View>
              </>
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} />
          <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
            <Text>전송</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  message: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignSelf: "flex-start", // Default alignment to the left
    flexDirection: "row", // Updated to row for side by side layout
    justifyContent: "space-between", // Updated for spacing between message and time
    maxWidth: "80%", // Updated to ensure message and time stay within a line
  },
  myMessage: {
    backgroundColor: "#00a7ff",
    alignSelf: "flex-end", // Align to the right for my messages
  },
  timeText: {
    marginLeft: 10, // Added margin for spacing
    color: "#999", // Optional styling for time text
    fontSize: 12, // Optional styling for time text
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#999",
    backgroundColor: "#fff",
  },
  textInput: { height: 40, borderWidth: 1, borderRadius: 10, width: "85%" },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#cbcbcb",
    justifyContent: "center",
    alignItems: "center",
  },
});
