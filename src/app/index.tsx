import colors from "@/src/constants/colors";
import { View, Text, TextInput, Pressable, SafeAreaView, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../context/authContext";
import api from "../services/api";
import { LoginResponse } from "../interfaces/LoginResponse";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login, loadToken, isAuthenticated } = useAuthStore();

    useEffect(() => {
        loadToken();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/(painel)/home");
        }
    }, [isAuthenticated]);

    async function handleSignIn() {
        setLoading(true);
        try {
            const response = await api.post<LoginResponse>("/auth/login", {
                login: email,
                password: password,
            });

            await login(response.data);
            router.replace("/(painel)/home");
        } catch (error) {
            console.error("Erro ao fazer login", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-brown-red">
            <ScrollView className="flex-1 bg-white">
                <View className="pt-5 px-4 bg-[#A93F2A]">
                    <Text className="text-xl font-bold mb-2">
                        Retro <Text className="text-[#FBEBD1]">Photo</Text>
                    </Text>
                    <Text className="text-3xl mb-5 text-white">Recordando momentos</Text>
                </View>

                <View className="flex-1 bg-white rounded-t-2xl pt-6 px-4">
                    <View className="mb-4">
                        <Text className="text-zinc-700 mb-1">Email</Text>
                        <TextInput
                            placeholder="Digite seu email"
                            placeholderTextColor={colors.gray}
                            className="border border-gray rounded-lg px-3 py-4 mb-4"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View className="mb-4">
                        <Text className="text-zinc-700 mb-1">Senha</Text>
                        <TextInput
                            placeholder="Digite sua senha"
                            placeholderTextColor={colors.gray}
                            className="border border-gray rounded-lg px-3 py-4 mb-4"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <Pressable
                        className="bg-[#A93F2A] py-4 rounded-lg items-center justify-center"
                        onPress={handleSignIn}
                    >
                        <Text className="text-white text-base font-bold">
                            {loading ? "Carregando..." : "Acessar"}
                        </Text>
                    </Pressable>

                    <Link href={'/signup/signup'} className="text-center mt-4 text-sm">
                        Ainda não possui uma conta? <Text className="text-[#A93F2A] font-semibold">Cadastre-se</Text>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
