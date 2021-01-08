import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import UserStyles from "../utils/UserStyles";
import CommonColors from "../utils/CommonColors";
import UserRoutes from "../utils/UserRoutes";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationError] = useState("");
  const passwordRef = useRef();
  const { login, getApiErrors } = useContext(AuthContext);

  const _displayValidationErrors = (msg) => {
    setValidationError(`** ${msg}`);
    setTimeout(() => {
      setValidationError("");
    }, 2000);
  };

  const _validateUser = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      _displayValidationErrors("Invalid Email Address");
    } else if (password.trim().length === 0) {
      _displayValidationErrors("6 digit password is required");
    } else {
      login(email, password);
      getApiErrors().then((res) => {
        if (res != "") _displayValidationErrors(res);
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 24,
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="white" />

      <CustomInput
        userInput={email}
        onInputChanged={(val) => setEmail(val)}
        hint="Email Address"
        keyboardType="email-address"
        icon={require("../../assets/login_user.png")}
      />

      <CustomInput
        userInput={password}
        isPassword={true}
        onInputChanged={(val) => setPassword(val)}
        hint="Password"
        keyboardType="default"
        icon={require("../../assets/password.png")}
      />

      {validationErrors.length ? (
        <Text
          style={[
            UserStyles.fourteen_bold,
            { color: CommonColors.RED, margin: 16 },
          ]}
        >
          {validationErrors}
        </Text>
      ) : null}

      <CustomButton
        title="LOGIN"
        backgroundColor={CommonColors.GREEN}
        onSubmit={() => _validateUser()}
      />

      <CustomButton
        buttonType="text"
        title="New User? Register Here"
        onSubmit={() => navigation.navigate(UserRoutes.REGISTRATION)}
      />
    </View>
  );
}
