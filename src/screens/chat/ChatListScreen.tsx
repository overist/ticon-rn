// ChatListScreen.js
import React, { useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { chatRoomAtom, userAtom, ChatRoomType } from "../../store/atoms";
import firestore from "@react-native-firebase/firestore";

const ChatItem = ({ item, index }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  console.log("index", index, item);
  const isFirstChild = index === 0;
  return (
    <TouchableOpacity
      style={[styles.itemContainer, isFirstChild && { borderTopWidth: 1 }]}
      onPress={() =>
        navigation.navigate("chatStack", {
          screen: "chatDetail",
          params: {
            matchId: item.id,
          },
        })
      }
    >
      <View style={styles.itemProfileContainer}>
        <Image
          style={styles.itemProfileImage}
          source={{
            uri: item.partnerImageUrl,
          }}
        />
        <Text style={styles.itemProfileName}>{item.partnerName}</Text>
      </View>
      {item.count !== 0 && (
        <View style={[styles.itemChatCountContainer]}>
          <Text style={styles.itemChatCount}>{2}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function ChatListScreen() {
  // matches 조회 - 내아이디가 들어감 - 내가 OK누름 -> 상대방아이디 획득, matchId 획득 publisher, publisherOk, status, subscriber, subscriberOk
  // chats 구독 - matchId가 도큐먼트네임 - content, senderId, timestamp, type
  const userState = useRecoilValue(userAtom);
  const [chatRoomState, setChatRoomState] = useRecoilState(chatRoomAtom);
  // const chatRoomReset = useResetRecoilState(chatRoomAtom);

  const readMatch = async () => {
    const userId = userState.uid;
    try {
      const querySnapshot = await firestore()
        .collection("matches")
        .where("publisher", "==", userId)
        .where("publisherOk", "==", 1)
        .get();

      const querySnapshot2 = await firestore()
        .collection("matches")
        .where("subscriber", "==", userId)
        .where("subscriberOk", "==", 1)
        .get();

      const documents = querySnapshot.docs
        .concat(querySnapshot2.docs)
        .map((d) => {
          const dataList: any = { ...d.data(), id: d.id };
          return dataList; // id: match id, data: match data
        });

      const sortedData = documents.sort((a, b) => {
        // timestamp desc 정렬
        return a.timestamp.toDate() - b.timestamp.toDate();
      });

      const newData = [];
      for (const data of sortedData) {
        const role = data.publisher === userId ? "publisher" : "subscriber";
        const partnerId =
          data.publisher === userId ? data.subscriber : data.publisher;

        // 유저정보조회
        const partnerData = await firestore()
          .collection("users")
          .doc(partnerId)
          .get();
        const partnerName = partnerData.data().username;
        const partnerImageUrl = partnerData.data().imageUrl;
        const partnerGender = partnerData.data().gender;

        newData.push({
          matchId: data.id,
          role: role,
          partnerId: partnerId,
          partnerName: partnerName,
          partnerImageUrl: partnerImageUrl,
          partnerGender: partnerGender,
          timestamp: data.timestamp,
        });
      }

      setChatRoomState(newData);
    } catch (error) {
      console.error("Error reading user: ", userId, error.message);
    }
  };

  useEffect(() => {
    (async () => {
      // chatRoomReset();
      await readMatch();
      console.log("chatRoomState", chatRoomState);
    })();
  }, []);

  // const data = [
  //   { id: 1, username: "유저1", count: 1 },
  //   { id: 2, username: "유저2", count: 0 },
  // ]; // 채팅 목록 데이터

  return (
    <SafeAreaView style={styles.container}>
      <Button title="test" onPress={() => console.log(chatRoomState)} />
      <FlatList
        data={chatRoomState}
        keyExtractor={(item) => item.matchId}
        renderItem={({ item, index }) => (
          <ChatItem key={item.matchId} item={item} index={index} />
        )}
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
