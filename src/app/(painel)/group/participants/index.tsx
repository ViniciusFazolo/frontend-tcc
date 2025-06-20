import Stack from "@/src/components/stack";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Participants() {
  const route = useRouter();
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

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
        <Text className="font-semibold text-gray-900 mb-2">Participantes: 3</Text>
        <View className="flex flex-col gap-2">
          <View className="flex flex-row items-center gap-4">
            <Image
              className="rounded-full w-10 h-10"
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            />
            <Text className="text-gray-900 font-semibold">
              Vinícius Fazolo (Você)
            </Text>
            <Text className="px-3 py-1 text-sm bg-green-200 text-green-600 rounded-3xl">
              Admin
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
