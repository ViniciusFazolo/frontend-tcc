import Stack from "@/src/components/stack";
import api, { API_BASE_URL } from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddParticipant() {
  const route = useRouter();
  const insets = useSafeAreaInsets()
  const navigation = useNavigation();
  const [groupId, setGroupId] = useState<string>();
  const [login, setLogin] = useState("");

  function handleBackPage() {
    route.replace(`/(painel)/group/${groupId}`);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchGroupId = async () => {
      const res = await AsyncStorage.getItem('groupId');
      setGroupId(res ?? '');
    };

    fetchGroupId();
  }, []);

  async function sendInvite() {
    if (!login.trim()) {
      Alert.alert("Erro", "Digite o login do usuário");
      return;
    }

    try {
      const authData = await AsyncStorage.getItem("authData");
      const userId = authData ? JSON.parse(authData).id : "";

      await api.post(
        `${API_BASE_URL}/api/group/invite`,
        { groupId, login },
        { headers: { userId } }
      );

      Alert.alert("Sucesso", "Convite enviado!");
      setLogin("");
      router.back();
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Erro ao enviar convite"
      );
    }
  }

  return (
    <View style={{marginTop: insets.top}}>
      <Stack href={`/(painel)/group/${groupId}`}>
        <Pressable onPress={handleBackPage}>
          <Text className="text-gray-900">Voltar</Text>
        </Pressable>
      </Stack>

      <View className="mt-8 flex flex-col px-5">
        <Text className="font-semibold block mb-2">Convite</Text>

        <View className="flex flex-row gap-2 mb-5">
          <TextInput className="flex-1 h-14 px-4 border border-gray-200 rounded-xl bg-white text-gray-600" placeholder="Digite o login" value={login} onChangeText={setLogin}/>
          <Pressable onPress={sendInvite} className="w-20 h-14 bg-gray-200 flex items-center justify-center rounded-xl">
            <Text className="text-gray-600">Enviar</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}
