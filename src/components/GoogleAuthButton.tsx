import React from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { handleAuth } from "../common/handleAuth";
import { userAtom } from "../store/atoms";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import firestore from "@react-native-firebase/firestore";

GoogleSignin.configure({
  webClientId:
    "564130301164-s62qsrb50gf1urtiq77l516gs9dc8bg5.apps.googleusercontent.com",
});

export default function GoogleAuthButton({ Trigger }) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const resetUserState = useResetRecoilState(userAtom);
  const setUserState = useSetRecoilState(userAtom);

  const signIn = async () => {
    try {
      // Sign in with Google
      const { idToken } = await GoogleSignin.signIn();

      // Create a new Firebase credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in to Firebase with the Google Auth credentials
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );
      const user = userCredential.user;
      await firestore().collection("users").doc(user.uid).set({
        email: user.email,
      });

      handleAuth(user, setUserState, resetUserState, navigation);
    } catch (error) {
      console.error(error);
    }
  };

  return <Trigger onPress={signIn} />;
}
