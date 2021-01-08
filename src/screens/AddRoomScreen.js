import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import UserStyles from "../utils/UserStyles";
import CommonColors from "../utils/CommonColors";
import UserRoutes from "../utils/UserRoutes";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

export default function AddRoomScreen({ navigation }) {
  const [roomName, setRoomName] = useState("");

  /**
   * Create a new Firestore collection to save threads
   */
  function handleButtonPress() {
    if (roomName.length > 0) {
      firestore()
        .collection("THREADS")
        .add({
          name: roomName,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
          },
        })
        .then((docRef) => {
          docRef.collection("MESSAGES").add({
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
            system: true,
          });
        });
      navigation.navigate(UserRoutes.CHAT_SCREEN);
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.close_button}
        >
          <Image
            style={styles.close_image}
            resizeMode="contain"
            source={require("../../assets/close.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <Text
          style={[
            UserStyles.sixteen_white_bold,
            { fontSize: 24, lineHeight: 48, color: CommonColors.BLUE },
          ]}
        >
          Create A New Chat Room
        </Text>

        <CustomInput
          userInput={roomName}
          onInputChanged={(val) => setRoomName(val)}
          hint="Room Name"
          keyboardType="default"
          icon={null}
        />

        <View style={{ width: 120, alignSelf: "flex-end" }}>
          <CustomButton
            title="CREATE"
            backgroundColor={CommonColors.GREEN}
            onSubmit={() => handleButtonPress()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
  },
  closeButtonContainer: {
    position: "absolute",
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  create_button: {
    padding: 16,
    width: 120,
    marginVertical: 32,
    alignSelf: "flex-end",
    backgroundColor: CommonColors.GREEN,
    borderRadius: 32,
  },
  close_button: {
    backgroundColor: CommonColors.RED,
    marginRight: 16,
    padding: 16,
    borderRadius: 36,
  },
  close_image: {
    width: 18,
    height: 18,
    tintColor: CommonColors.WHITE,
  },
});
