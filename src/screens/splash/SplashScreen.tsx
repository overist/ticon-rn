import { StyleSheet, Text, View } from "react-native";
import Navigation from "../../navigation/Navigation";
import React, { useEffect, useState } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { userAtom } from "../../store/atoms";
import { useSetRecoilState, useResetRecoilState } from "recoil";

export default function SplashScreen() {
  const setUserState = useSetRecoilState(userAtom);
  const resetUserState = useResetRecoilState(userAtom);

  useEffect(() => {
    async function prepareApp() {
      await ExpoSplashScreen.preventAutoHideAsync();
      try {
        const userId = auth().currentUser?.uid;
        const userDoc = await firestore().collection("users").doc(userId).get();

        if (userDoc.data()?.email) {
          console.log("app firestore user check", userDoc);

          setUserState({
            email: userDoc.data()?.email,
            username: userDoc.data()?.username,
            gender: userDoc.data()?.gender,
            birth: userDoc.data()?.birth,
            imageUrl: userDoc.data()?.imageUrl,
          });
        } else {
          console.log("No user data found!");
          resetUserState();
        }
      } catch (error) {
        console.error(error);
        resetUserState();
      } finally {
        await ExpoSplashScreen.hideAsync();
      }
    }

    prepareApp();
  }, []);

  return <Navigation />;
}
