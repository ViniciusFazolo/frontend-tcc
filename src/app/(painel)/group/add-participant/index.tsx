import Stack from "@/src/components/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddParticipant() {
  const route = useRouter();
  const insets = useSafeAreaInsets()
  const navigation = useNavigation();
  const [groupId, setGroupId] = useState<string>();

  function handleBackPage() {
    route.replace(`/(painel)/group/${groupId}`);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchGroupId = async () => {
      const res = await AsyncStorage.getItem('groupId');
      setGroupId(res ?? '');
    };

    fetchGroupId();
  }, []);

  return (
    <View style={{marginTop: insets.top}}>
      <Stack href={`/(painel)/group/${groupId}`}>
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
