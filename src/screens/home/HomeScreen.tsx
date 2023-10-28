import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useResetRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../../store/atoms";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const resetUserState = useResetRecoilState(userAtom);
  const userState = useRecoilValue(userAtom);

  const handleLogout = async () => {
    try {
      resetUserState();
      await auth().signOut();
      Toast.show({
        type: "success",
        text1: "로그아웃 성공",
        text2: `로그아웃 되었습니다.`,
      });
      navigation.replace("login");
    } catch (error) {
      console.log("logout error", error.message);
    }
  };

  console.log(userState.birth);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>TICON CHAT</Text>
        <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
          <Text style={styles.logOutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userinfoContainer}>
        <Text style={styles.userinfoText}>메일: {userState.email}</Text>
        <Text style={styles.userinfoText}>유져명: {userState.username}</Text>
        <Text style={styles.userinfoText}>
          성별: {userState.gender === 1 ? "남자" : "여자"}
        </Text>
        {/* <Text>{userState.birth}</Text> */}
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
  userinfoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  userinfoText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
