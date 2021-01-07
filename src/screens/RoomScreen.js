import React, {useState, useContext, useEffect} from 'react';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import {
  ActivityIndicator,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import CommonColors from '../utils/CommonColors';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import storage from '@react-native-firebase/storage';

export default function RoomScreen({route}) {
  const [messages, setMessages] = useState([]);
  const {thread} = route.params;
  const {user} = useContext(AuthContext);
  const currentUser = user.toJSON();

  async function handleSend(messages) {
    const text = messages[0].text;

    firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
        },
      });

    await firestore()
      .collection('THREADS')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        {merge: true},
      );
  }

  useEffect(() => {
    const messagesListener = firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: '',
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

  function _pickImages() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      resizeImage(image.path);
    });
  }

  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  function _uploadImageToFireStore(path) {
    storage()
      .ref(path)
      .getDownloadURL()
      .then((url) => {
        firestore()
          .collection('THREADS')
          .doc(thread._id)
          .collection('MESSAGES')
          .add({
            image: url,
            createdAt: new Date().getTime(),
            user: {
              _id: currentUser.uid,
              email: currentUser.email,
            },
          });
      });
  }

  function resizeImage(imageUri) {
    ImageResizer.createResizedImage(imageUri, 400, 400, 'JPEG', 75, 0, null)
      .then((response) => {
        let uri = response.uri;
        let randString = randomString(
          32,
          '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        );
        let imageName = randString + currentUser.uid;
        let uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        storage()
          .ref(imageName)
          .putFile(uploadUri)
          .then((snapshot) => {
            _uploadImageToFireStore(imageName);
          });
      })
      .catch((err) => {
        console.log('image resizing error => ', err);
      });
  }

  function renderBubble(props) {
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
            color: '#fff',
          },
        }}
      />
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  function renderSend(props) {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => _pickImages()}
          style={styles.button_view}>
          {/* <IconButton icon='send-circle' size={32} color='#6646ee' /> */}
          <Image
            style={styles.send_image}
            resizeMode="contain"
            source={require('../../assets/attachment.png')}
          />
        </TouchableOpacity>

        <Send {...props}>
          <View style={styles.button_view}>
            {/* <IconButton icon='send-circle' size={32} color='#6646ee' /> */}
            <Image
              style={styles.send_image}
              resizeMode="contain"
              source={require('../../assets/right-arrow.png')}
            />
          </View>
        </Send>
      </View>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <Image
          style={styles.down_arrow}
          resizeMode="contain"
          source={require('../../assets/right-arrow.png')}
        />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{_id: currentUser.uid}}
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  down_arrow: {
    width: 18,
    height: 18,
    transform: [{rotate: '90deg'}],
    alignSelf: 'center',
    tintColor: CommonColors.BLUE,
  },
  send_image: {
    width: 18,
    height: 18,
    alignSelf: 'center',
    tintColor: 'white',
  },
  button_view: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    marginBottom: 6,
    justifyContent: 'center',
    backgroundColor: CommonColors.BLUE,
  },
});
