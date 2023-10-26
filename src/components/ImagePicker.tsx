import React, { useState, useEffect } from "react";
import { Image, Button, View, Platform, Pressable } from "react-native";
import Placeholder from "../assets/placeholder.svg";
import * as ExpoImagePicker from "expo-image-picker";

export default function ImagePicker({ image, setImage }) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Pressable
      onPress={pickImage}
      style={{
        backgroundColor: "transparent",
        shadowColor: "black",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      }}
    >
      {!image && <Placeholder width={100} height={100} />}
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
      )}
    </Pressable>
  );
}
