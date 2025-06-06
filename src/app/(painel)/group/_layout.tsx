import React from "react";
import { Tabs } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarIconStyle: {
          width: "100%",
          height: "100%",
        },
      }}
    >
      <Tabs.Screen
        name="add-participant/index"
        options={{
          title: "",
          tabBarIcon: () => <AntDesign name="adduser" size={30} className="text-gray-600" />,
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="camera/index"
        options={{
          title: "",
          tabBarIcon: () => <Feather name="aperture" size={50} className="text-gray-600" />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="participants/index"
        options={{
          title: "",
          tabBarIcon: () => <Feather name="users" size={30} className="text-gray-600" />,
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
        }}
      />

      <Tabs.Screen
        name="[id]"
        options={{ href: null }}
      />
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
