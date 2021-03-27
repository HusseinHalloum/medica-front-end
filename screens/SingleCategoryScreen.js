import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import Constants from "expo-constants";
import SearchComponent from "../components/Search";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const SingleCategoryScreen = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `http://192.168.1.12:8000/api/doctors-by-category/${props.route.params.id}`
        )
        .then((response) => {
          setDoctors(response.data.doctors);
          setData(response.data.doctors);
        });
    }
    fetchData();
  }, []);

  const ListItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          props.navigation.navigate("doctor-details", { item: item })
        }
      >
        <Image
          source={{
            uri: `http://192.168.1.12:8000/storage/${item.image}`,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text style={styles.itemText}>{item.firstname}</Text>
      </TouchableOpacity>
    );
  };

  const searchFilterFunction = (text) => {
    setSearchValue(text);
    const formattedQuery = text.toLowerCase();
    const filteredData = data.filter((item) => {
      return item.firstname.toLowerCase().includes(formattedQuery);
    });
    setDoctors(filteredData);
  };
  return (
    <View>
      <SearchComponent
        change={searchValue}
        searchInput={(e) => searchFilterFunction(e)}
        placeholder="Search Doctor ..."
      />
      <View style={{ width: "100%" }}>
        <FlatList
          horizontal={false}
          data={doctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ListItem item={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default SingleCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#f4f4f4",
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
    width: "40%",
    borderColor: "#00c8d7",
  },
  itemPhoto: {
    width: "100%",
    height: 100,
  },
  itemText: {
    color: "black",
    marginTop: 5,
    textAlign: "center",
  },
});
