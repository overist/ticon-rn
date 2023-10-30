// ChatListScreen.js
import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const ChatItem = ({ item, index }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  console.log("index", index, item);
  const isFirstChild = index === 0;
  return (
    <TouchableOpacity
      style={[styles.itemContainer, isFirstChild && { borderTopWidth: 1 }]}
      onPress={() => navigation.push("chatDetail", { matchId: item.id })}
    >
      <View style={styles.itemProfileContainer}>
        <Image
          style={styles.itemProfileImage}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png?20181011102003",
          }}
        />
        <Text style={styles.itemProfileName}>{item.username}</Text>
      </View>
      {item.count !== 0 && (
        <View style={[styles.itemChatCountContainer]}>
          <Text style={styles.itemChatCount}>{item.count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function ChatListScreen() {
  // DB 구독 및 스테이트화 필요
  const data = [
    { id: 1, username: "유저1", count: 1 },
    { id: 2, username: "유저2", count: 0 },
  ]; // 채팅 목록 데이터

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <ChatItem item={item} index={index} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemProfileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  itemProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 15,
  },
  itemProfileName: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemChatCountContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: "#ff6f6f",
  },
  itemChatCount: {
    fontSize: 14,
    color: "#fff",
  },
  title: {
    fontSize: 18,
  },
});
