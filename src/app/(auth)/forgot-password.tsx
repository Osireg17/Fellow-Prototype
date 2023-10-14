import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { Header as HeaderRNE } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../../styles/Authentication/ForgotPassword.style";

import { useAuth } from "@/context/auth";

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
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
      <FontAwesome name="arrow-left" size={24} color="#000" />
    </TouchableOpacity>
  );
}

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const { resetPassword } = useAuth();

  const sendEmail = () => {
    if (!email) {
      return;
    }
    resetPassword(email);
  };

  return (
    <SafeAreaView>
      <Header />
      <BackArrow />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/Main-Logo.png")}
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
    </SafeAreaView>
  );
}
