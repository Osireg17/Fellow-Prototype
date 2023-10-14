import React from "react";
import { ImageBackground } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";

// import bgImage from "../../assets/images/LandingScreen.jpg";
import styles from "../styles/Welcome_Screen.style";
// import { Button, Text } from 'react-native-paper';

const bgImage = require("../../assets/images/LandingScreen.jpg");

export default function Welcome_Screen({ navigation }) {
  return (
    <ImageBackground source={bgImage} style={styles.imageBackground}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome to Fellow</Text>
        <Button
          style={styles.button}
          label="Login"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          style={styles.button}
          label="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </ImageBackground>
  );
}
