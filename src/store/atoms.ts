import ReactNativeRecoilPersist from "react-native-recoil-persist";
import { atom, selector, selectorFamily } from "recoil";

export const userAtom = atom({
  key: "user",
  default: {
    uid: "",
    email: "",
    username: "",
    gender: 0,
    birth: "",
    imageUrl: "",
  },
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export type ChatRoomType = {
  matchId: string;
  role: "publisher" | "subscriber";
  partnerId: string;
  partnerName: string;
  partnerImageUrl: string;
  partnerGender: number;
  timestamp: number;
};

export const chatRoomAtom = atom<ChatRoomType[]>({
  key: "chatRoom",
  default: [],
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
