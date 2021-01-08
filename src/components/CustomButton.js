import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import UserStyles from "../utils/UserStyles";
import CommonColors from "../utils/CommonColors";

export default function CustomButton(props) {
  return props.buttonType === "text" ? (
    <TouchableOpacity onPress={() => props.onSubmit()}>
      <Text style={[UserStyles.fourteen_bold, styles.text_button]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => props.onSubmit()}
      style={[
        UserStyles.round_button,
        { backgroundColor: props.backgroundColor },
      ]}
    >
      <Text style={[UserStyles.twelve_semi_bold, styles.view_button]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  view_button: { fontSize: 18, color: CommonColors.WHITE, textAlign: "center" },
  text_button: { color: "#9a9a9a", textAlign: "center", marginTop: 16 },
});
