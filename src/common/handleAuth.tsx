import Toast from "react-native-toast-message";
import firestore from "@react-native-firebase/firestore";

export const handleAuth = async (
  user,
  setUserState,
  resetUserState,
  navigation
) => {
  if (!user.uid) {
    console.log("No user data found!", user);
    resetUserState();
    return;
  }

  const userDoc = await firestore().collection("users").doc(user.uid).get();
  console.log("회원정보 조회 성공", userDoc);
  Toast.show({
    type: "success",
    text1: "회원정보 조회 성공",
    text2: `${userDoc.data().email}으로 인증`,
  });

  try {
    const userDoc = await firestore().collection("users").doc(user.uid).get();

    if (userDoc.data().username) {
      console.log("firestore user", userDoc);
      setUserState({
        email: userDoc.data()?.email,
        username: userDoc.data()?.username,
        gender: userDoc.data()?.gender,
        birth: userDoc.data()?.birth,
        imageUrl: userDoc.data()?.imageUrl,
      });
      navigation.replace("bottom");
    } else {
      console.log("No user data found!", userDoc.data());
      navigation.push("join");
    }
  } catch (error) {
    console.log(error);
    resetUserState();
    Toast.show({
      type: "error",
      text1: "유저 정보 로드 실패",
      text2: `다시 로그인해주세요.`,
    });
  }
};
