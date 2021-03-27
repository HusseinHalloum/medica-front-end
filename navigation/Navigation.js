import React, { useState } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import WelcomeScreen from "../screens/WelcomeScreen";
import BookingScreen from "../screens/BookingScreen";
import CategoriesAndDoctorsScreen from "../screens/CategoriesAndDoctorsScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import SingleCategoryScreen from "../screens/SingleCategoryScreen";
import DoctorsScreen from "../screens/DoctorsScreen";
import DoctorDetailsScreen from "../screens/DoctorDetailsScreen";
import PatientAuth from "./AuthNavigator/PatientAuth";
import DoctorAuth from "./AuthNavigator/DoctorAuth";
import BookAppointmentScreen from "../screens/BookAppointmentScreen";

const Navigation = () => {
  const [token, setToken] = useState(false);
  const [tokenPatient, setTokenPatient] = useState(false);
  const [tokenDoctor, setTokenDoctor] = useState(false);

  let options = {
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowRadius: 0,
      backgroundColor: "#f4f8ff",
    },
  };
  let doctorDetailOptions = {
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      shadowRadius: 0,
      backgroundColor: "#192a56",
    },
  };
  console.log(token);
  const Tab = createBottomTabNavigator();
  const OverviewScreen = (props) => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Booking") {
              iconName = focused
                ? "ios-list-circle"
                : "ios-list-circle-outline";
            } else if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#00c8d7",
          inactiveTintColor: "#192a56",
          keyboardHidesTabBar: true,
          labelStyle: { fontFamily: "BalsamiqSans_700Bold", paddingBottom: 5 },

          // inactiveTintColor: "#f4f8ff",
        }}
      >
        <Tab.Screen name="Booking">
          {(props) => <BookingScreen {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {(props) => <ProfileStackScreen {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  };

  const Main = createStackNavigator();
  function HomeScreen() {
    return (
      <Main.Navigator
        screenOptions={{
          headerTitleStyle: {
            paddingLeft: 60,
            fontFamily: "BalsamiqSans_700Bold",
            color: "#192a56",
          },
        }}
      >
        <Main.Screen
          name="CategoriesAndDoctors"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <CategoriesAndDoctorsScreen {...props} />}
        </Main.Screen>
        <Main.Screen name="Categories" options={options}>
          {(props) => <CategoriesScreen {...props} />}
        </Main.Screen>
        <Main.Screen name="single-category" options={options}>
          {(props) => <SingleCategoryScreen {...props} />}
        </Main.Screen>
        <Main.Screen name="Doctors" options={options}>
          {(props) => <DoctorsScreen {...props} />}
        </Main.Screen>
        <Main.Screen name="doctor-details" options={doctorDetailOptions}>
          {(props) => <DoctorDetailsScreen {...props} />}
        </Main.Screen>
        <Main.Screen name="Appointment" options={options}>
          {(props) => <BookAppointmentScreen {...props} />}
        </Main.Screen>
      </Main.Navigator>
    );
  }
  const StackWithTop = createStackNavigator();
  function ProfileStackScreen() {
    return (
      <StackWithTop.Navigator
        screenOptions={{
          headerTitleStyle: {
            color: "#f4f8ff",
          },
        }}
      >
        <StackWithTop.Screen
          name="ProfileTop"
          options={options}
          // options={{
          //   headerShown: false,
          // }}
          // options={{
          //   headerTitle: (props) => (
          //     <View style={{ height: 200 }}>
          //       <Text>blah blah blah</Text>
          //     </View>
          //   ),
          //   headerLeft: false,
          //   headerTitleStyle: {
          //     flex: 1,
          //     textAlign: "center",
          //   },
          // }}
        >
          {(props) => <ProfileTabScreen {...props} />}
        </StackWithTop.Screen>
      </StackWithTop.Navigator>
    );
  }

  const TopTab = createMaterialTopTabNavigator();
  function ProfileTabScreen() {
    return (
      <TopTab.Navigator
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "#00c8d7",
          indicatorStyle: {
            height: null,
            top: 0,
            backgroundColor: "#00c8d7",
            borderRadius: 1,
          },
          style: {
            borderColor: "#00c8d7",
            backgroundColor: "white",
          },
          tabStyle: {
            justifyContent: "center",
          },
        }}
      >
        <TopTab.Screen name="Patient">
          {(props) => (
            <PatientAuth
              {...props}
              setToken={setToken}
              setTokenPatient={setTokenPatient}
            />
          )}
        </TopTab.Screen>
        <TopTab.Screen name="Doctor">
          {(props) => <DoctorAuth {...props} />}
        </TopTab.Screen>
      </TopTab.Navigator>
    );
  }

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <WelcomeScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Overview"
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        {(props) => <OverviewScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Navigation;
