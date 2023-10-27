import { Button, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "564130301164-s62qsrb50gf1urtiq77l516gs9dc8bg5.apps.googleusercontent.com",
});

export default function GoogleAuthButton({ Trigger }) {
  const signIn = async () => {
    try {
      // Sign in with Google
      const { idToken } = await GoogleSignin.signIn();

      // Create a new Firebase credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in to Firebase with the Google Auth credentials
      const { user } = await auth().signInWithCredential(googleCredential);

      console.log("user", user);
    } catch (error) {
      console.error(error);
    }
  };

  return <Trigger onPress={signIn} />;
}
