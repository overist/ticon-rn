import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { chatRoomAtom } from "../../store/atoms";
import { useRecoilValue } from "recoil";

export default function ChatDetailScreen({ route }) {
  // const { matchId } = route.params;
  const [text, setText] = useState("");
  const [chatDataList, setChatDataList] = useState([]);
  const chatRoomState = useRecoilValue(chatRoomAtom);
  const matchId = route.params.matchId;

  const { role, partnerName, partnerImageUrl } = chatRoomState.filter(
    (v) => v.matchId === matchId
  )[0];

  const handleChange = (value) => {
    setText(value);
  };

  const handleSubmit = async () => {
    try {
      const newChat = {
        content: text,
        sender: role,
        timestamp: firestore.FieldValue.serverTimestamp(),
        type: "text",
      };
      await firestore()
        .collection("matches")
        .doc(matchId)
        .collection("chats")
        .add(newChat);
      setText("");
    } catch (error) {
      console.error("Error creating chat: ", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("matches")
      .doc(matchId)
      .collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const chats = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Optionally include the doc ID
            ...doc.data(),
          }));
          setChatDataList(chats);
        },
        (err) => {
          console.log(err);
        }
      );
    return unsubscribe;
  }, []);

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
            data={chatDataList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <Text
                  style={[
                    styles.timeText,
                    item.sender === role && { alignSelf: "flex-end" },
                  ]}
                >
                  {item.time}
                </Text>
                <View
                  style={[
                    styles.message,
                    item.sender === role && styles.myMessage,
                  ]}
                >
                  <Text>{item.content}</Text>
                </View>
              </>
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={handleChange}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
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
