import { useRouter } from "expo-router";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import api from "@/src/services/api";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Stack from "@/src/components/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import { Album } from "@/src/interfaces/Album";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddAlbumScreen() {
  const route = useRouter();
  const insets = useSafeAreaInsets();
  const [groupId, setGroupId] = useState<string>('')

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [albumName, setAlbumName] = useState<string>("");

  function handleBackPage() {
    route.replace(`/(painel)/group/${groupId}`);
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


    if (!groupId) {
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

        //transform to blob
        const assetFetch = await fetch(asset?.uri)
        const blob = await assetFetch.blob()
        
        obj.append("image", blob);
      }

      obj.append("name", albumName);
      obj.append("group", String(groupId)); // vínculo com o grupo

      const res = await api.post<Album>(`/api/album`, obj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      route.replace(`/(painel)/group/${groupId}`);

    } catch (error: any) {
      console.error("Erro ao criar álbum:", error);
      alert("Erro ao criar álbum. Tente novamente.");
    }
  }

  useEffect(() => {
    const fetchGroupId = async () => {
      const res = await AsyncStorage.getItem('groupId');
      setGroupId(res ?? '');
    };

    fetchGroupId();
  }, []);

  return (
    <View style={{ marginTop: insets.top, marginBottom: insets.bottom }} className="flex-1">
      <Stack href={`/(painel)/group/${groupId}`}>
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
        disabled={!albumName.trim()}
        className="mb-5 absolute bottom-0 right-0 mr-5 flex items-center justify-center rounded-full w-16 h-16 bg-green-900 text-green-100"
        style={{
          opacity: !albumName.trim() ? 0.5 : 1,
        }}
      >
        <AntDesign name="check" size={35} color="white" />
      </Pressable>
    </View>
  );
}