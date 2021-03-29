import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePatientMainScreen = (props) => {
  const logout = async () => {
    await AsyncStorage.clear();
    props.setToken(false);
    props.setTokenPatient(false);
  };
  return (
    <View>
      <Text>Welcome to Main Patient Profile</Text>
      <TouchableOpacity
        onPress={logout}
        style={{ padding: 10, backgroundColor: "blue" }}
      >
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePatientMainScreen;
