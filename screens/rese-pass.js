import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import LinearGradientComponent from "../components/Linear-Gradient-component";
import PrimaryButton from "../components/Primary-Button";
import Colors from "../constants/colors";
import apis from "../constants/static-ip";
const { width, height } = Dimensions.get("window");

const ResetPass = ({ navigation, route }) => {
  const [pass, setPass] = useState("");
  const [passwordResetToken, setPasswordResetToken] = useState("");
  const { email } = route.params;
  const handleSubmit = async () => {
    if (pass == "") {
      setErrormsg("All fields are required");
      return;
    } else {
      fetch(apis + "otheruserdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.user.passwordResetToken);
          fetch(apis + "reset-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              passwordResetToken: data.user.passwordResetToken,
              password: pass,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              Alert.alert("Successfully change Pass");
              navigation.navigate("Login");
            });
        });

      // handle the response from the server
    }
  };
  const [errormsg, setErrormsg] = React.useState(null);

  return (
    <LinearGradientComponent>
      <View style={styles.rootScreen}>
        <Image
          style={{ height: "10%", width: "60%" }}
          source={require("../assets/Ondosecondary.png")}
        />
        <View style={styles.textInputField}>
          <Text style={styles.text}>Play</Text>
          <Text style={styles.textLife}>Your Life</Text>
        </View>
        {errormsg ? <Text style={styles.errormessage}>{errormsg}</Text> : null}
        <TextInput
          onSubmitEditing={() => {
            handleSubmit();
          }}
          style={styles.input}
          onPressIn={() => setErrormsg(null)}
          placeholder="Password"
          value={pass}
          onChangeText={(text) => setPass(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <PrimaryButton
          onPress={() => {
            handleSubmit();
          }}
        >
          Submit
        </PrimaryButton>

        {/* <Text>{JSON.stringify({ name, userName, email, password })}</Text> */}
      </View>
    </LinearGradientComponent>
  );
};

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputField: {
    marginTop: 10,

    alignItems: "center",
    justifyContent: "center",
  },
  textLife: {
    fontFamily: "GothicA1-Bold",
    fontSize: 30,
    color: Colors.orange,
    marginBottom: 10,
  },
  text: {
    fontFamily: "GothicA1-Bold",
    fontSize: 30,
    color: Colors.pink,
  },
  input: {
    height: 40,
    width: width * 0.7,
    fontFamily: "GothicA1-Medium",
    margin: 10,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.pink,
  },
  forgotText: {
    fontFamily: "GothicA1-SemiBold",
  },
  accountText: {
    fontFamily: "PathwayGothicOne-Regular",
    marginTop: 50,
  },
  buttonOuterContainer: {
    borderRadius: 28,
    width: width * 0.25,
    marginTop: 8,

    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: Colors.brown,
    textAlign: "center",
    fontFamily: "GothicA1-Regular",
  },
  pressed: {
    opacity: 0.75,
  },
  errormessage: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    backgroundColor: "#F50057",
    padding: 5,
    borderRadius: 10,
  },
});

export default ResetPass;
