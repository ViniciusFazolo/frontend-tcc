import Stack from "@/src/components/stack";
import { Publish } from "@/src/interfaces/Publish";
import api, { API_BASE_URL } from "@/src/services/api";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";

export default function Album() {
  const {id} = useLocalSearchParams()
  const [publishs, setPublishs] = useState<Publish[]>([])

  useEffect(() => {
    findPublishs()
  }, [])

  const findPublishs = useCallback(async () => {
    try {
      const response = await api.get<Publish[]>(`${API_BASE_URL}/api/publish/${id}`);
      const formatter = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const obj = response.data.map(item => ({
        ...item,
        whenSent: formatter.format(new Date(item.whenSent)),
      }));
      
      console.log(obj)
      setPublishs(obj)
    } catch {
      Alert.alert("Erro ao carregar as fotos")
    }
  }, [])

  function renderItem({ item }: { item: Publish }) {
    return (
      <View className="flex flex-col gap-4 mb-8">
        <View className="flex flex-row gap-4 items-center w-full justify-start">
          <Image
            className="rounded-full w-12 h-12"
            source={{ uri: `${item.author.image}` }}
          />

          <View>
            <Text className="font-medium text-base text-gray-900">
              {item.author.name}
            </Text>
            <Text className="text-xs text-gray-900">{item.whenSent}</Text>
          </View>
        </View>

        <Text className="text-gray-900">{item.description}</Text>

        <Pressable className="w-full h-72">
          <Image
            className="w-full h-full rounded-2xl mb-1"
            source={{
              uri: `${item.image}`,
            }}
          />
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex flex-1 bg-[#F6F6F6]">
      <Stack href={'/(painel)/home'}>
        <View className="flex-1 flex flex-row items-center gap-4">
          <Image
            className="rounded-full w-10 h-10"
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
        </View>
        <View className="text-gray-900">
          <Pressable className="p-5">
            <FontAwesome6 name="ellipsis-vertical" size={24} color="black" />
          </Pressable>
        </View>
      </Stack>

      <View className="flex-1 px-4">
        {publishs.length > 0 ? (
          <FlatList
            data={publishs}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <Text className="mt-4 mb-4 text-gray-600 text-xs">Total de {publishs.length} fotos</Text>
            }
            ListFooterComponent={
              <Text className="mb-4 text-center text-gray-600 text-xs">Sem mais resultados</Text>
            }
          />)
          :
          (
            <View className="items-center justify-center h-full">
              <Ionicons name="images-outline" size={100} color="#4b5563" />
              <Text className="text-gray-600">Álbum vazio</Text>
            </View>
          )
        }
      </View>
    </View>
  );
}
