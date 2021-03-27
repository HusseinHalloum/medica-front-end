import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SearchBar, Icon } from "react-native-elements";

const SearchComponent = (props) => {
  return (
    <SearchBar
      placeholder={props.placeholder}
      placeholderTextColor="#192a56"
      platform="default"
      leftIconContainerStyle={{
        paddingLeft: 8,
        width: 30,
      }}
      containerStyle={styles.searchContainer}
      inputStyle={styles.searchInput}
      inputContainerStyle={styles.inputContainerStyle}
      round={true}
      showCancel
      // showLoading
      lightTheme
      // icon={{ type: "material-community", name: "magnify", color: "black" }}
      value={props.change}
      onChangeText={props.searchInput}
    />
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#f4f8ff",
    width: "100%",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    padding: 10,
  },
  searchInput: {
    height: 50,
    color: "black",
    backgroundColor: "#f4f8ff",
  },
  inputContainerStyle: {
    backgroundColor: "#f4f8ff",
    shadowColor: "#192a56",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
});

export default SearchComponent;
