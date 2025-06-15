import { useRouter } from "expo-router";
import { Image, Platform, Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import api from "@/src/services/api";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Stack from "@/src/components/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import { Group } from "@/src/interfaces/Group";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginResponse } from "@/src/interfaces/LoginResponse";

export default function FormGroup() {
  const route = useRouter();
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [groupName, setGroupName] = useState<string>("");

  function handleBackPage() {
    route.replace("/(painel)/home");
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
    const loginResponse: LoginResponse = JSON.parse(await AsyncStorage.getItem('authData') ?? '')
    const obj = new FormData();

    if (!groupName.trim()) {
      alert("Nome do grupo é obrigatório");
      return;
    }

    if (image) {
      if (Platform.OS === 'web') {
        if (image.file) {
          obj.append('image', image.file);
        }
      } else {
        obj.append('image', {
          uri: image.uri,
          type: image.type || 'image/jpeg',
          name: image.fileName || 'image.jpg',
        } as any);
      }
    } else {
      const asset = Asset.fromModule(require("../../../assets/images/groupNoImage.png"));
      await asset.downloadAsync();

      if (Platform.OS === 'web') {
        const assetFetch = await fetch(asset?.uri);
        const blob = await assetFetch.blob();
        obj.append("image", blob);
      } else {
        obj.append("image", {
          uri: asset.uri,
          type: 'image/png',
          name: 'groupNoImage.png',
        } as any);
      }
    }

    obj.append("name", groupName);
    obj.append("adm", loginResponse.id);

    const res = await api.post<Group>("/api/group", obj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
          onPress={pickImage}
          className="h-32 w-32 rounded-full bg-gray-200 flex justify-center items-center shadow-[0_0_10px_rgba(0,0,0,0.05)]"
        >
          {image ? (
            <Image
              className="rounded-full w-full h-full object-cover"
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
        disabled={!groupName.trim()}
        className="mb-5 absolute bottom-0 right-0 mr-5 flex items-center justify-center rounded-full w-16 h-16 bg-green-900 text-green-100"
        style={{
          opacity: !groupName.trim() ? 0.5 : 1,
        }}
      >
        <AntDesign name="check" size={35} color="white" />
      </Pressable>
    </View>
  );
}
