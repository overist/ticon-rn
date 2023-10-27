import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  Alert,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import firestore from "@react-native-firebase/firestore";
import { useRecoilState } from "recoil";
import { testAtom } from "../store/atoms";

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [test, setTest] = useRecoilState(testAtom);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace("login");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    Alert.alert(test);
  }, [test]);

  useEffect(() => {
    const userRef = firestore().collection("users").doc();
    const unsubscribe = userRef.onSnapshot((doc) => {
      console.log("fuck", doc);
      if (doc.exists) {
        console.log("usersex", doc.data());
      } else {
        console.log("No user data found!");
      }
    });

    return unsubscribe; // 이벤트 구독 취소
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>TICON CHAT</Text>
        <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
          <Text style={styles.logOutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <Button title="test" onPress={() => setTest("qweasd")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 20 : 0,
    backgroundColor: "#f7f8fa",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
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
});
