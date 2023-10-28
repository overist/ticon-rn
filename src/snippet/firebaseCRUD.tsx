import firestore from "@react-native-firebase/firestore";
//ANCHOR CREATE
const createUser = async (userId, userData) => {
  try {
    await firestore().collection("users").doc(userId).set(userData);
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user: ", error.message);
  }
};

// 사용 예:
createUser("user-id", { email: "user@example.com", name: "User Name" });

//ANCHOR READ
const readUser = async (userId) => {
  try {
    const documentSnapshot = await firestore()
      .collection("users")
      .doc(userId)
      .get();
    if (documentSnapshot.exists) {
      console.log("User data: ", documentSnapshot.data());
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error reading user: ", error.message);
  }
};

// 사용 예:
readUser("user-id");

//ANCHOR UPDATE
const updateUser = async (userId, updatedData) => {
  try {
    await firestore().collection("users").doc(userId).update(updatedData);
    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user: ", error.message);
  }
};

// 사용 예:
updateUser("user-id", { email: "new-email@example.com" });

// ANCHOR useEffect Hook & lifecycle
import React, { useEffect } from "react";
function User({ userId }) {
  useEffect(() => {
    const subscriber = firestore()
      .collection("Users")
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        console.log("User data: ", documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);
}
