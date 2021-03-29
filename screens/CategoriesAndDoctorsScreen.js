import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

const CategoriesAndDoctorsScreen = (props) => {
  const [categories, setCategories] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const width = Dimensions.get("window").width; //full width

  useEffect(() => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
          console.log({ [store[i][0]]: store[i][1] });
          return true;
        });
      });
    });
    async function fetchCategoryData() {
      await axios
        .get("http://192.168.1.12:8000/api/category")
        .then((response) => {
          setCategories(response.data.category);
        });
    }
    async function fetchDoctorData() {
      await axios
        .get("http://192.168.1.12:8000/api/doctors")
        .then((response) => {
          setDoctors(response.data.doctors);
        });
    }
    fetchCategoryData();
    fetchDoctorData();
  }, []);
  const ListItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: `http://192.168.1.12:8000/storage/${item.image}`,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };
  const ListDoctorItem = ({ item }) => {
    return (
      <View style={styles.wrapperDoctor}>
        <View style={styles.wrapperDoctorPhoto}>
          <Image
            source={{
              uri: `http://192.168.1.12:8000/storage/${item.image}`,
            }}
            style={styles.doctorPhoto}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text style={styles.doctorText}>
            Dr. {item.firstname} {item.lastname}
          </Text>
          <Text style={styles.doctorSubText}>{item.category.name}</Text>
          <Text style={styles.doctorSubText}>{item.address.name}</Text>
        </View>
      </View>
    );
  };

  const categoriesSliced = categories.slice(0, 4);
  const doctorsSliced = doctors.slice(0.4);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        style="Dark"
        backgroundColor="#f4f8ff"
        // translucent={true}
        barStyle="default"
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <View
          style={{ marginHorizontal: 15 }}
          // style={{ flex: 1, alignItems: "center", backgroundColor: "black" }}
        >
          <View>
            <Text style={styles.title1}>Do you need any help ?</Text>
            <Text style={styles.title2}>Let's Find Your</Text>
            <Text style={styles.title3}>Doctor</Text>
          </View>
          <View>
            <View style={styles.flex}>
              <Text style={styles.subtitle}>Categories</Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Categories", { categories })
                }
              >
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                horizontal
                data={categoriesSliced}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ListItem item={item} />}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View>
            <View style={styles.flex}>
              <Text style={styles.subtitle}>Doctors</Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Doctors", { doctors })
                }
              >
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                data={doctorsSliced}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ListDoctorItem item={item} />}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoriesAndDoctorsScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#f4f8ff",
    flex: 1,
  },
  contentContainer: {
    // alignItems: "center",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#f4f4f4",
    marginTop: 20,
    marginBottom: 5,
  },
  title1: {
    marginTop: 10,
    color: "#192a56",

    fontSize: 20,
    fontFamily: "BalsamiqSans_400Regular",
  },
  title2: {
    color: "#192a56",
    marginTop: -8,
    fontSize: 33,
    fontFamily: "BalsamiqSans_700Bold",
  },
  title3: {
    marginTop: -15,
    color: "#192a56",
    fontSize: 33,
    fontFamily: "BalsamiqSans_700Bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#192a56",
    fontSize: 18,
    fontFamily: "BalsamiqSans_400Regular",
  },
  seeAll: {
    fontSize: 16,
    color: "#00c8d7",
    fontFamily: "BalsamiqSans_700Bold",
  },
  item: {
    width: 120,
    height: 120,
    margin: 20,
    marginLeft: 10,
    shadowColor: "#192a56",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: "#00c8d7",
    borderRadius: 10,
  },
  itemPhoto: {
    // borderColor: "black",
    // borderWidth: 2,
    width: 50,
    height: 50,
    marginVertical: 10,
    // borderRadius: 50 / 2,
  },
  imageWrapper: {
    alignItems: "center",
  },
  itemText: {
    color: "#192a56",
    marginTop: 5,
    textAlign: "center",
    fontSize: 15,
    fontFamily: "BalsamiqSans_700Bold",
  },
  wrapperDoctor: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
    backgroundColor: "white",
    shadowColor: "#192a56",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  doctorPhoto: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  wrapperDoctorPhoto: {
    marginRight: 10,
  },
  doctorText: {
    color: "#192a56",
    fontSize: 20,
    textAlign: "left",
    fontFamily: "BalsamiqSans_700Bold",
    marginBottom: 5,
  },
  doctorSubText: {
    color: "#465477",
    textAlign: "left",
    fontFamily: "BalsamiqSans_400Regular",
  },
});
