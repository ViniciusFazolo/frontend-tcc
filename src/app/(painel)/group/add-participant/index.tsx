import Stack from "@/src/components/stack";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddParticipant() {
  const route = useRouter();
  const insets = useSafeAreaInsets()
  const navigation = useNavigation();

  function handleBackPage() {
    route.replace("/(painel)/home");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [navigation]);

  return (
    <View style={{marginTop: insets.top}}>
      <Stack href={"/(painel)/home"}>
        <Pressable onPress={handleBackPage}>
          <Text className="text-gray-900">Voltar</Text>
        </Pressable>
      </Stack>

      <View className="mt-8 flex flex-col px-5">
        <Text className="font-semibold block mb-2">Convite</Text>

        <View className="flex flex-row gap-2 mb-5">
          <TextInput className="flex-1 h-14 px-4 border border-gray-200 rounded-xl bg-white text-gray-600" placeholder="Digite o e-mail"/>
          <Pressable className="w-20 h-14 bg-gray-200 flex items-center justify-center rounded-xl">
            <Text className="text-gray-600">Enviar</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}
