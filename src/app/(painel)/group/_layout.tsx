import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          height: 70
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
            height: '100%',
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
        name="add-album/index"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="album/[id]"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
    </Tabs>
  );
}
