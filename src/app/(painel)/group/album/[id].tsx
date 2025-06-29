import Stack from "@/src/components/stack";
import { Publish } from "@/src/interfaces/Publish";
import api, { API_BASE_URL } from "@/src/services/api";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Album() {
  const {id} = useLocalSearchParams()
  const insets = useSafeAreaInsets()
  const [publishs, setPublishs] = useState<Publish[]>([])
  const screenWidth = Dimensions.get("window").width;
  const [groupId, setGroupId] = useState<string>();

  useEffect(() => {
    findPublishs()

    const fetchGroupId = async () => {
      const res = await AsyncStorage.getItem('groupId');
      setGroupId(res ?? '');
    };

    fetchGroupId();
  }, [id])

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
      
      setPublishs(obj)
    } catch {
      Alert.alert("Erro ao carregar as fotos")
    }
  }, [id])

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


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 4 }}
        >
          {item.images.map((img, index) => (
            <Pressable key={index}>
              <Image
                style={{
                  width: screenWidth * 0.9, // 90% da largura da tela
                  height: 300,
                  borderRadius: 16,
                  resizeMode: 'cover', // ou 'contain'
                }}
                source={{ uri: `${img}` }}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{marginTop: insets.top}} className="flex flex-1 bg-[#F6F6F6]">
      <Stack href={`/(painel)/group/${groupId}`}>
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
