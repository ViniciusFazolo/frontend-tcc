import Dropdown from "@/src/components/dropdown";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    id: "1",
    nome: "Grupo da Família",
    foto: "https://reactnative.dev/img/tiny_logo.png",
    horario: "10:32",
    notificacoes: 10,
  },
  {
    id: "2",
    nome: "Amigos do Futebol",
    foto: "https://reactnative.dev/img/tiny_logo.png",
    horario: "09:15",
    notificacoes: 3,
  },
  {
    id: "3",
    nome: "Amigos do Futebol",
    foto: "https://reactnative.dev/img/tiny_logo.png",
    horario: "09:15",
    notificacoes: 3,
  },
  {
    id: "4",
    nome: "Amigos do Futebol",
    foto: "https://reactnative.dev/img/tiny_logo.png",
    horario: "09:15",
    notificacoes: 3,
  },
  {
    id: "5",
    nome: "Amigos do Futebol",
    foto: "https://reactnative.dev/img/tiny_logo.png",
    horario: "09:15",
    notificacoes: 3,
  },
  {
    id: "6",
    nome: "Amigos do Futebol",
    foto: "https://reactnative.dev/img/tiny_logo.png",
    horario: "09:15",
    notificacoes: 3,
  },
  {
    id: "7",
    nome: "Amigos do Futebol",
    foto: "https://reactnative.dev/img/tiny_logo.png",
    horario: "09:15",
    notificacoes: 3,
  },
  {
    id: "8",
    nome: "Amigos do Futebol",
    foto: "https://reactnative.dev/img/tiny_logo.png",
    horario: "09:15",
    notificacoes: 3,
  },
  // ... mais dados
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <Pressable onPress={() => {router.navigate(`/group/${item.id}`)}} className="h-[70px] shadow-[0_0_10px_rgba(0,0,0,0.03)] bg-white border border-gray-200 p-4 w-full flex flex-row items-center gap-3 rounded-3xl mb-2">
      <Image className="rounded-full w-12 h-12" source={{ uri: item.foto }} />
      <Text className="text-base text-gray-900 flex-1">{item.nome}</Text>
      <View className="flex flex-col items-center gap-1">
        <Text className="text-gray-600 font-semibold text-xs">{item.horario}</Text>
        <Text className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
          {item.notificacoes}
        </Text>
      </View>
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
    console.log("clicou")
  }

  function navigateToFormGroup() {
    router.navigate('./form-group')
  }

  return (
    <SafeAreaView className="flex gap-4 flex-1 bg-[#F6F6F6] relative">
      <Dropdown open={isMenuOpen} closeOnPress={openMenu} closeOnTouchMove={() => setIsMenuOpen(false)}>
        <Pressable onPress={navigateToFormGroup}><Text>Novo grupo</Text></Pressable>
        <Pressable><Text>Configurações</Text></Pressable>
      </Dropdown>

      <View className="w-full h-[70px] flex flex-row items-center justify-between pl-5">
        <Text className="text-xl">Nome do app</Text>
        <View className="flex flex-row justify-center items-center text-gray-900">
          <Pressable onPress={navigateToNotifications} className="p-5">
            <Feather name="bell" size={24} color="black" />
          </Pressable>
          <Pressable onPress={openMenu} className="p-5">
            <FontAwesome6 name="ellipsis-vertical" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      <View className="flex-1 px-4 pb-5">
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          ListHeaderComponent={<ListHeader />}
        />
      </View>
    </SafeAreaView> 
  );
}
