import Stack from "@/src/components/stack";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddParticipant() {
  const route = useRouter();
  const insets = useSafeAreaInsets()

  function handleBackPage() {
    route.replace("/(painel)/home");
  }

  return (
    <View style={{marginTop: insets.top}}>
      <Stack href={"/(painel)/home"}>
        <Pressable onPress={handleBackPage}>
          <Text className="text-gray-900">Voltar</Text>
        </Pressable>
      </Stack>

      <View className="mt-8 flex flex-col px-5">
        <Text className="font-semibold block">Convite</Text>

        <View className="flex flex-row gap-2 mb-5">
          <TextInput
            className="shadow-[0_0_10px_rgba(0,0,0,0.05)] w-full h-12 px-4 outline-none border border-gray-200 rounded-xl flex-row items-center bg-white text-gray-600"
            placeholder="E-mail"
            value=""
          />
          <Pressable className="shadow-[0_0_10px_rgba(0,0,0,0.05)] bg-gray-200 px-3 h-12 flex items-center justify-center rounded-xl">
            <Text className="text-gray-600 w-max">Enviar</Text>
          </Pressable>
        </View>

        <View className="flex flex-col gap-2">
          <View className="flex flex-row items-center gap-4">
            <View className="w-8 h-8 bg-gray-600 rounded-full"></View>
            <Text className="text-sm text-gray-900">
              teste@gmail.com (Enviado)
            </Text>
          </View>
          <View className="flex flex-row items-center gap-4">
            <Image
              className="rounded-full w-8 h-8"
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            />
            <Text className="flex-1 text-sm text-gray-900 font-semibold">
              Vinícius Fazolo (Você)
            </Text>
            <Text className="px-3 py-1 text-xs bg-green-200 text-green-600 rounded-3xl">Admin</Text>
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
    </View>
  );
}
