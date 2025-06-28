import { Invite } from "@/src/interfaces/Invite";
import api, { API_BASE_URL } from "@/src/services/api";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Notification() {
  const route = useRouter();
  const insets = useSafeAreaInsets()
  const [invites, setInvites] = useState<Invite[]>([]);

  function handleBackPage() {
    route.replace("/(painel)/home");
  }

  async function fetchInvites() {
    try {
      const authData = await AsyncStorage.getItem("authData");
      const userId = authData ? JSON.parse(authData).id : "";

      const response = await api.get<Invite[]>(
        `${API_BASE_URL}/api/group/invite/pending`,
        { headers: { userId } }
      );
      setInvites(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar convites");
    }
  }

  async function respondInvite(inviteId: string, accept: boolean) {
    try {
      await api.post(
        `${API_BASE_URL}/api/group/invite/${inviteId}/respond`,
        null,
        { params: { accept } }
      );
      Alert.alert("Sucesso", accept ? "Convite aceito" : "Convite recusado");
      fetchInvites();
    } catch {
      Alert.alert("Erro", "Erro ao responder convite");
    }
  }

  useEffect(() => {
    fetchInvites();
  }, []);

  function renderInvite({ item }: { item: Invite }) {
    return (
      <View className="flex flex-row items-start gap-4 mb-6 px-5">
        <Image
          className="rounded-full w-10 h-10"
          source={{ uri: item.invitedBy.image }}
        />
        <View className="flex flex-col flex-1 gap-2">
          <Text className="text-gray-900">
            <Text className="text-gray-900 font-semibold">
              {item.invitedBy.name}
            </Text>{" "}
            te convidou para fazer parte do grupo{" "}
            <Text className="font-semibold">{item.groupName}</Text>
          </Text>

          <View className="flex flex-row gap-2">
            <Pressable
              onPress={() => respondInvite(item.id, true)}
              className="w-max bg-green-200 rounded-lg flex-row items-center px-3 py-2"
            >
              <AntDesign name="check" size={24} color="#14532d" />
              <Text className="text-green-900 ml-1">Aceitar</Text>
            </Pressable>
            <Pressable
              onPress={() => respondInvite(item.id, false)}
              className="bg-gray-200 rounded-lg flex-row items-center px-3 py-2"
            >
              <MaterialIcons name="close" size={24} color="#4b5563" />
              <Text className="text-gray-600 ml-1">Recusar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ marginTop: insets.top }}>
      <View className="bg-white w-full h-[70px] flex flex-row items-center gap-4 py-5 px-3 text-gray-900 border-b shadow-[0_0_10px_rgba(0,0,0,0.05)] border-b-gray-200">
        <Pressable
          onPress={handleBackPage}
          className="flex flex-row items-center gap-2 flex-1"
        >
          <AntDesign name="arrowleft" size={24} className="text-gray-900" />
          <Text className="text-gray-900">Voltar</Text>
        </Pressable>
      </View>

      <View className="flex flex-row gap-2 mb-4 px-5 mt-8">
        <Pressable className="w-max h-max rounded-3xl px-3 border border-gray-200 bg-gray-200">
          <Text className="text-gray-600 text-sm">Todos</Text>
        </Pressable>
        <Pressable className="w-max h-max rounded-3xl px-3 border border-gray-200">
          <Text className="text-gray-600 text-sm">Não lidos</Text>
        </Pressable>
      </View>

      {invites.length > 0 ? (
        <FlatList
          data={invites}
          keyExtractor={(item) => item.id}
          renderItem={renderInvite}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View className="px-5">
          <Text className="text-gray-600">Nenhum convite pendente</Text>
        </View>
      )}
    </View>
  );
}
