import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const PatientSignUpScreen = () => {
  const [address, setAddress] = useState([]);
  const [category, setCategory] = useState([]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [price, setPrice] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const addressList = address.map((address) => {
    return (
      <Picker.Item label={address.name} value={address.id} key={address.id} />
    );
  });
  const categoryList = category.map((category) => {
    return (
      <Picker.Item
        label={category.name}
        value={category.id}
        key={category.id}
      />
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
    const responseCategory = async () => {
      return await axios
        .get("http://192.168.1.12:8000/api/category")
        .then((response) => {
          setCategory(response.data.category);
        });
    };
    response();
    responseCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("firstname", firstname);
    body.append("laststname", laststname);
    body.append("email", email);
    body.append("password", password);
    body.append("phone", phone);
    body.append("experience", experience);
    body.append("price", price);
    body.append("category", selectedCategory);
    body.append("address", selectedAddress);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
                // placeholder="Email Address"
                placeholderTextColor="white"
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
                placeholderTextColor="white"
                // placeholder="Password"
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
                onChangeText={(email) => setEmail(email)}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Password</Text>
            </View>
            <View>
              <TextInput
                value={password}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                placeholderTextColor="white"
                // placeholder="Password"
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
                onChangeText={(phone) => setPhone(phone)}
                placeholderTextColor="white"
                // placeholder="Password"
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Experience</Text>
            </View>
            <View>
              <TextInput
                value={experience}
                onChangeText={(experience) => setExperience(experience)}
                placeholderTextColor="white"
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Price</Text>
            </View>
            <View>
              <TextInput
                value={price}
                onChangeText={(price) => setPrice(price)}
                placeholderTextColor="white"
                // placeholder="Password"
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Category</Text>
            </View>
            <View>
              <Picker
                style={{ borderWidth: 1, borderColor: "#00c8d7" }}
                mode="dropdown"
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategory(itemValue)
                }
              >
                {categoryList}
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

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}> Sign Up </Text>
            {/* <Icon name="login" color="white" size={18} /> */}
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

export default PatientSignUpScreen;
