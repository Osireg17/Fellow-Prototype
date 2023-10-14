import React from "react";
import { ImageBackground } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";

const bgImage = require("../../assets/images/LandingScreen.jpg");

export default function Welcome({ navigation }) {
  return (
    <ImageBackground source={bgImage} className="flex-1 justify-center">
      <View className="flex gap-8 px-6">
        <Text className="font-extrabold text-center text-3xl">
          Welcome to Fellow
        </Text>
        <View className="flex gap-4">
          <Button
            className="bg-[#282C35] rounded-md px-4 py-2 text-center"
            label="Login"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            className="bg-[#282C35] rounded-md px-4 py-2 text-center"
            label="Sign Up"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
