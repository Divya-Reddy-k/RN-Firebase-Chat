import React from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Bubble, SystemMessage } from "react-native-gifted-chat";
import CommonColors from "../utils/CommonColors";
import MessageStyles from "./MessageStyles";

export const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: CommonColors.BLUE,
        },
      }}
      textStyle={{
        right: {
          color: CommonColors.WHITE,
        },
      }}
    />
  );
};

export const renderSystemMessage = (props) => {
  return (
    <SystemMessage
      {...props}
      wrapperStyle={MessageStyles.systemMessageWrapper}
      textStyle={MessageStyles.systemMessageText}
    />
  );
};

export const scrollToBottomComponent = () => {
  return (
    <View style={MessageStyles.bottomComponentContainer}>
      <Image
        style={MessageStyles.down_arrow}
        resizeMode="contain"
        source={require("../../assets/right-arrow.png")}
      />
    </View>
  );
};

export const renderLoading = () => {
  return (
    <View style={MessageStyles.loadingContainer}>
      <ActivityIndicator size="large" color={CommonColors.BLUE} />
    </View>
  );
};
