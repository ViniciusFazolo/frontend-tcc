import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="group/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="form-group" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
