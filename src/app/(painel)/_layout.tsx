import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function Layout() {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="group/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="form-group" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
