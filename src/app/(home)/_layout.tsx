import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Octicons,
  FontAwesome,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      className="flex flex-col min-h-screen"
      style={{ marginTop: insets.top }}
    >
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarActiveTintColor: "red",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            // headerShown: true,
            // header: (props) => <Header name={props.route.name} />,
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <Octicons name="home" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="questions"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="comment-question-outline"
                size={20}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="bible"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="bible" size={20} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="bell-o" size={20} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-outline" size={26} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
