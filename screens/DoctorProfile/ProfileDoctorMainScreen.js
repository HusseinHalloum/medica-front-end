import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const ProfileDoctorMainScreen = (props) => {
  const [tokenDoctor, setTokenDoctor] = useState(null);
  const [doctor, setDoctor] = useState("");
  useEffect(() => {
    async function getInfo() {
      const doctorToken = await AsyncStorage.getItem("tokenDoctor");
      const doctor = await AsyncStorage.getItem("doctor");
      setTokenDoctor(doctorToken);
      setDoctor(JSON.parse(doctor));
    }
    getInfo();
  }, [props.reRender]);
  const logout = async () => {
    await AsyncStorage.clear();
    props.setToken(false);
    props.setTokenDoctor(false);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {doctor != null && doctor.image != "null" ? (
          <Image
            source={{
              uri: `http://192.168.1.12:8000/storage/${doctor.image}`,
            }}
            style={{ width: 120, height: 155, marginBottom: 15 }}
          />
        ) : (
          <Image
            style={{ width: 100, height: 100, marginBottom: 15 }}
            source={require("../../assets/doctor-avatar.jpg")}
          />
        )}
        <View
          style={{
            width: 200,
            backgroundColor: "#192a56",
            padding: 10,
            borderRadius: 10,
            marginBottom: -20,
            shadowColor: "#192a56",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 15,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3,
          }}
        >
          <Text
            style={[styles.buttonText, { fontFamily: "BalsamiqSans_700Bold" }]}
          >
            {doctor.firstname} {doctor.lastname}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingTop: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#f4f8ff",
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          style={[styles.button]}
          activeOpacity={0.9}
          onPress={() => {
            props.navigation.navigate("Edit-Your-Informations", {
              doctor: doctor,
            });
          }}
        >
          <View>
            <FontAwesome5 name="user-edit" size={24} color="#f4f8ff" />

            <Text style={styles.buttonText}>Edit Profile</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#f4f8ff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          activeOpacity={0.9}
          onPress={() => {
            props.navigation.navigate("Doctor-Schedule", {
              id: doctor.id,
            });
          }}
        >
          <View>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={24}
              color="#f4f8ff"
            />
            <Text style={styles.buttonText}>Schedule</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#f4f8ff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button]}
          activeOpacity={0.9}
          onPress={() => {
            props.navigation.navigate("Services", {
              id: doctor.id,
            });
          }}
        >
          <View>
            <MaterialIcons name="medical-services" size={24} color="#f4f8ff" />

            <Text style={styles.buttonText}>Services</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#f4f8ff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          activeOpacity={0.9}
          onPress={() => {
            props.navigation.navigate("Doctor-Change-Password", {
              doctor: doctor,
            });
          }}
        >
          <View>
            <AntDesign name="unlock" size={24} color="#f4f8ff" />

            <Text style={styles.buttonText}>Change Password</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#f4f8ff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={[styles.button, { backgroundColor: "#821636" }]}
          activeOpacity={0.9}
        >
          <Text style={[styles.buttonText, { textAlign: "center" }]}>
            logout
          </Text>
          <AntDesign name="logout" size={16} color="#f4f8ff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileDoctorMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00c8d7",
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    height: 220,
    backgroundColor: "#00c8d7",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#192a56",
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "BalsamiqSans_400Regular",
    color: "#f4f8ff",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
