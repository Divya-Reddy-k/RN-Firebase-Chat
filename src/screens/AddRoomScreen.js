import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import UserStyles from '../utils/UserStyles';
import CommonColors from '../utils/CommonColors';
import UserRoutes from '../utils/UserRoutes';

export default function AddRoomScreen({navigation}) {
  const [roomName, setRoomName] = useState('');

  /**
   * Create a new Firestore collection to save threads
   */
  function handleButtonPress() {
    if (roomName.length > 0) {
      firestore()
        .collection('THREADS')
        .add({
          name: roomName,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
          },
        })
        .then((docRef) => {
          docRef.collection('MESSAGES').add({
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
          style={styles.close_button}>
          <Image
            style={styles.close_image}
            resizeMode="contain"
            source={require('../../assets/close.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <Text
          style={[
            UserStyles.sixteen_white_bold,
            {fontSize: 24, lineHeight: 48, color: CommonColors.BLUE},
          ]}>
          Create A New Chat Room
        </Text>
        <View
          style={[
            Platform.OS === 'ios'
              ? UserStyles.shadow
              : UserStyles.android_shadow,
            UserStyles.elevated_layout,
          ]}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            style={[UserStyles.sixteen_regular, UserStyles.text_input]}
            placeholder="Room Name"
            value={roomName}
            onChangeText={(text) => setRoomName(text)}
            onSubmitEditing={() => handleButtonPress()}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleButtonPress()}
          style={styles.create_button}>
          <Text
            style={[
              UserStyles.fourteen_semi_bold,
              {color: CommonColors.WHITE, textAlign: 'center'},
            ]}>
            CREATE
          </Text>
        </TouchableOpacity>
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
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  create_button: {
    padding: 16,
    width: 120,
    marginVertical: 32,
    alignSelf: 'flex-end',
    backgroundColor: CommonColors.GREEN,
    borderRadius: 32,
  },
  close_button: {
    backgroundColor: 'red',
    marginRight: 16,
    padding: 16,
    borderRadius: 36,
  },
  close_image: {
    width: 18,
    height: 18,
    tintColor: 'white',
  },
});
