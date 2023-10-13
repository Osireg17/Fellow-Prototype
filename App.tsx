import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./navigations/Navigator";

import "react-native-gesture-handler";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <RootNavigator />
        <StatusBar />
      </MenuProvider>
    </SafeAreaProvider>
  );
}
