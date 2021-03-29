import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfilePatientEditScreen = (props) => {
  const [address, setAddress] = useState([]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const addressList = address.map((address) => {
    return (
      <Picker.Item label={address.name} value={address.id} key={address.id} />
    );
  });
  useEffect(() => {
    const response = async () => {
      return await axios
        .get("http://192.168.1.12:8000/api/address")
        .then((response) => {
          setAddress(response.data.address);
        });
    };
    response();
  }, []);

  const openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage(pickerResult.uri);
  };

  const storeData = async (token, doctor) => {
    try {
      await AsyncStorage.setItem("tokenPatient", token);
      await AsyncStorage.setItem("patient", patient);
      props.setToken(true);
      props.setTokenPatient(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("firstname", firstname);
    body.append("lastname", lastname);
    body.append("email", email);
    body.append("phone", phone);
    body.append("age", age);
    body.append("gender", selectedGender);
    body.append("image", selectedImage);
    body.append("address_id", selectedAddress);
    console.log(body);
    try {
      await axios
        .post(
          `http://192.168.1.12:8000/api/update-patient/${props.route.params.patient.id}`,
          body,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            const token = response.data.access_token;
            const patient = JSON.stringify(response.data.patient);
            console.log(token);
            console.log(patient);
            storeData(token, patient);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

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
        <View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Firstname</Text>
            </View>
            <View>
              <TextInput
                value={firstname}
                onChangeText={(firstname) => setFirstname(firstname)}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Lastname</Text>
            </View>
            <View>
              <TextInput
                value={lastname}
                onChangeText={(lastname) => setLastname(lastname)}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Email</Text>
            </View>
            <View>
              <TextInput
                value={email}
                keyboardType="email-address"
                onChangeText={(email) => setEmail(email)}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Phone</Text>
            </View>
            <View>
              <TextInput
                value={phone}
                keyboardType="numeric"
                onChangeText={(phone) => setPhone(phone)}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Age</Text>
            </View>
            <View>
              <TextInput
                value={age}
                keyboardType="numeric"
                onChangeText={(age) => setAge(age)}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Profile Photo</Text>
            </View>
            <TouchableOpacity
              onPress={openImagePickerAsync}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Gender</Text>
            </View>
            <View>
              <Picker
                itemStyle={{ color: "#00c8d7" }}
                mode="dropdown"
                selectedValue={selectedGender}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedGender(itemValue)
                }
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Address</Text>
            </View>
            <View>
              <Picker
                mode="dropdown"
                selectedValue={selectedAddress}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedAddress(itemValue)
                }
              >
                {addressList}
              </Picker>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}> Sign Up </Text>
              {/* <Icon name="login" color="white" size={18} /> */}
            </TouchableOpacity>
          </View>
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
    fontFamily: "BalsamiqSans_400Regular",
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
    marginVertical: 30,
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
    paddingLeft: 0,
    marginBottom: 0,
    // marginVertical: 1,
    // color: "rgb(0,200,215)",
    borderBottomWidth: 2,
    borderColor: "rgb(0,200,215)",
    color: "#192a56",
    fontFamily: "BalsamiqSans_400Regular",
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
  },
});

export default ProfilePatientEditScreen;
