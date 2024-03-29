import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/colors";
import { language } from "../constants/language";
import apis from "../constants/static-ip";
const { width, height } = Dimensions.get("window");

function ChangedBio({ navigation, modalVisible, setModalVisible }) {
  const [selectLan, setSelectLan] = useState(0);
  const [bio, setnewbio] = React.useState("");
  const handleBioChange = () => {
    if (bio === "") {
      alert("Please fill all the fields");
    } else {
      // setLoading(true);
      AsyncStorage.getItem("user").then((data) => {
        console.log(JSON.parse(data).user.email);

        fetch(apis + "setbio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bio: bio,
            email: JSON.parse(data).user.email,
          }),
        })
          .then((res) => res.json())
          .then(async (dat) => {
            if (dat.message == "Bio Updated Successfully") {
              //  setLoading(false);
              Alert.alert("Bio Changed Successfully");
              const parsedUserData = JSON.parse(data);
              console.log(parsedUserData.user.bio);
              parsedUserData.user.bio = bio;
              await AsyncStorage.setItem(
                "user",
                JSON.stringify(parsedUserData)
              );
              setnewbio("");
              navigation.navigate("HomePage");
            } else {
              Alert.alert("Something went Wrong");
              //  setLoading(false);
            }
          });
      });
    }
  };
  useEffect(() => {
    getLang();
  }, []);
  const getLang = async () => {
    setSelectLan(parseInt(await AsyncStorage.getItem("LANG")));
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.fontDesign}>Change Bio </Text>
          <View style={{ width: "100%" }}>
            <TextInput
              style={styles.input}
              // onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setnewbio(text)}
              placeholder="Enter Bio"
              autoCorrect={false}
            />
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              style={{
                width: "40%",
                height: 50,
                borderWidth: 0.5,
                borderRadius: 10,
                backgroundColor: Colors.white,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text>
                {selectLan == 0 ? language[15].eng : language[15].arab}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleBioChange();
                // setModalVisible(false);

                //    alert(selectLan == 0 ? language[12].eng : language[12].arab);
              }}
              style={{
                width: "40%",
                height: 50,
                borderWidth: 0.5,
                borderRadius: 10,
                backgroundColor: Colors.brown,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>
                {selectLan == 0 ? language[16].eng : language[16].arab}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default ChangedBio;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,.5)",
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: width - 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fontDesign: {
    fontFamily: "GothicA1-Medium",
    color: Colors.black,
    fontSize: 18,
  },
  lanItem: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  btns: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
