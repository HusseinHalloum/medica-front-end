import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import Constants from "expo-constants";
import SearchComponent from "../components/Search";
import axios from "axios";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const CategoriesScreen = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState(props.route.params.categories);
  const [data, setData] = useState(props.route.params.categories);

  const ListItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          props.navigation.navigate("single-category", { id: item.id })
        }
      >
        <View style={styles.wrapperImage}>
          <Image
            source={{
              uri: `http://192.168.1.12:8000/storage/${item.image}`,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const searchFilterFunction = (text) => {
    setSearchValue(text);
    const formattedQuery = text.toLowerCase();
    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().includes(formattedQuery);
    });
    setCategories(filteredData);
  };
  return (
    <View style={styles.container}>
      <SearchComponent
        change={searchValue}
        searchInput={(e) => {
          searchFilterFunction(e);
        }}
        placeholder="Search Category ... "
      />
      <View style={styles.listWrapper}>
        {/* <FlatList
          horizontal={false}
          // numColumns={2}
          scrollEnabled
          data={categories}
          keyExtractor={(item, index) => {
            item.id.toString();
          }}
          renderItem={({ item }) => <ListItem item={item} />}
          // showsHorizontalScrollIndicator={false}
        /> */}
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            // justifyContent: "space-around",
          }}
          style={styles.container}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={index % 2 === 0 ? styles.item : styles.item1}
              onPress={() => {
                props.navigation.navigate("single-category", {
                  id: item.id,
                });
              }}
              key={item.id}
            >
              <View style={styles.wrapperImage}>
                <Image
                  source={{
                    uri: `http://192.168.1.12:8000/storage/${item.image}`,
                  }}
                  style={styles.itemPhoto}
                  resizeMode="cover"
                />
              </View>

              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemDoctorNumber}>20 specialists</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f8ff",
    height: "100%",
    width: "100%",
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
    width: 160,
    // borderColor: "#00c8d7",
    // borderWidth: 2,
    backgroundColor: "#00c8d7",

    shadowColor: "#192a56",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 15,
    borderRadius: 10,
  },
  item1: {
    // margin: 10,
    marginTop: 40,
    marginBottom: 10,
    width: 160,
    // borderColor: "#00c8d7",
    // borderWidth: 2,
    backgroundColor: "#00c8d7",

    shadowColor: "#192a56",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 15,
    borderRadius: 10,
  },
  wrapperImage: {
    // backgroundColor: "rgba(0,200,215,0.8)",
    backgroundColor: "#192a56",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    shadowColor: "#192a56",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
    padding: 30,
    margin: 10,
  },
  itemPhoto: {
    width: 30,
    height: 30,
  },
  listWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
  },
  itemText: {
    color: "white",
    marginTop: 5,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "BalsamiqSans_700Bold",
    textAlign: "left",
    paddingLeft: 10,
  },
  itemDoctorNumber: {
    // color: "#465477",

    color: "#192a56",
    textAlign: "left",
    paddingLeft: 10,
    fontFamily: "BalsamiqSans_400Regular",
    paddingBottom: 20,
  },
});
