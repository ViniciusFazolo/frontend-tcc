import React from "react";
import { Stack } from "expo-router";
import '../../global.css';
import { StatusBar } from "react-native";

export default function MainLayout(){
    return (
       <>
        <StatusBar backgroundColor="white" barStyle="dark-content" />

        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(auth)/signup/signup"
                options={{ headerShown: false }}
            /> 
            <Stack.Screen
                name="(painel)"
                options={{ headerShown: false }}
                />  
        </Stack>
        </>
    )
}