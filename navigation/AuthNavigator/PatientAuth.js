import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "../../screens/AuthScreens/LoginScreen";
import PatientSignUpScreen from "../../screens/AuthScreens/PatientSignUpScreen";

const PatientAuth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await fetch("http://192.168.1.12:8000/api/patient-login", {
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
    console.log(response);
    console.log(result);
    if (result == 200) {
      const storeData = async () => {
        const token = response.access_token;
        const patient = JSON.stringify(response.patient);
        try {
          await AsyncStorage.setItem("tokenPatient", token);
          await AsyncStorage.setItem("patient", patient);
          props.setToken(true);
          props.setTokenPatient(true);
          setEmail("");
          setPassword("");
        } catch (e) {
          console.log(e);
        }
      };
      storeData();
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
        name="Patient-Login"
        options={{
          headerShown: false,
        }}
      >
        {(props) => (
          <LoginScreen
            {...props}
            navigation={navigation}
            name="Patient-SignUp"
            email={email}
            setEmail={(email) => setEmail(email)}
            password={password}
            setPassword={(password) => setPassword(password)}
            handleSubmit={handleSubmit}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Patient-SignUp"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <PatientSignUpScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
export default PatientAuth;
