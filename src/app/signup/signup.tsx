import React, { useState } from "react";
import colors from "@/src/constants/colors";
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import api from "@/src/services/api";
import fonts from "@/src/constants/fonts";

export default function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSignUp() {
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await api.post("/auth/register", {
                name: name,
                login: email,
                password: password,
                role: "USER"
            });

            router.push("/");
        } catch (error) {
            setErrorMessage("Erro ao cadastrar. Verifique os dados e tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={styles.container}>
                    <View style={styles.header}>

                        <Pressable
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color={colors.white} />
                        </Pressable>

                        <Text style={styles.logoText}>
                            Retro <Text style={{ color: colors["brown-white"] }}>Photo</Text>
                        </Text>
                        <Text style={styles.slogan}>
                            Criar uma conta
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.label}>Nome completo</Text>
                            <TextInput
                                placeholder="Nome completo"
                                placeholderTextColor={colors.gray}
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                placeholder="Digite seu email"
                                placeholderTextColor={colors.gray}
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                placeholder="Digite sua senha"
                                placeholderTextColor={colors.gray}
                                style={styles.input}
                                value={password}
                                secureTextEntry={true}
                                onChangeText={setPassword}
                            />
                        </View>

                        {errorMessage ? (
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        ) : null}

                        <Pressable style={styles.button} onPress={handleSignUp} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color={colors.white} />
                            ) : (
                                <Text style={styles.buttonText}>Cadastrar</Text>
                            )}
                        </Pressable>

                        <View style={styles.imageView}>
                        </View>

                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: colors["brown-red"]
    },
    header: {
        paddingLeft: 14,
        paddingRight: 14,
    },
    logoText: {
        fontFamily: fonts.font,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8
    },
    slogan: {
        fontFamily: fonts.font,
        fontSize: 30,
        color: colors.white,
        marginBottom: 20
    },
    form: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 24,
        paddingLeft: 14,
        paddingRight: 14
    },
    label: {
        fontFamily: fonts.font,
        color: colors.zinc,
        marginBottom: 4
    },
    input: {
        fontFamily: fonts.font,
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderColor: colors.gray,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14
    },
    button: {
        backgroundColor: colors["brown-red"],
        paddingTop: 14,
        paddingBottom: 14,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 8
    },
    buttonText: {
        fontFamily: fonts.font,
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold'
    },
    backButton: {
        backgroundColor: colors["brown-red-dark"],
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 8,
        marginBottom: 20
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        textAlign: "center"
    },
    imageView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: "100%",
        height: "100%",
        maxWidth: 400,
        maxHeight: 400,
        aspectRatio: 1,
        resizeMode: "contain",
    }
});