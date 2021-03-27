import React from "react";
import { View, Text, Button } from "react-native";

const WelcomeScreen = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>hello people</Text>
      <Button
        onPress={() => props.navigation.navigate("Overview")}
        style={{ width: "100px", padding: "10px" }}
        title="Get Started"
      ></Button>
    </View>
  );
};

export default WelcomeScreen;
