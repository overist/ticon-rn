import ReactNativeRecoilPersist from "react-native-recoil-persist";
import { atom } from "recoil";

export const userAtom = atom({
  key: "user",
  default: {
    id: "",
    email: "",
    username: "",
    gender: 0,
    birthday: "",
  },
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
