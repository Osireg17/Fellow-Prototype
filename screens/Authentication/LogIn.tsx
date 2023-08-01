import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword, OAuthProvider, signInWithCredential,  } from "firebase/auth";
import { auth } from "../../config/firebase";
import * as AppleAuthentication from 'expo-apple-authentication';
import { styles } from "../../styles/Authentication/LogIn.style";

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
      if (err.code === 'ERR_CANCELED') {
        alert('You must sign in with Apple to continue');
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
            })
          })
          .catch((err) => Alert.alert("Login error", err.message));
      }
    };
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.backArrowContainer}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.loginWrapper}>
              <Text style={styles.loginTitle}>Login</Text>
              <TextInput
                style={[styles.input, emailError ? styles.errorInput : null]}
                placeholder="Email Address"
                placeholderTextColor="#B0B0B0"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              {emailError && <Text style={styles.errorText}>Please enter your email.</Text>}
              <TextInput
                style={[styles.input, passwordError ? styles.errorInput : null]}
                placeholder="Password"
                placeholderTextColor="#B0B0B0"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              {passwordError && <Text style={styles.errorText}>Please enter your password.</Text>}
              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginButton} onPress={onHandleLogin}>
                <Text style={styles.loginButtonText}>Log In</Text>
              </TouchableOpacity>
              {/* <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                style={styles.appleButton}
                onPress={loginWithApple}
              /> */}
            </View>
            <TouchableOpacity
              style={styles.registerTextContainer}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.registerText}>Register an account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
