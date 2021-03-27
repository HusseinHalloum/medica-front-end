import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import axios from "axios";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const BookAppointmentScreen = (props) => {
  const [date, setDate] = useState(new Date().getDay());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [time, setTime] = useState(null);
  const [pressedButton, setPressedButton] = useState(null);
  const [bgcolor, setBgcolor] = useState("#192a56");

  useEffect(() => {
    async function fetchData() {
      try {
        await axios
          .get(
            `http://192.168.1.12:8000/api/schedule/${props.route.params.id}/${date}`
          )
          .then((response) => {
            setAvailableTimes(response.data.schedule);
            // setDate(0);
          });
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [date, setDate]);

  const onDateChange = (date) => {
    const today = new Date(date);
    const day = today.getDay();
    setDate(day);
    setPressedButton(null);
  };

  const handleChooseTime = (item, index) => {
    setPressedButton(index);
    setTime(item);
  };
  const handleBook = () => {
    alert("hi");
  };

  const today = new Date();
  const todayforMonth = new Date();
  const month = todayforMonth.setMonth(todayforMonth.getMonth() + 1);
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        style="Dark"
        backgroundColor="#f4f8ff"
        translucent={true}
        barStyle="default"
      />
      <CalendarPicker
        firstDay={1}
        onDateChange={onDateChange}
        selectedDayTextColor={"#f4f8ff"}
        selectedDayStyle={styles.selectedDay}
        nextTitleStyle={styles.timeText}
        previousTitleStyle={styles.timeText}
        textStyle={styles.timeText}
        minDate={today}
        maxDate={month}
        monthTitleStyle={[styles.bookButtonText, { color: "#192a56" }]}
        yearTitleStyle={[styles.bookButtonText, { color: "#192a56" }]}
      />

      <View>
        {availableTimes.length > 0 ? (
          <View>
            <View>
              <Text
                style={[
                  styles.bookButtonText,
                  { color: "#192a56", marginVertical: 10 },
                ]}
              >
                Time
              </Text>
            </View>
            <FlatList
              horizontal
              data={availableTimes[0].available_times}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => {
                return (
                  <TouchableHighlight
                    underlayColor={"#f4f8ff"}
                    activeOpacity={1}
                    style={[
                      styles.time,
                      index === pressedButton
                        ? { backgroundColor: "#192a56" }
                        : { backgroundColor: "#f4f8ff" },
                    ]}
                    onPress={() => handleChooseTime(item, index)}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        index === pressedButton
                          ? { color: "#f4f8ff" }
                          : { color: "#192a56" },
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableHighlight>
                );
              }}
              showsHorizontalScrollIndicator={false}
            />
            <View>
              <TouchableOpacity
                style={styles.bookButton}
                activeOpacity={0.8}
                onPress={handleBook}
              >
                <Text style={styles.bookButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text
            style={[
              styles.bookButtonText,
              { color: "#192a56", marginVertical: 20 },
            ]}
          >
            No Available Times
          </Text>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f8ff",
    paddingTop: 10,
  },
  bookButton: {
    margin: 10,
    paddingTop: 10,
    paddingBottom: 13,
    backgroundColor: "#192a56",
    borderRadius: 10,
  },
  bookButtonText: {
    color: "#f4f8ff",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "BalsamiqSans_700Bold",
  },
  time: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#192a56",
    width: 60,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#192a56",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  timeText: {
    fontFamily: "BalsamiqSans_400Regular",
    color: "#192a56",
  },
  selectedDay: {
    backgroundColor: "#465477",
    borderRadius: 5,
  },
});

export default BookAppointmentScreen;
