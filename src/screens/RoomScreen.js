import React, { useState, useContext, useEffect } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { View, Image, Platform, TouchableOpacity } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import ImagePicker from "react-native-image-crop-picker";
import ImageResizer from "react-native-image-resizer";
import storage from "@react-native-firebase/storage";
import {
  renderBubble,
  renderSystemMessage,
  scrollToBottomComponent,
  renderLoading,
} from "./MessagesContainer";
import MessageStyles from "./MessageStyles";

export default function RoomScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const { thread } = route.params;
  const { user } = useContext(AuthContext);
  const currentUser = user.toJSON();

  const handleSend = async (messages) => {
    const text = messages[0].text;

    firestore()
      .collection("THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
        },
      });

    await firestore()
      .collection("THREADS")
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true }
      );
  };

  useEffect(() => {
    const messagesListener = firestore()
      .collection("THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });
        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

  const _pickImages = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      resizeImage(image.path);
    });
  };

  const randomString = (length, chars) => {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  };

  const _uploadImageToFireStore = (path) => {
    storage()
      .ref(path)
      .getDownloadURL()
      .then((url) => {
        firestore()
          .collection("THREADS")
          .doc(thread._id)
          .collection("MESSAGES")
          .add({
            image: url,
            createdAt: new Date().getTime(),
            user: {
              _id: currentUser.uid,
              email: currentUser.email,
            },
          });
      });
  };

  const resizeImage = (imageUri) => {
    ImageResizer.createResizedImage(imageUri, 400, 400, "JPEG", 75, 0, null)
      .then((response) => {
        let uri = response.uri;
        let randString = randomString(
          32,
          "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        );
        let imageName = randString + currentUser.uid;
        let uploadUri =
          Platform.OS === "ios" ? uri.replace("file://", "") : uri;

        storage()
          .ref(imageName)
          .putFile(uploadUri)
          .then((snapshot) => {
            _uploadImageToFireStore(imageName);
          });
      })
      .catch((err) => {
        console.log("image resizing error => ", err);
      });
  };

  const renderSend = (props) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => _pickImages()}
          style={MessageStyles.button_view}
        >
          <Image
            style={MessageStyles.send_image}
            resizeMode="contain"
            source={require("../../assets/attachment.png")}
          />
        </TouchableOpacity>

        <Send {...props}>
          <View style={MessageStyles.button_view}>
            <Image
              style={MessageStyles.send_image}
              resizeMode="contain"
              source={require("../../assets/right-arrow.png")}
            />
          </View>
        </Send>
      </View>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: currentUser.uid }}
      placeholder="Type your message here..."
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
    />
  );
}
