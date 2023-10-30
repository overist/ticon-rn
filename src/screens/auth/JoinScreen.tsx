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
import ImagePicker from "../../components/ImagePicker";
import CustomTextInput from "../../components/CustomTextInput";
import CustomDatePicker from "../../components/CustomDatePicker";
import { getAge } from "../../utils/math";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import { userAtom } from "../../store/atoms";
import { useSetRecoilState } from "recoil";

const NOW = new Date();
export default function JoinScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const setUserState = useSetRecoilState(userAtom);

  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState(0);
  const [birth, setBirth] = useState(NOW);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const uploadImageToFirebase = async (uri) => {
    if (!uri) {
      console.error("No image URI provided.");
      return null;
    }
    console.log("image uri", uri);

    const user = auth().currentUser;
    if (!user) {
      console.error("No user is signed in.");
      return null;
    }
    console.log("user uid", user.uid);

    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    const storageRef = storage().ref(`images/${user.uid}/${filename}`);

    try {
      const response = await fetch(uploadUri);
      const blob = await response.blob();
      await storageRef.put(blob);

      const url = await storageRef.getDownloadURL();
      return url;
    } catch (e) {
      console.error("Image upload failed:", e);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
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

      if (!image) {
        alert("사진을 선택해주세요");
        return;
      }

      // upload image to firebase storage
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToFirebase(image);
        if (!imageUrl) {
          alert("이미지 업로드 실패");
          return;
        }
      }

      // save to firestore
      const user = auth().currentUser;
      await firestore().collection("users").doc(user.uid).update({
        username,
        gender,
        birth,
        imageUrl,
      });

      const userDoc = await firestore().collection("users").doc(user.uid).get();

      console.log("join success", userDoc.data());
      setUserState({
        uid: user.uid,
        email: userDoc.data()?.email,
        username: userDoc.data()?.username,
        gender: userDoc.data()?.gender,
        birth: userDoc.data()?.birth,
        imageUrl: userDoc.data()?.imageUrl,
      });

      Toast.show({
        type: "success",
        text1: "회원가입 성공",
        text2: `회원가입이 완료되었습니다.`,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "bottom" }],
      });
    } catch (e) {
      console.log("join fail", e);
      Toast.show({
        type: "error",
        text1: "회원가입 실패",
        text2: `다시 시도해주세요.`,
      });
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
    justifyContent: "flex-start",
  },
  row: {
    width: "100%",
    flexDirection: "row",
  },

  submitBtn: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 12,
    marginTop: 15,
    marginHorizontal: "5%",
    alignItems: "center",
  },
});
