import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const DoctorScheduleScreen = (props) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breakEndTime, setBreakEndTime] = useState("");
  const [breakStartTime, setBreakStartTime] = useState("");
  const [interval, setInterval] = useState("");
  const [doctorID, setdoctorID] = useState(props.route.params.id);
  const [day, setDay] = useState("");

  const [weekdays, setWeekdays] = useState([]);
  const [weekdaysInWords, setWeekdaysInWords] = useState({
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday",
  });

  useEffect(() => {
    const response = async () => {
      return await axios
        .get(
          `http://192.168.1.12:8000/api/weekdays-not-in-schedule?doctor_id=${doctorID}`
        )
        .then((response) => {
          setWeekdays(response.data.weekdays);
          console.log(weekdays);
        });
    };
    response();
  }, []);

  const weekdaysList = weekdays.map((weekday) => {
    return (
      <Picker.Item
        label={weekdaysInWords[weekday.id]}
        value={weekday.id}
        key={weekday.id}
      />
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("start_time", startTime);
    body.append("end_time", endTime);
    body.append("break_start_time", breakStartTime);
    body.append("break_end_time", breakEndTime);
    body.append("interval", interval);
    body.append("doctor_id", doctorId);
    body.append("weekday_id", day);
    console.log(body);
    try {
      await axios
        .post(`http://192.168.1.12:8000/api/schedule`, body, {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        })
        .then((response) => {
          props.setReRender(!props.render);
          alert("successfully added !!");
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
              <Text style={styles.labelText}>Start Time</Text>
            </View>
            <View>
              <TextInput
                value={startTime}
                keyboardType="numeric"
                onChangeText={(startTime) => setStartTime(startTime)}
                placeholderTextColor="#a6a6a6"
                placeholder="format: HH:MM 10:00"
                style={styles.input}
              />
            </View>
            <View style={styles.underInput}>
              <Text style={styles.underInputText}>*Required</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>End Time</Text>
            </View>
            <View>
              <TextInput
                value={endTime}
                keyboardType="numeric"
                onChangeText={(endTime) => setEndTime(endTime)}
                placeholderTextColor="#a6a6a6"
                placeholder="format: HH:MM 10:00"
                style={styles.input}
              />
            </View>
            <View style={styles.underInput}>
              <Text style={styles.underInputText}>*Required</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Break Start Time</Text>
            </View>
            <View>
              <TextInput
                value={breakStartTime}
                keyboardType="numeric"
                onChangeText={(breakStartTime) =>
                  setBreakStartTime(breakStartTime)
                }
                placeholderTextColor="#a6a6a6"
                placeholder="format: HH:MM 10:00"
                style={styles.input}
              />
            </View>
            <View style={styles.underInput}>
              <Text style={styles.underInputText}></Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Break End Time</Text>
            </View>
            <View>
              <TextInput
                value={breakEndTime}
                keyboardType="numeric"
                onChangeText={(breakEndTime) => setBreakEndTime(breakEndTime)}
                placeholderTextColor="#a6a6a6"
                placeholder="format: HH:MM 10:00"
                style={styles.input}
              />
            </View>
            <View style={styles.underInput}>
              <Text style={styles.underInputText}></Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Appointment Time</Text>
            </View>
            <View>
              <TextInput
                value={interval}
                keyboardType="numeric"
                onChangeText={(interval) => setInterval(interval)}
                placeholderTextColor="#a6a6a6"
                placeholder="20"
                style={styles.input}
              />
            </View>
            <View style={styles.underInput}>
              <Text style={styles.underInputText}>*Required : in minutes</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>Choose a day</Text>
            </View>
            <View>
              <Picker
                mode="dropdown"
                selectedValue={day}
                onValueChange={(itemValue, itemIndex) => setDay(itemValue)}
              >
                {weekdaysList}
              </Picker>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}> Create </Text>
              {/* <Icon name="login" color="white" size={18} /> */}
            </TouchableOpacity>
            <View style={styles.underInput}>
              <Text style={styles.underInputText}>*Required</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorScheduleScreen;

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
  input: {
    height: 40,
    width: 280,
    fontSize: 15,
    padding: 10,
    paddingLeft: 0,
    marginBottom: 0,
    borderBottomWidth: 2,
    borderColor: "rgb(0,200,215)",
    color: "#192a56",
    fontFamily: "BalsamiqSans_400Regular",
  },
  inputContainer: {
    margin: 10,
  },
  underInputText: {
    fontFamily: "BalsamiqSans_400Regular",
    color: "#821636",
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
});
