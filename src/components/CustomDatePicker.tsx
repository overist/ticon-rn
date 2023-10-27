import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, View } from "react-native";

export default function CustomDatePicker({ Trigger, state, setState }) {
  const [show, setShow] = useState(false);
  const [beforeValue, setBeforeValue] = useState(state);

  return (
    <>
      {!show && <Trigger onPress={() => setShow(true)} />}

      {show && (
        <View>
          <DateTimePicker
            mode="date"
            display="spinner"
            onChange={(e, date) => {
              e.nativeEvent.timestamp;
              setBeforeValue(date);
              setState(date);
            }}
            value={state}
          />
          <Button
            title="선택 완료"
            onPress={() => {
              setShow(false);
            }}
          />
        </View>
      )}
    </>
  );
}
