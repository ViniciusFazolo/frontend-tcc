import Stack from "@/src/components/stack";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Participants() {
  const route = useRouter();

  function handleBackPage() {
    route.replace("/(painel)/home");
  }

  return (
    <>
      <Stack href={"/(painel)/home"}>
        <Pressable onPress={handleBackPage} className="flex-1">
          <Text className="text-gray-900">Voltar</Text>
        </Pressable>
        <Pressable>
            <AntDesign name="adduser" size={24} className="text-gray-600"/>
        </Pressable>
      </Stack>

      <View className="mt-8 flex flex-col gap-2 px-5">
        <Text className="font-semibold text-gray-900">Participantes: 3</Text>
        <View className="flex flex-col gap-2">
          <View className="flex flex-row items-center gap-4">
            <View className="w-8 h-8 bg-gray-600 rounded-full"></View>
            <Text className="text-sm text-gray-900">
              teste@gmail.com
            </Text>
          </View>
          <View className="flex flex-row items-center gap-4">
            <Image
              className="rounded-full w-8 h-8"
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            />
            <Text className="flex-1 text-sm text-gray-900">
              Vinícius Fazolo (Você)
            </Text>
            <Text className="px-3 py-1 text-xs bg-green-200 text-green-600 rounded-3xl">
              Admin
            </Text>
          </View>
          <View className="flex flex-row items-center gap-4">
            <Image
              className="rounded-full w-8 h-8"
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            />
            <Text className="text-sm text-gray-900">
              nelsonfrjunior@gmail.com
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
