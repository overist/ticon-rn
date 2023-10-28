import React from "react";
import { RecoilRoot } from "recoil";
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import Toast from "react-native-toast-message";
import SplashScreen from "./src/screens/splash/SplashScreen";

export default function App() {
  return (
    <>
      <RecoilRoot>
        <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
          <SplashScreen />
        </ReactNativeRecoilPersistGate>
      </RecoilRoot>
      <Toast />
    </>
  );
}
