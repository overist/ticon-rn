import React, { useState } from "react";
import { StyleSheet, TextInput, Animated } from "react-native";

export default function CustomTextInput({
  value,
  onChangeText,
  placeholder = null,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(scaleValue, {
      toValue: 1.02,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.textInput,
        isFocused && styles.textInput_hover,
        { transform: [{ scale: scaleValue }] },
      ]}
    >
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingBottom: 10,
  },
  textInput_hover: {
    // boxShadow is not supported, use elevation for Android and shadow* props for iOS
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 5 }, // iOS
    shadowOpacity: 0.5, // iOS
    shadowRadius: 10, // iOS
    elevation: 1, // Android
  },
});
