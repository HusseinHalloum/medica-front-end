import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import SearchComponent from "../components/Search";
import { TouchableOpacity } from "react-native-gesture-handler";

const DoctorsScreen = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [doctors, setDoctors] = useState(props.route.params.doctors);
  const [data, setData] = useState(props.route.params.doctors);

  const searchFilterFunction = (text) => {
    setSearchValue(text);
    const formattedQuery = text.toLowerCase();
    const filteredData = data.filter((item) => {
      return item.firstname.toLowerCase().includes(formattedQuery);
    });
    setDoctors(filteredData);
  };

  return (
    <View style={styles.container}>
      <SearchComponent
        change={searchValue}
        searchInput={(e) => searchFilterFunction(e)}
        placeholder="Search Doctor ..."
      />

      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          // justifyContent: "space-around",
        }}
        style={styles.container}
      >
        {doctors.map((item) => (
          <View style={styles.item}>
            <View style={styles.itemInside}>
              <View style={styles.photoWrapper}>
                <Image
                  source={{
                    uri: `http://192.168.1.12:8000/storage/${item.image}`,
                  }}
                  style={styles.itemPhoto}
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text style={styles.doctorText}>
                  Dr. {item.firstname} {item.lastname}
                </Text>
                <Text style={styles.doctorSubText}>
                  {item.category.name} ${item.price}
                </Text>
                <Text style={styles.doctorSubText}>{item.address.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  props.navigation.navigate("doctor-details", { item: item })
                }
              >
                <Text style={styles.buttonText}>Appointment</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DoctorsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f8ff",
    height: "100%",
    width: "100%",
  },
  item: {
    margin: 5,
    paddingTop: 60,
    width: 170,
  },
  itemInside: {
    // borderColor: "#00c8d7",
    // borderWidth: 2,
    backgroundColor: "white",
    // shadowColor: "#192a56",
    shadowColor: "#192a56",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  photoWrapper: {
    marginTop: -60,
  },
  itemPhoto: {
    width: 80,
    height: 100,
    // borderRadius: 80 / 2,
    margin: 10,
    // borderColor: "#00c8d7",
    // borderWidth: 2,
    // marginTop: -20,
  },

  doctorText: {
    color: "#192a56",
    fontSize: 15,
    fontFamily: "BalsamiqSans_700Bold",
    // marginBottom: 5,
  },
  doctorSubText: {
    // color: "#e1b12c",
    color: "#465477",
    fontFamily: "BalsamiqSans_400Regular",
  },
  button: {
    // backgroundColor: "#e1b12c",
    backgroundColor: "#00c8d7",

    paddingTop: 5,
    paddingBottom: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 15,
    alignItems: "center",
    shadowColor: "#00c8d7",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 0.1,
    elevation: 5,
  },
  buttonText: {
    fontSize: 15,
    color: "#192a56",
    fontFamily: "BalsamiqSans_700Bold",
  },
});
