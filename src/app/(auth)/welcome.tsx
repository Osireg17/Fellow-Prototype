import { Link } from "expo-router";
import React from "react";
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button } from "react-native-ui-lib";

const bgImage = require("../../../assets/images/LandingScreen.jpg");

export default function Page() {
  return (
    <SafeAreaView>
      <ImageBackground source={bgImage} className="flex-1 justify-center">
        <View className="flex gap-8 px-6">
          <Text className="font-extrabold text-center text-3xl">
            Welcome to Fellow
          </Text>
          <View className="flex gap-4">
            <Link href="/sign-in">
              <Button
                className="bg-[#282C35] rounded-md px-4 py-2 text-center"
                label="Login"
              />
            </Link>
            <Link href="/sign-up">
              <Button
                className="bg-[#282C35] rounded-md px-4 py-2 text-center"
                label="Sign Up"
              />
            </Link>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
