import { useRouter, useLocalSearchParams } from "expo-router";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import api from "@/src/services/api";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Stack from "@/src/components/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import { Album } from "@/src/interfaces/Album";

export default function AddAlbumScreen() {
  const route = useRouter();
  const insets = useSafeAreaInsets();
  const { id: groupId } = useLocalSearchParams(); // id do grupo

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [albumName, setAlbumName] = useState<string>("");

  function handleBackPage() {
    const finalGroupId = Array.isArray(groupId) ? groupId[0] : groupId;
    route.replace(`/(painel)/group/${finalGroupId}`);
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  }

  async function save() {
    if (!albumName.trim()) {
      alert("Nome do álbum é obrigatório");
      return;
    }

    const finalGroupId = Array.isArray(groupId) ? groupId[0] : groupId;

    if (!finalGroupId) {
      alert("ID do grupo não encontrado");
      return;
    }

    try {
      const obj = new FormData();

      if (image?.file) {
        obj.append('image', image.file)
      } else {
        const asset = Asset.fromModule(require("../../../../../assets/images/albumNoImage.png"));
        await asset.downloadAsync();

        obj.append("image", {
          uri: asset.localUri || asset.uri,
          name: "albumNoImage.png",
          type: "image/png",
        } as any);
      }

      obj.append("name", albumName);
      obj.append("group", String(finalGroupId)); // vínculo com o grupo

      const res = await api.post<Album>(`/api/album`, obj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      route.replace(`/(painel)/group/${finalGroupId}`);

    } catch (error: any) {
      console.error("Erro ao criar álbum:", error);
      alert("Erro ao criar álbum. Tente novamente.");
    }
  }

  return (
    <View style={{ marginTop: insets.top, marginBottom: insets.bottom }} className="flex-1">
      <Stack href={`/(painel)/group/${Array.isArray(groupId) ? groupId[0] : groupId}`}>
        <Pressable onPress={handleBackPage}>
          <Text className="text-gray-900">Voltar</Text>
        </Pressable>
      </Stack>

      <View className="mt-8 flex gap-4 flex-col items-center px-4">
        <Pressable
          onPress={pickImage}
          className="h-32 w-32 rounded-2xl bg-gray-200 flex justify-center items-center shadow-[0_0_10px_rgba(0,0,0,0.05)]"
        >
          {image ? (
            <Image
              className="rounded-2xl w-full h-full object-cover"
              source={{ uri: image.uri }}
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