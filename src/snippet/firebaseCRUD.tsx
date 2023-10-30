import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import firestore from "@react-native-firebase/firestore";

// ANCHOR Subscribe to a document
const useDocumentSubscription = (collection, docId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // 데이터 실간구독 -> 리액트 스테이트 반환 훅스
  useEffect(() => {
    const subscriber = firestore()
      .collection(collection)
      .doc(docId)
      .onSnapshot(
        (documentSnapshot) => {
          setData(documentSnapshot.data());
        },
        (err) => {
          setError(err);
        }
      );

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [collection, docId]);

  return { data, error };
};

//ANCHOR CRUD Functions
const createUser = async (userId, userData) => {
  try {
    await firestore().collection("users").doc(userId).set(userData);
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user: ", error.message);
  }
};

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

const updateUser = async (userId, updatedData) => {
  try {
    await firestore().collection("users").doc(userId).update(updatedData);
    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user: ", error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    await firestore().collection("users").doc(userId).delete();
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user: ", error.message);
  }
};

//ANCHOR Component
function User({ userId }) {
  const { data, error } = useDocumentSubscription("users", userId);

  if (error) {
    console.error("Error subscribing to document: ", error.message);
  }

  return (
    <View>
      {data ? (
        <View>
          <Text>Name: {data.name}</Text>
          <Text>Email: {data.email}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button
        title="Create User"
        onPress={() =>
          createUser(userId, { name: "New User", email: "new@example.com" })
        }
      />
      <Button title="Read User" onPress={() => readUser(userId)} />
      <Button
        title="Update User"
        onPress={() => updateUser(userId, { email: "updated@example.com" })}
      />
      <Button title="Delete User" onPress={() => deleteUser(userId)} />
    </View>
  );
}

export default User;
