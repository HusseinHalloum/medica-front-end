import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "../../screens/AuthScreens/LoginScreen";
import DoctorSignUpScreen from "../../screens/AuthScreens/DoctorSignUpScreen";

export default function DoctorAuth(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const storeData = async (token, doctor) => {
    try {
      await AsyncStorage.setItem("tokenDoctor", token);
      await AsyncStorage.setItem("doctor", doctor);
      props.setToken(true);
      props.setTokenDoctor(true);
      setEmail("");
      setPassword("");
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await fetch("http://192.168.1.12:8000/api/doctor-login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const response = await request.json();
    const result = request.status;
    if (result == 200) {
      const token = response.access_token;
      const doctor = JSON.stringify(response.doctor);
      storeData(token, doctor);
      // const store = await AsyncStorage.getItem("token");
    } else {
      alert("You are not authorized to login !");
    }
  };

  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Doctor-Login"
        options={{
          headerShown: false,
        }}
      >
        {(props) => (
          <LoginScreen
            {...props}
            navigation={navigation}
            name="Doctor-SignUp"
            email={email}
            setEmail={(email) => setEmail(email)}
            password={password}
            setPassword={(password) => setPassword(password)}
            handleSubmit={handleSubmit}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Doctor-SignUp"
        options={{
          headerShown: false,
        }}
      >
        {(props) => (
          <DoctorSignUpScreen
            {...props}
            setToken={props.setToken}
            setTokenDoctor={props.setTokenDoctor}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
