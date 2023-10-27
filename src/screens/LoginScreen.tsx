import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import GoogleAuthButton from "../components/GoogleAuthButton";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    // 로그인 상태 확인 이벤트 리스너 추가 (구글로그인도 이벤트 캐치됨)
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        navigation.replace("bottom");
      }
    });
    // 로그인 성공시 이벤트 리스너 삭제
    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log("user", user);
      Toast.show({
        type: "success",
        text1: "회원가입 성공",
        text2: `${email}으로 가입되었습니다.`,
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        "회원가입 도중에 문제가 발생했습니다.",
        error.message,
        [{ text: "닫기", onPress: () => console.log("닫기") }],
        { cancelable: true }
      );
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      Alert.alert(
        "로그인 도중에 문제가 발생했습니다.",
        error.message,
        [{ text: "닫기", onPress: () => console.log("닫기") }],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 30, fontWeight: "700" }}>TICON with RN</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="이메일"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="비밀번호"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonOutlineText}>회원가입</Text>
        </TouchableOpacity>

        <GoogleAuthButton
          Trigger={({ onPress }) => (
            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={onPress}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../assets/icon-google-logo.jpeg")}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={styles.buttonOutlineText}>구글로 가입/로그인</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginTop: 15,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "black",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },
});
