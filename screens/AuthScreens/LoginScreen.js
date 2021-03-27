import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const LoginScreen = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f8ff" }}>
      <StatusBar
        style="Dark"
        backgroundColor="#f4f8ff"
        translucent={true}
        barStyle="default"
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <View style={styles.inputContainer}>
          <View style={styles.label}>
            <Icon
              name="email"
              size={20}
              color="rgb(0,200,215)"
              containerStyle={{
                paddingRight: 15,
              }}
            />
            <Text style={styles.labelText}>Email Address</Text>
          </View>
          <View>
            <TextInput
              value={props.email}
              keyboardType="email-address"
              onChangeText={props.setEmail}
              placeholderTextColor="white"
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.label}>
            <Icon
              name="lock"
              size={20}
              color="rgb(0,200,215)"
              containerStyle={{
                paddingRight: 15,
              }}
            />
            <Text style={styles.labelText}>Password</Text>
          </View>
          <View>
            <TextInput
              value={props.password}
              secureTextEntry={true}
              onChangeText={props.setPassword}
              placeholderTextColor="white"
              style={styles.input}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
        <View style={styles.flex}>
          <Text style={{ fontSize: 18 }}>Don't have an account ?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(props.name)}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#f4f8ff",
    flex: 1,
    marginTop: 50,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // marginTop: 10,
  },
  labelText: {
    color: "rgb(0,200,215)",
    fontSize: 15,
    // textTransform: "uppercase",
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgb(0,200,215)",
    width: 300,
    padding: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "white",
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 35,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  input: {
    height: 40,
    width: 280,
    fontSize: 15,
    padding: 10,
    marginBottom: 0,
    // marginVertical: 1,
    // color: "rgb(0,200,215)",
    borderBottomWidth: 2,
    borderColor: "rgb(0,200,215)",
    // borderRadius: 5,
  },

  inputContainer: {
    // height: 60,
    margin: 20,
    // backgroundColor: "#f4f8ff",
    // width: 260,
    // borderBottomWidth: 1,
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // paddingBottom: 0,
    // borderColor: "white",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
  },
});

export default LoginScreen;
