import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Button,
} from "react-native";

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePicker from "../components/ImagePicker";
import CustomTextInput from "./common/CustomTextInput";
import CustomDatePicker from "./common/CustomDatePicker";
import { getAge } from "../utils/math";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import GoogleAuthButton from "./common/GoogleAuthButton";

const NOW = new Date();
export default function JoinScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState(0);
  const [birth, setBirth] = useState(NOW);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(() => {});
        }, 2000);
      });

      // Validation
      if (username === "") {
        alert("이름을 입력해주세요");
        return;
      }

      if (gender === 0) {
        alert("성별을 선택해주세요");
        return;
      }

      if (birth === NOW) {
        alert("생년월일을 선택해주세요");
        return;
      }

      alert("회원가입이 완료되었습니다.");

      navigation.replace("bottom");
    } catch (e) {
      alert(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "height"}
      style={styles.defaultLayout}
    >
      <SafeAreaView style={styles.container}>
        <Pressable onPress={Keyboard.dismiss} style={styles.inner}>
          <View style={styles.imageContainer}>
            <ImagePicker image={image} setImage={setImage} />
            <Text style={styles.label}>사진을 선택해주세요</Text>
          </View>

          <GoogleAuthButton />

          <Text style={styles.label}>이름을 입력해주세요</Text>
          <View style={styles.row}>
            <CustomTextInput
              onChangeText={handleUsernameChange}
              placeholder="Username"
              value={username}
            />
          </View>

          <Text style={styles.label}>성별을 선택해주세요</Text>
          <View style={{ ...styles.row, justifyContent: "space-evenly" }}>
            <Pressable
              style={{
                backgroundColor: gender === 1 ? "blue" : "gray",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setGender(1);
              }}
            >
              <Text style={{ color: "white" }}>남자</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: gender === 2 ? "red" : "gray",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setGender(2);
              }}
            >
              <Text style={{ color: "white" }}>여자</Text>
            </Pressable>
          </View>

          <Text style={styles.label}>생년월일을 선택해주세요</Text>
          <CustomDatePicker
            state={birth}
            setState={setBirth}
            Trigger={({ onPress }) => (
              <Button title="Select Birth" onPress={onPress} />
            )}
          />

          <View style={{ marginVertical: 10 }}>
            <View>
              <Text>username: {username}</Text>
            </View>
            <View>
              <Text>gender: {gender}</Text>
            </View>
            <View>
              <Text>나이: {getAge(birth)}</Text>
            </View>
          </View>
        </Pressable>

        <Pressable style={styles.submitBtn} onPress={() => handleSubmit()}>
          <Text>Submit</Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  defaultLayout: {
    flex: 1,
    paddingTop: "12%",
    paddingHorizontal: "5%",
    backgroundColor: "#F2F2F2",
  },
  container: {
    paddingTop: "15%",
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
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
    width: "100%",
    flexDirection: "row",
  },

  submitBtn: {
    backgroundColor: "white",
    padding: 12,
    marginTop: 15,
    marginHorizontal: 16,
    alignItems: "center",
  },
});
