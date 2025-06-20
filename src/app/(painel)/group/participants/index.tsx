import Stack from "@/src/components/stack";
import { Group } from "@/src/interfaces/Group";
import { User } from "@/src/interfaces/User";
import api, { API_BASE_URL } from "@/src/services/api";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Participants() {
  const route = useRouter();
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const [users, setUsers] = useState<User[]>([])
  const [group, setGroup] = useState<Group | null>(null);

  function handleBackPage() {
    route.replace("/(painel)/home");
  }

  function navigateToAddParticipant() {
    route.replace("./add-participant")
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [navigation]);

  async function loadParticipants() {
    const groupId: string = await AsyncStorage.getItem('groupId') ?? ''

    try {
      await api.get<User[]>(`${API_BASE_URL}/api/user/byGroupId/${groupId}`)
        .then(res => {
          setUsers(res.data)
        })
    } catch {
      Alert.alert("Erro", "Erro ao buscar participantes")
    }
  }

  async function loadGroup() {
    const groupId: string = await AsyncStorage.getItem('groupId') ?? ''

    await api.get<Group>(`${API_BASE_URL}/api/group/${groupId}`)
      .then(res => {
        setGroup(res.data)
      })
  }

  useEffect(() => {
    loadParticipants()
    loadGroup()
  }, [])


  return (
    <View style={{marginTop: insets.top}}>
      <Stack href={"/(painel)/home"}>
        <Pressable onPress={handleBackPage} className="flex-1">
          <Text className="text-gray-900">Voltar</Text>
        </Pressable>
        <Pressable className="p-3" onPress={navigateToAddParticipant}>
            <AntDesign name="adduser" size={24} className="text-gray-600"/>
        </Pressable>
      </Stack>

      <View className="mt-8 flex flex-col gap-2 px-5">
        <Text className="font-semibold text-gray-900 mb-2">Participantes: {users.length}</Text>
        <View className="flex flex-col gap-2">
          {users.map((user, index) => (
            <View key={index} className="flex flex-row items-center gap-4">
              <Image
                className="rounded-full w-10 h-10"
                source={{ uri: user.image }}
              />
              <Text className="text-gray-900 font-semibold">
                {user.name}
              </Text>
              {(group && user.id === group.adm.id) && (
                <Text className="px-3 py-1 text-sm bg-green-200 text-green-600 rounded-3xl">
                  Admin
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
