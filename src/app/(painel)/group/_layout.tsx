import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          height: insets.bottom + 60,
        }
      }}
    >
      <Tabs.Screen
        name="camera/index"
        options={{
          tabBarIcon: () => (
            <Ionicons name="aperture-outline" size={60} color="#A93F2A" />
          ),
          tabBarIconStyle: {
            height: 60,
            width: 60
          }
        }}
      />

      <Tabs.Screen
        name="participants/index"
        options={{href: null}}
      />
      <Tabs.Screen
        name="add-participant/index"
        options={{href: null}}
      />
      <Tabs.Screen name="[id]" options={{ href: null }} />
      <Tabs.Screen
        name="[id]/add-album"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="album/[id]"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
    </Tabs>
  );
}
