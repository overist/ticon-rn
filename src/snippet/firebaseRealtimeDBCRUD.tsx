import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import database from "@react-native-firebase/database";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ref = database().ref("/test");
    const onValueChange = ref.on("value", (snapshot) => {
      setData(snapshot.val());
    });

    // Clean-up function
    return () => {
      ref.off("value", onValueChange);
    };
  }, []);

  const handleCreate = () => {
    const newData = { item: "New item" };
    try {
      const result = database().ref("/test").set(newData);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdate = () => {
    database().ref("/test/item").set("Updated item");
  };

  const handleDelete = () => {
    database().ref("/test/item").remove();
  };

  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
      <Button title="Create" onPress={handleCreate} />
      <Button title="Update" onPress={handleUpdate} />
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};

export default App;
