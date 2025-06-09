import { useRouter } from "expo-router";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import api from "@/src/services/api";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Stack from "@/src/components/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "@/src/context/authContext";
import { Asset } from "expo-asset";
import { Group } from "@/src/interfaces/Group";

export default function FormGroup() {
  const route = useRouter();
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState<DocumentPicker.DocumentPickerResult>();
  const [groupName, setGroupName] = useState<string>("");

  function handleBackPage() {
    route.replace("/(painel)/home");
  }

  async function pickDocument() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });
      setImage(result);
      console.log(result);
    } catch (err) {
      alert("Erro ao inserir imagem");
    }
  }

  async function save() {
    const { id } = useAuthStore.getState();
    const obj = new FormData();
    
    if (image?.output) {
      obj.set("image", image?.output[0]);
    } else{
      const asset = Asset.fromModule(require('../../../assets/images/groupNoImage.png'));
      await asset.downloadAsync();
      
      obj.append("image", {
        uri: asset.localUri || asset.uri,
        type: "image/png",
        name: "groupNoImage.png",
      } as any);
    }
    
    obj.set("name", groupName);
    obj.set("adm", String(id));

    const res = await api.post<Group>("/api/group", obj, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    route.replace(`./group/${res.data.id}`);
  }

  return (
    <View style={{ marginTop: insets.top, marginBottom: insets.bottom }} className="flex-1">
      <Stack href={"/(painel)/home"}>
        <Pressable onPress={handleBackPage}>
          <Text className="text-gray-900">Voltar</Text>
        </Pressable>
      </Stack>

      <View className="mt-8 flex gap-4 flex-col items-center px-4">
        <Pressable
          onPress={pickDocument}
          className="h-32 w-32 rounded-full bg-gray-200 flex justify-center items-center shadow-[0_0_10px_rgba(0,0,0,0.05)]"
        >
          {image?.assets ? (
            <Image
              className="rounded-full w-full h-full object-cover"
              source={{ uri: image.assets[0].uri }}
            />
          ) : (
            <MaterialCommunityIcons
              name="file-image-plus-outline"
              size={50}
              className="text-gray-600"
            />
          )}
        </Pressable>
        <TextInput
          className="h-14 shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 w-full outline-none border border-gray-200 rounded-xl flex-row items-center bg-white text-gray-600"
          placeholder="Nome do grupo"
          value={groupName}
          onChangeText={(value) => setGroupName(value)}
        />
      </View>

      <View className="mt-8 flex flex-col px-4">
        <Text className="font-semibold block mb-2">Convite</Text>

        <View className="flex flex-row gap-2 mb-5">
          <TextInput className="flex-1 h-14 px-4 border border-gray-200 rounded-xl bg-white text-gray-600" placeholder="Digite o e-mail"/>
          <Pressable className="w-20 h-14 bg-gray-200 flex items-center justify-center rounded-xl">
            <Text className="text-gray-600">Enviar</Text>
          </Pressable>
        </View>

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

      <Pressable
        onPress={save}
        className="mb-5 absolute bottom-0 right-0 mr-5 flex items-center justify-center rounded-full w-16 h-16 bg-green-900 text-green-100"
      >
        <AntDesign name="check" size={35} color="white" />
      </Pressable>
    </View>
  );
}
