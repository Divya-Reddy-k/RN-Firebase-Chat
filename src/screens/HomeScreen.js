import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import UserStyles from '../utils/UserStyles';
import CommonColors from '../utils/CommonColors';
import UserRoutes from '../utils/UserRoutes';

export default function HomeScreen({navigation}) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        if (querySnapshot != null) {
          const threads = querySnapshot.docs.map((documentSnapshot) => {
            return {
              _id: documentSnapshot.id,
              // give defaults
              name: '',

              latestMessage: {
                text: '',
              },
              ...documentSnapshot.data(),
            };
          });
          setThreads(threads);
        }

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const _renderRoomDetails = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.padding_sixteen}
          onPress={() =>
            navigation.navigate(UserRoutes.CONVERSATIONS, {thread: item})
          }>
          <Text style={[UserStyles.sixteen_white_bold, styles.header]}>
            {item.name}
          </Text>
          <Text style={[UserStyles.fourteen_regular, styles.description]}>
            {item.latestMessage.text}
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        renderItem={_renderRoomDetails}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  padding_sixteen: {padding: 16},
  header: {fontSize: 16, color: CommonColors.BLUE},
  description: {color: CommonColors.BLACK},
  line: {height: 1, backgroundColor: 'gray'},
});
