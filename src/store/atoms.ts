import ReactNativeRecoilPersist from "react-native-recoil-persist";
import { atom } from "recoil";

export const testAtom = atom({
  default: "I am a test",
  key: "test",
  // Add this effect to the atom to persist it
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
