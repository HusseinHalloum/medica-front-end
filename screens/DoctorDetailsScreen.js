import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const DoctorDetailsScreen = (props) => {
  const [services, setServices] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(props.route.params.item);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `http://192.168.1.12:8000/api/services/${props.route.params.item.id}`
        )
        .then((response) => {
          setServices(response.data.services);
        });
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor="#192a56"
        translucent={true}
        barStyle="default"
      />
      <ScrollView
        contentContainerStyle={{ backgroundColor: "#192a56" }}
        style={styles.container}
      >
        <View style={{ backgroundColor: "#192a56" }}>
          <View style={styles.info}>
            <View
              style={{
                shadowColor: "#192a56",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.6,
                shadowRadius: 5,
                elevation: 15,
                // borderColor: "black",
                // borderWidth: 2,
                width: 120,
                // borderRadius: 20,
                margin: 10,
              }}
            >
              <Image
                source={{
                  uri: `http://192.168.1.12:8000/storage/${doctorDetails.image}`,
                }}
                style={styles.itemPhoto}
              />
            </View>
            <View style={styles.name}>
              <Text style={styles.itemText}>
                Dr. {doctorDetails.firstname} {doctorDetails.lastname}
              </Text>
              <View style={styles.info}>
                <View style={styles.icon}>
                  <Fontisto name="doctor" size={20} color="#00c8d7" />
                </View>
                <Text style={styles.text}>{doctorDetails.category.name}</Text>
              </View>

              <View style={styles.info}>
                <View style={styles.icon}>
                  <MaterialIcons
                    name="location-pin"
                    size={20}
                    color="#00c8d7"
                  />
                </View>
                <Text style={styles.text}>{doctorDetails.address.name}</Text>
              </View>
              <View style={styles.info}>
                <View style={styles.icon}>
                  <Entypo name="phone" size={16} color="#00c8d7" />
                </View>
                <Text style={styles.text}> {doctorDetails.phone}</Text>
              </View>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={styles.info}>
              <View style={styles.icon}>
                <Entypo name="circle-with-plus" size={25} color="#00c8d7" />
              </View>
              <Text style={styles.text}>
                {doctorDetails.experience} experience
              </Text>
            </View>
            <View style={styles.info}>
              <View style={styles.icon}>
                <Ionicons name="pricetags" size={24} color="#00c8d7" />
              </View>
              <Text style={styles.text}> ${doctorDetails.price}.00</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bookButton}
            onPress={() =>
              props.navigation.navigate("Appointment", { id: doctorDetails.id })
            }
          >
            <Text style={styles.bookButtonText}>Book An Appointment</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            backgroundColor: "#f4f8ff",
          }}
        >
          <View>
            <Text style={styles.subtitle}>Services </Text>
          </View>
          <View>
            <FlatList
              data={services}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <View style={{ margin: 5, paddingHorizontal: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome
                        name="dot-circle-o"
                        size={16}
                        color="#192a56"
                      />
                      <Text style={styles.service}>{item.service}</Text>
                    </View>
                  </View>
                );
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
    margin: 3,

    // borderTopRightRadius: 40,
    // borderTopLeftRadius: 40,
  },
  item: {
    margin: 10,
    width: "40%",
    borderColor: "#00c8d7",
  },
  itemPhoto: {
    width: 120,
    height: 120,
    borderColor: "#00c8d7",
    borderWidth: 1,
    borderRadius: 20,
  },
  itemText: {
    color: "#f4f8ff",
    fontSize: 22,
    textAlign: "left",
    fontFamily: "BalsamiqSans_700Bold",
    margin: 5,
  },
  text: {
    // color: "#000249",
    color: "#f4f8ff",
    fontSize: 16,
    textAlign: "left",
    fontFamily: "BalsamiqSans_400Regular",
  },
  icon: {
    marginRight: 10,
    justifyContent: "center",
  },
  subtitle: {
    color: "#192a56",
    fontSize: 22,
    fontFamily: "BalsamiqSans_700Bold",
    padding: 10,
  },
  service: {
    color: "#192a56",
    fontSize: 16,
    fontFamily: "BalsamiqSans_400Regular",
    paddingLeft: 10,
  },
  bookButton: {
    margin: 10,
    marginBottom: 30,
    paddingTop: 10,
    paddingBottom: 13,
    backgroundColor: "#00c8d7",
    borderRadius: 10,
  },
  bookButtonText: {
    color: "#192a56",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "BalsamiqSans_700Bold",
  },
});
