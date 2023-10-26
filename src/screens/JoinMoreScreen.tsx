import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Keyboard,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePicker from "../components/ImagePicker";

export default function JoinMoreScreen() {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleUsernameChange = (text) => {
    setUsername(text);
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
          </View>
          <View style={styles.row}>
            <TextInput
              onChangeText={handleUsernameChange}
              placeholder="Username"
              style={styles.textInput}
            />
          </View>
          <View style={styles.row}>
            <Pressable
              onPress={() => {
                alert(username);
              }}
            >
              <Text>asd</Text>
            </Pressable>
          </View>
          <View>
            <Picker
              selectedValue={gender}
              onValueChange={(item) => setGender(item)}
            >
              <Picker.Item label="라벨_1" value="1" />
              <Picker.Item label="라벨_2" value="2" />
              <Picker.Item label="라벨_3" value="3" />
            </Picker>
            <View>
              <Text>{gender}</Text>
            </View>
          </View>
          <CustomPick />

          <View style={styles.row}>
            <TextInput placeholder="Username" style={styles.textInput} />
          </View>
          <Pressable style={styles.submitBtn} onPress={() => null}>
            <Text>Submit</Text>
          </Pressable>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  defaultLayout: {
    flex: 1,
    paddingTop: "12%",
    backgroundColor: "#F2F2F2",
  },
  container: {
    paddingTop: "15%",
    flex: 1,
    alignItems: "center",
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
    padding: 12,
    paddingTop: 30,
    width: "100%",
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
  },
  submitBtn: {
    backgroundColor: "white",
    padding: 12,
    marginTop: 30,
    marginHorizontal: 16,
    alignItems: "center",
  },
});

function CustomPick() {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const pickerRef: any = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <Picker
      ref={pickerRef}
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
    >
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
}
