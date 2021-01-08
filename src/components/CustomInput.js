import React from "react";
import { View, Image, TextInput, Platform } from "react-native";
import UserStyles from "../utils/UserStyles";
import CommonColors from "../utils/CommonColors";

export default function CustomInput(props) {
  return (
    <View
      style={[
        Platform.OS === "ios" ? UserStyles.shadow : UserStyles.android_shadow,
        UserStyles.elevated_layout,
      ]}
    >
      <TextInput
        placeholder={props.hint}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={props.keyboardType}
        returnKeyType="next"
        style={[UserStyles.sixteen_regular, UserStyles.text_input]}
        secureTextEntry={props.isPassword}
        value={props.userInput}
        onChangeText={(text) => props.onInputChanged(text)}
      />

      <Image
        style={UserStyles.image}
        resizeMode="contain"
        source={props.icon}
      />
    </View>
  );
}
