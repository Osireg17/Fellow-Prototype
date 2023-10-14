import { Ionicons } from "@expo/vector-icons";
import classNames from "classnames";
import * as AppleAuthentication from "expo-apple-authentication";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "react-native-ui-lib";

import { auth } from "../../config/firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateFields = () => {
    let isValid = true;

    if (email === "") {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (password === "") {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    return isValid;
  };

  const loginWithApple = async () => {
    try {
      const AppleCredentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const { identityToken } = AppleCredentials;
    } catch (err: any) {
      if (err.code === "ERR_CANCELED") {
        alert("You must sign in with Apple to continue");
      } else {
        alert(err);
      }
    }
  };

  const onHandleLogin = () => {
    if (validateFields()) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Login Success");
          navigation.navigate("Feeds");
          navigation.reset({
            index: 0,
            routes: [{ name: "Feeds" }],
          });
        })
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white justify-center px-4"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <View className="flex-1 flex-col bg-white justify-center px-8">
        <TouchableOpacity
          className="absolute top-20 left-4"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex flex-col gap-8 items-center">
          <Text className="text-2xl font-bold">Login</Text>
          <TextInput
            className={classNames(
              "w-full px-3 py-2 rounded border-[#ccc] border",
              {
                "border-red-500": emailError,
              }
            )}
            placeholder="Email Address"
            placeholderTextColor="#B0B0B0"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          {emailError && (
            <Text className="text-red-500 text-sm self-start">
              Please enter your email.
            </Text>
          )}
          <TextInput
            className={classNames(
              "w-full px-3 py-2 rounded border-[#ccc] border",
              {
                "border-red-500": passwordError,
              }
            )}
            placeholder="Password"
            placeholderTextColor="#B0B0B0"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          {passwordError && (
            <Text className="text-red-500 text-sm self-start">
              Please enter your password.
            </Text>
          )}
          <TouchableOpacity
            className="items-center"
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
          <Button
            className="bg-[#282C35] w-full rounded-md px-4 py-2 text-center"
            label="Login"
            onPress={onHandleLogin}
          />
        </View>
        <TouchableOpacity
          className="pt-6 items-center"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text className="text-blue-500 text-md underline">
            Register an account
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
