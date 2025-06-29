import Dropdown from "@/src/components/dropdown";
import { useAuthStore } from "@/src/context/authContext";
import { Group } from "@/src/interfaces/Group";
import { Invite } from "@/src/interfaces/Invite";
import { LoginResponse } from "@/src/interfaces/LoginResponse";
import api, { API_BASE_URL, findAll } from "@/src/services/api";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [groups, setGroups] = useState<Group[]>([])
  const [totalPendingInvites, setTotalPendingInvites] = useState(0);
  const router = useRouter();
  const auth = useAuthStore()

  async function fetchTotalPendingInvites() {
    try {
      const authData = await AsyncStorage.getItem("authData");
      const userId = authData ? JSON.parse(authData).id : "";

      if (!userId) {
        console.warn("User ID not found for fetching invites.");
        return;
      }

      const response = await api.get<Invite[]>(
        `${API_BASE_URL}/api/group/invite/pending`,
        { headers: { userId } }
      );
      setTotalPendingInvites(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar total de convites pendentes:", error);
      setTotalPendingInvites(0);
    }
  }

  const renderItem = ({ item }: { item: Group }) => (
    <Pressable onPress={() => {router.navigate(`/group/${item.id}`)}} className="h-[70px] shadow-[0_0_10px_rgba(0,0,0,0.03)] bg-white border border-gray-200 p-4 w-full flex flex-row items-center gap-3 rounded-3xl mb-2">
      <Image className="rounded-full w-12 h-12" source={{ uri: item.image }} />
      <Text className="text-base text-gray-900 flex-1">{item.name}</Text>
      {item.userGroups[0].totalNotifies > 0 && (
        <View className="flex flex-col items-center gap-1">
          <Text className="text-gray-600 font-semibold text-xs">{item.userGroups[0].hourLastPublish.split(":").slice(0, 2).join(":")}</Text>
          <Text className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
            {item.userGroups[0].totalNotifies}
          </Text>
        </View>
      )}
    </Pressable>
  );

  const ListHeader = () => (
    <>
      <View className="flex flex-col mb-4 shadow-[0_0_10px_rgba(0,0,0,0.03)]">
        <View className="border border-gray-200 rounded-3xl flex-row items-center bg-white text-gray-600">
          <View className="px-4 py-3">
            <AntDesign name="search1" size={24} color="black" />
          </View>
          <TextInput
            className="flex-1 ml-2 h-full outline-none"
            placeholder="Pesquisar"
            value=""
          />
        </View>
      </View>

      <View className="flex flex-row gap-2 mb-4">
        <Pressable className="w-max h-max rounded-3xl px-3 border border-gray-200 bg-gray-200">
          <Text className="text-gray-600 text-sm">Todos</Text>
        </Pressable>
        <Pressable className="w-max h-max rounded-3xl px-3 border border-gray-200">
          <Text className="text-gray-600 text-sm">Não lidos</Text>
        </Pressable>
      </View>
    </>
  );

  function navigateToNotifications(){
    router.navigate('/notification')
  }

  function openMenu() {
    setIsMenuOpen(curr => !curr)
  }

  function navigateToFormGroup() {
    router.navigate('./form-group')
    openMenu()
  }

  function logout() {
    auth.logout()
    router.replace('/')
  }

  useFocusEffect(
    useCallback(() => {
      getGroups();
      fetchTotalPendingInvites();
    }, [])
  );

  async function getGroups() {
    const loginResponse: LoginResponse = JSON.parse(await AsyncStorage.getItem('authData') ?? '')
    
    api.get<Group[]>(`${API_BASE_URL}/api/group/userId/${loginResponse.id}`)
      .then(res => {
        setGroups(res.data) 
      });
  }

  return (
    <SafeAreaView className="flex gap-4 flex-1 bg-[#F6F6F6] relative">
      <Dropdown open={isMenuOpen} closeOnPress={openMenu} closeOnTouchMove={() => setIsMenuOpen(false)}>
        <Pressable onPress={navigateToFormGroup} className="p-4"><Text>Novo grupo</Text></Pressable>
        <Pressable className="p-4"><Text>Configurações</Text></Pressable>
        <Pressable onPress={logout} className="p-4"><Text>Sair</Text></Pressable>
      </Dropdown>

      <View className="w-full h-[70px] flex flex-row items-center justify-between pl-5">
        <Text className="text-xl">Nome do app</Text>
        <View className="flex flex-row justify-center items-center text-gray-900">
          <Pressable onPress={navigateToNotifications} className="p-5 relative">
            <Feather name="bell" size={24} color="black" />
            {totalPendingInvites > 0 && (
              <View className="absolute top-3 right-3 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                <Text className="text-white text-xs font-bold">{totalPendingInvites}</Text>
              </View>
            )}
          </Pressable>
          <Pressable onPress={openMenu} className="p-5">
            <FontAwesome6 name="ellipsis-vertical" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      <View className="flex-1 px-4 pb-5">
        <FlatList
          data={groups}
          renderItem={renderItem}
          keyExtractor={item => item.id!}
          extraData={selectedId}
          ListHeaderComponent={<ListHeader />}
        />
      </View>
    </SafeAreaView> 
  );
}
