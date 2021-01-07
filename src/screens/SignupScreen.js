import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import UserStyles from '../utils/UserStyles';
import CommonColors from '../utils/CommonColors';

export default function Signup({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationError] = useState('');
  const {register, getApiErrors} = useContext(AuthContext);
  const passwordRef = useRef();

  const _displayValidationErrors = (msg) => {
    setValidationError(`** ${msg}`);
    setTimeout(() => {
      setValidationError('');
    }, 2000);
  };

  const _validateUser = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      _displayValidationErrors('Invalid Email Address');
    } else if (password.trim().length === 0) {
      _displayValidationErrors('6 digit password is required');
    } else {
      register(email, password);
      getApiErrors().then((res) => {
        if (res != '') _displayValidationErrors(res);
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 24,
        justifyContent: 'center',
      }}>
      <StatusBar barStyle="light-content" backgroundColor="white" />

      <View
        style={[
          Platform.OS === 'ios' ? UserStyles.shadow : UserStyles.android_shadow,
          UserStyles.elevated_layout,
        ]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          style={[UserStyles.sixteen_regular, UserStyles.text_input]}
          placeholder="Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={() => passwordRef.current.focus()}
        />

        <Image
          style={UserStyles.image}
          resizeMode="contain"
          source={require('../../assets/login_user.png')}
        />
      </View>

      <View
        style={[
          Platform.OS === 'ios' ? UserStyles.shadow : UserStyles.android_shadow,
          UserStyles.elevated_layout,
        ]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          keyboardType="default"
          returnKeyType="next"
          style={[UserStyles.sixteen_regular, UserStyles.text_input]}
          placeholder="Password"
          value={password}
          ref={passwordRef}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={() => _validateUser()}
        />

        <Image
          style={UserStyles.image}
          resizeMode="contain"
          source={require('../../assets/password.png')}
        />
      </View>

      {validationErrors.length ? (
        <Text style={[UserStyles.fourteen_bold, {color: 'red', margin: 16}]}>
          {validationErrors}
        </Text>
      ) : null}

      <TouchableOpacity
        onPress={() => _validateUser()}
        style={{
          width: '100%',
          padding: 16,
          marginTop: 24,
          borderRadius: 36,
          backgroundColor: CommonColors.BLUE,
        }}>
        <Text
          style={[
            UserStyles.twelve_semi_bold,
            {fontSize: 18, color: CommonColors.WHITE, textAlign: 'center'},
          ]}>
          REGISTER
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text
          style={[
            UserStyles.fourteen_bold,
            {color: 'black', textAlign: 'center', marginTop: 16},
          ]}>
          Already Registered? Login Here
        </Text>
      </TouchableOpacity>
    </View>
  );
}
