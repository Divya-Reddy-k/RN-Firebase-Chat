import React, {useContext} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import RoomScreen from '../screens/RoomScreen';
import {AuthContext} from './AuthProvider';
import CommonColors from '../utils/CommonColors';
import UserStyles from '../utils/UserStyles';
import UserRoutes from '../utils/UserRoutes';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

/**
 * All chat app related screens
 */

function ChatApp() {
  const {logout} = useContext(AuthContext);

  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: CommonColors.BLUE,
        },
        headerBackTitleVisible: false,
        headerTintColor: CommonColors.WHITE,
      }}
      initialRouteName={UserRoutes.HOME}>
      <ChatAppStack.Screen
        name={UserRoutes.HOME}
        component={HomeScreen}
        options={({navigation}) => ({
          title: 'Chat Groups',
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate(UserRoutes.ADD_ROOMS)}>
                <Image
                  style={UserStyles.icon_view}
                  resizeMode="contain"
                  source={require('../../assets/add.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()}>
                <Image
                  style={UserStyles.icon_view}
                  resizeMode="contain"
                  source={require('../../assets/logout.png')}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <ChatAppStack.Screen
        name={UserRoutes.CONVERSATIONS}
        component={RoomScreen}
        options={({route}) => ({
          title: route.params.thread.name,
        })}
      />
    </ChatAppStack.Navigator>
  );
}

export default function HomeStack() {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name={UserRoutes.CHAT_SCREEN} component={ChatApp} />
      <ModalStack.Screen
        name={UserRoutes.ADD_ROOMS}
        component={AddRoomScreen}
      />
    </ModalStack.Navigator>
  );
}
