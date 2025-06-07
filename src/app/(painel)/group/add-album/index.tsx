import Stack from "@/src/components/stack";
import api from "@/src/services/api";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { DocumentPickerResult, getDocumentAsync } from "expo-document-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddAlbum() {
  const route = useRouter();
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState<DocumentPickerResult>();
  const [albumName, setAlbumName] = useState<string>("");

  function handleBackPage() {
    route.replace("/(painel)/home");
  }

  async function save() {
    const obj = new FormData();
    obj.set("name", albumName);
    if (image?.output) {
      obj.set("image", image?.output[0]);
    }
    obj.set("group", "34d74034-269d-4199-ace6-111947e48789");

    const res = await api.post("/api/album", obj, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    route.back();
  }

  async function pickDocument() {
    try {
      const result = await getDocumentAsync({
        copyToCacheDirectory: true,
      });
      setImage(result);
      console.log(result);
    } catch (err) {
      alert("Erro ao inserir imagem");
    }
  }

  return (
    <View
      style={{ marginTop: insets.top, marginBottom: insets.bottom }}
      className="flex-1"
    >
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
          placeholder="Nome do álbum"
          value={albumName}
          onChangeText={(value) => setAlbumName(value)}
        />
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
