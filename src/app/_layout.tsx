import React from "react";
import { Stack } from "expo-router";
import '../../global.css';

export default function MainLayout(){
    return (
       <>
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="signup"
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