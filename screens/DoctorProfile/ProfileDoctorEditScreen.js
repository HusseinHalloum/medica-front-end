import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileDoctorEditScreen = (props) => {
  // const { setReRender } = props.setReRender;

  const [address, setAddress] = useState([]);
  const [category, setCategory] = useState([]);

  const [firstname, setFirstname] = useState(
    props.route.params.doctor.firstname
  );
  const [lastname, setLastname] = useState(props.route.params.doctor.lastname);
  const [email, setEmail] = useState(props.route.params.doctor.email);
  const [phone, setPhone] = useState(props.route.params.doctor.phone);
  const [experience, setExperience] = useState(
    props.route.params.doctor.experience
  );
  const [price, setPrice] = useState(props.route.params.doctor.price);
  const [selectedAddress, setSelectedAddress] = useState(
    props.route.params.doctor.address_id
  );
  const [selectedCategory, setSelectedCategory] = useState(
    props.route.params.doctor.category_id
  );
  const [selectedImage, setSelectedImage] = useState(null);

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

  const openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage(pickerResult.uri);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("firstname", firstname);
    body.append("lastname", lastname);
    body.append("email", email);
    body.append("phone", phone);
    body.append("experience", experience);
    body.append("price", price);
    body.append("image", selectedImage);
    body.append("category_id", selectedCategory);
    body.append("address_id", selectedAddress);
    console.log(body);
    try {
      await axios
        .post(
          `http://192.168.1.12:8000/api/update-doctor/${props.route.params.doctor.id}?_method=PUT`,

          body,
          {
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
            },
          }
        )
        .then((response) => {
          AsyncStorage.setItem("doctor", JSON.stringify(response.data.doctor));
          props.setReRender(!props.render);
          alert("successfully updated !!");
          props.navigation.goBack();
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f8ff" }}>
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
                keyboardType="phone-pad"
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
                keyboardType="numeric"
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
              <Text style={styles.labelText}>Category</Text>
            </View>
            <View>
              <Picker
                style={{ borderWidth: 1, borderColor: "#00c8d7" }}
                mode="dropdown"
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedCategory(itemValue);
                }}
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

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}> Update </Text>
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
    fontFamily: "BalsamiqSans_400Regular",

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
    fontFamily: "BalsamiqSans_400Regular",
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
    color: "#192a56",
    fontFamily: "BalsamiqSans_400Regular",
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

export default ProfileDoctorEditScreen;
