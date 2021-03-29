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
import DoctorProfileChangePassword from "../screens/DoctorProfile/DoctorProfileChangePassword";
import DoctorScheduleScreen from "../screens/DoctorProfile/DoctorScheduleScreen";
import DoctorServicesScreen from "../screens/DoctorProfile/DoctorServicesScreen";
import ProfileDoctorEditScreen from "../screens/DoctorProfile/ProfileDoctorEditScreen";
import ProfileDoctorMainScreen from "../screens/DoctorProfile/ProfileDoctorMainScreen";
import ProfilePatientEditScreen from "../screens/PatientProfile/ProfilePatientEditScreen";
import ProfilePatientMainScreen from "../screens/PatientProfile/ProfilePatientMainScreen";
import PatientProfileChangePassword from "../screens/PatientProfile/PatientProfileChangePassword";
import DoctorAppointmentHistory from "../screens/DoctorAppointmentHistory";
import PatientAppointmentHistory from "../screens/PatientAppointmentHistory";

const Navigation = () => {
  const [token, setToken] = useState(true);
  const [tokenPatient, setTokenPatient] = useState(false);
  const [tokenDoctor, setTokenDoctor] = useState(true);
  const [reRender, setReRender] = useState(false);

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
          labelStyle: {
            fontFamily: "BalsamiqSans_700Bold",
            paddingBottom: 5,
          },
          style: {
            backgroundColor: "#f4f8ff",
          },

          // inactiveTintColor: "#f4f8ff",
        }}
      >
        <Tab.Screen name="Booking">
          {token
            ? tokenPatient
              ? (props) => <PatientAppointmentScreen {...props} />
              : tokenDoctor
              ? (props) => <DoctorAppointmentScreen {...props} />
              : (props) => <NoBookingScreen {...props} />
            : (props) => <NoBookingScreen {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {token
            ? tokenPatient
              ? (props) => <PatientProfileScreen {...props} />
              : tokenDoctor
              ? (props) => (
                  <DoctorProfileScreen
                    {...props}
                    setReRender={setReRender}
                    reRender={reRender}
                  />
                )
              : (props) => <ProfileStackScreen {...props} />
            : (props) => <ProfileStackScreen {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  };
  function PatientAppointmentScreen() {
    return (
      <Main.Navigator>
        <Main.Screen name="Patient-Booking">
          {(props) => <PatientAppointmentHistory {...props} />}
        </Main.Screen>
      </Main.Navigator>
    );
  }
  function DoctorAppointmentScreen() {
    return (
      <Main.Navigator>
        <Main.Screen name="Doctor-Booking">
          {(props) => <DoctorAppointmentHistory {...props} />}
        </Main.Screen>
      </Main.Navigator>
    );
  }
  function NoBookingScreen() {
    return (
      <Main.Navigator>
        <Main.Screen name="Booking-History">
          {(props) => <BookingScreen {...props} />}
        </Main.Screen>
      </Main.Navigator>
    );
  }
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

  function PatientProfileScreen(props) {
    return (
      <Main.Navigator>
        <Main.Screen name="Patient Profile">
          {() => (
            <ProfilePatientMainScreen
              setToken={setToken}
              setTokenPatient={setTokenPatient}
              {...props}
              reRender={props.reRender}
            />
          )}
        </Main.Screen>
        <Main.Screen name="Edit Your Profile">
          {() => <ProfilePatientEditScreen {...props} />}
        </Main.Screen>
        <Main.Screen name="Patient Change Password">
          {(props) => <PatientProfileChangePassword {...props} />}
        </Main.Screen>
      </Main.Navigator>
    );
  }
  function DoctorProfileScreen(props) {
    return (
      <Main.Navigator>
        <Main.Screen name="Doctor Profile">
          {(props) => (
            <ProfileDoctorMainScreen
              setToken={setToken}
              setTokenDoctor={setTokenDoctor}
              render={reRender}
              {...props}
            />
          )}
        </Main.Screen>
        <Main.Screen name="Edit-Your-Informations">
          {(props) => (
            <ProfileDoctorEditScreen
              {...props}
              setReRender={setReRender}
              render={reRender}
            />
          )}
        </Main.Screen>
        <Main.Screen name="Services">
          {(props) => <DoctorServicesScreen {...props} />}
        </Main.Screen>
        <Main.Screen name="Doctor-Schedule">
          {(props) => <DoctorScheduleScreen {...props} />}
        </Main.Screen>
        <Main.Screen name="Doctor-Change-Password">
          {(props) => <DoctorProfileChangePassword {...props} />}
        </Main.Screen>
      </Main.Navigator>
    );
  }

  const TopTab = createMaterialTopTabNavigator();
  function ProfileTabScreen() {
    return (
      <TopTab.Navigator
        tabBarOptions={{
          activeTintColor: "#f4f8ff",
          inactiveTintColor: "#00c8d7",
          indicatorStyle: {
            height: null,
            top: 0,
            backgroundColor: "#00c8d7",
            borderRadius: 1,
          },
          style: {
            borderColor: "#00c8d7",
            backgroundColor: "#f4f8ff",
          },
          labelStyle: {
            fontFamily: "BalsamiqSans_400Regular",
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
          {(props) => (
            <DoctorAuth
              {...props}
              setToken={setToken}
              setTokenDoctor={setTokenDoctor}
            />
          )}
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
