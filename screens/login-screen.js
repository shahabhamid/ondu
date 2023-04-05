import {
  View,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/colors";
import * as React from "react";
import PrimaryButton from "../components/Primary-Button";
import LinearGradientComponent from "../components/Linear-Gradient-component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apis from "../constants/static-ip";
import { Image } from "react-native";
const { width, height } = Dimensions.get("window");
const size = Math.min(width, height) - 1;
export default function LoginScreen({ navigation }) {
  const [toggle, setToggle] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [userName, setuserName] = React.useState("");
  const [email, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errormsg, setErrormsg] = React.useState(null);
  const Sendtobackend = () => {
    if (userName == "" || password == "") {
      alert("Please enter userName and password");
    } else {
      setLoading(true);
      fetch(apis + "signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.error) {
            Alert.alert(data.error);
          } else if (data.message == "Successfully Signed In") {
            await AsyncStorage.setItem("user", JSON.stringify(data));
            navigation.navigate("HomePage", { data });
          }
        })
        .catch((err) => {
          Alert.alert(err);
        });
    }
    // navigation.navigate('MainPage')
  };
  function changeToggle(toggle) {
    setToggle(toggle);
  }
  function onScreenChange() {
    navigation.navigate("HomePage");
  }

  return (
    <LinearGradientComponent>
      <View style={styles.rootScreen}>
        <Image
          style={{ height: "10%", width: "60%" }}
          source={require("../assets/OndoPrimary1.png")}
        />
        <View style={styles.textInputField}>
          <Text style={styles.text}>Play</Text>
          <Text style={styles.textLife}>Your Life</Text>
        </View>
        {errormsg ? <Text style={styles.errormessage}>{errormsg}</Text> : null}
        <TextInput
          onSubmitEditing={() => {
            Sendtobackend();
          }}
          style={styles.input}
          onPressIn={() => setErrormsg(null)}
          onChangeText={(text) => setuserName(text)}
          placeholder="Username"
          autoCorrect={false}
        />

        <TextInput
          onSubmitEditing={() => {
            Sendtobackend();
          }}
          style={styles.input}
          onPressIn={() => setErrormsg(null)}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry={true}
          autoComplete="password"
        />
        <PrimaryButton
          onPress={() => {
            Sendtobackend();
          }}
        >
          Log In
        </PrimaryButton>
        <Pressable
          onPress={() => {
            navigation.navigate("ForgotPassword", { disabledAnimation: true });
          }}
        >
          <Text style={styles.forgotText}>{"Forgot Password?"}</Text>
        </Pressable>
        <Pressable onPress={() => {}}>
          <Text style={(styles.accountText, { marginTop: 50 })}>
            {"Don't have an account?"}
          </Text>
        </Pressable>
        <View style={styles.buttonOuterContainer}>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.buttonInnerContainer, styles.pressed]
                : styles.buttonInnerContainer
            }
            onPress={() => {
              navigation.navigate("Register", { disabledAnimation: true });
            }}
            android_ripple={{ color: Colors.highLightPurple }}
          >
            <Text style={styles.buttonText}>Create</Text>
          </Pressable>
        </View>
        {/* <Text>{JSON.stringify({ name, userName, email, password })}</Text> */}
      </View>
    </LinearGradientComponent>
  );
}

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