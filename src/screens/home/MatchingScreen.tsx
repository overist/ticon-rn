import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useResetRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../../store/atoms";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";

export default function MatchingScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const userState = useRecoilValue(userAtom);
  const userId = userState.uid;
  const [matchData, setMatchData] = useState(null);
  const [partnerUserData, setPartnerUserData] = useState(null);
  const [isAccept, setIsAccept] = useState(false);

  const matchesEnqueue = async (userId) => {
    let result = "";
    try {
      await firestore().runTransaction(async (transaction) => {
        const collection = firestore().collection("matches");
        const querySnapshot = await firestore()
          .collection("matches")
          .orderBy("timestamp", "desc")
          .limit(1)
          .get();
        const lastDocRef = querySnapshot.docs[0].ref;

        const lastDocSnapshot = await transaction.get(lastDocRef);
        const status = lastDocSnapshot.get("status");
        const publisher = lastDocSnapshot.get("publisher");
        const matchId = lastDocSnapshot.id;

        if (status === "success") {
          // Create a new document with a new matchId
          const newDocRef = collection.doc(); // Automatically generate a new doc ID
          transaction.set(newDocRef, {
            publisher: userId,
            subscriber: "",
            publisherOk: 0, //0: default, 1: ok, 2: no
            subscriberOk: 0,
            timestamp: firestore.FieldValue.serverTimestamp(),
            status: "progressing",
          });
          console.log("created!");
          result = newDocRef.id;
        } else if (status === "progressing" && publisher !== userId) {
          // Update the existing document
          const updatedData = { subscriber: userId, status: "success" }; // Example updated data
          const existingDocRef = collection.doc(matchId);
          transaction.update(existingDocRef, updatedData);
          console.log("updated!");
          result = matchId;
        }
      });
    } catch (error) {
      console.error("Transaction failed: ", error.message);
      Toast.show({
        type: "error",
        text1: "매칭 실패",
        text2: `매칭 도중에 문제가 발생했습니다.`,
      });
    } finally {
      return result;
    }
  };

  // ANCHOR : Enqueue 매칭 큐 생성 / 수정 알고리즘
  useEffect(() => {
    matchesEnqueue(userId).then((matchesId) => {
      console.log("matchesId", matchesId);
      const subscriber = firestore()
        .collection("matches")
        .doc(matchesId)
        .onSnapshot(
          (documentSnapshot) => {
            setMatchData({ id: matchesId, ...documentSnapshot.data() });
            console.log("matchData", documentSnapshot.data());
          },
          (err) => {
            console.log("error", err);
          }
        );

      // Stop listening for updates when no longer required
      return () => subscriber();
    });
  }, []);

  // ANCHOR : firebase snapshot에 의해 업데이트되는 state를 감시하며 매칭 성공 시, 상대의 데이터를 가져옴
  useEffect(() => {
    if (matchData?.status === "success") {
      const isPublisher = matchData?.publisher === userId;
      const partnerId = isPublisher
        ? matchData?.subscriber
        : matchData?.publisher;
      firestore()
        .collection("users")
        .doc(partnerId)
        .get()
        .then((documentSnapshot) => {
          console.log("setPartnerUserData", documentSnapshot.data());
          setPartnerUserData(documentSnapshot.data());
        });
    }
  }, [matchData]);

  const handleReject = async () => {
    try {
      const isPublisher = matchData?.publisher === userId;
      await firestore()
        .collection("matches")
        .doc(matchData.id)
        .update({
          [isPublisher ? "publisherOk" : "subscriberOk"]: 2,
        });
      Toast.show({
        type: "success",
        text1: "매칭 거절",
        text2: `매칭을 거절하였습니다.`,
      });
      navigation.navigate("home");
    } catch (error) {
      console.error("Error updating user: ", error.message, matchData);
    }
  };

  const handleAccept = async () => {
    try {
      const isPublisher = matchData?.publisher === userId;
      await firestore()
        .collection("matches")
        .doc(matchData.id)
        .update({
          [isPublisher ? "publisherOk" : "subscriberOk"]: 1,
        });
      Toast.show({
        type: "success",
        text1: "매칭 수락",
        text2: `매칭을 수락하였습니다.`,
      });
      setIsAccept(true);
    } catch (error) {
      console.error("Error updating user: ", error.message);
    }
  };

  // ANCHOR : firebase snapshot에 의해 업데이트되는 state를 감시하며 매칭 성공 시, 채팅 화면으로 이동
  useEffect(() => {
    if (
      matchData?.status === "success" &&
      matchData?.publisherOk === 1 &&
      matchData?.subscriberOk === 1
    ) {
      // chatStack의 chatDetail로 이동
      navigation.navigate("chatStack", {
        screen: "chatDetail",
        params: {
          matchId: matchData.id,
        },
      });
    }
  }, [matchData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <View style={styles.userinfoContainer}>
        <Image
          source={{ uri: partnerUserData?.imageUrl }}
          style={{ width: 150, height: 150, borderRadius: 100 }}
        />
        <Text style={styles.userinfoHead}>유저 정보</Text>
        <Text>{matchData?.publisher}</Text>
        <Text>{matchData?.subscriber}</Text>
        <Text style={styles.userinfoText}>메일: {partnerUserData?.email}</Text>
        <Text style={styles.userinfoText}>
          유져명: {partnerUserData?.username}
        </Text>
        <Text style={styles.userinfoText}>
          성별:{" "}
          {partnerUserData?.gender && partnerUserData?.gender === 1
            ? "남자"
            : "여자"}
        </Text>
      </View>
      <View style={styles.matchStartContainer}>
        {/* 매칭 중 - 취소 가능 */}
        {matchData?.status !== "success" && (
          <View>
            <Text style={styles.loadingText}>매칭 중입니다...</Text>
            <TouchableOpacity
              style={styles.matchStartButton}
              onPress={() => navigation.navigate("home")}
            >
              <Text style={styles.logOutText}>취소하기</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* 매칭 성공시 - 수락 및 거절 가능 */}
        {matchData?.status === "success" && (
          <View>
            <Text style={styles.loadingText}>매칭 성공!</Text>
            <TouchableOpacity
              style={styles.matchStartButton}
              onPress={handleReject}
            >
              <Text style={styles.logOutText}>거절하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.matchStartButton}
              onPress={handleAccept}
            >
              <Text style={styles.logOutText}>수락하기</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 매칭 성공 및 수락시 - 채팅 화면으로 이동 */}
        {matchData?.status === "success" && isAccept && (
          <View>
            <Text>상대방의 수락을 기다리는 중입니다...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 20 : 0,
    backgroundColor: "#f7f8fa",
  },
  pageTitle: {
    fontSize: 35,
    fontWeight: "600",
  },
  logOutText: {
    color: "white",
    fontSize: 20,
  },
  logOutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 4,
  },
  userinfoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  userinfoHead: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "600",
  },
  userinfoText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "500",
  },
  matchStartContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  matchStartButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 4,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
});
