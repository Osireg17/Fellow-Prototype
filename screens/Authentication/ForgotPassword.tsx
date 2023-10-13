import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { Header as HeaderRNE } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { getAuth } from "../../config/firebase";
import styles from "../../styles/Authentication/ForgotPassword.style";

function Header() {
  return (
    <HeaderRNE
      centerComponent={{
        text: "Forgot Password",
        style: { color: "#000", fontSize: 20, fontWeight: "bold" },
      }}
      containerStyle={styles.header}
    />
  );
}

function BackArrow() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backArrow}
      onPress={() => navigation.goBack()}
    >
      <FontAwesome name="arrow-left" size={24} color="#000" />
    </TouchableOpacity>
  );
}

export default function ForgotPassword() {
  const [email, setEmail] = useState(null);

  const sendEmail = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Email sent!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  return (
    <SafeAreaProvider>
      <Header />
      <BackArrow />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../photos/Main-Logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter your email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={sendEmail}>
          <Text style={styles.buttonTitle}>Send Email</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
