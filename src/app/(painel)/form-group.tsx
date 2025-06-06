import { useRouter } from "expo-router";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import api from "@/src/services/api";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export default function FormGroup() {
  const route = useRouter();
  const [image, setImage] = useState<DocumentPicker.DocumentPickerResult>();
  const [groupName, setGroupName] = useState<string>('');

  function handleBackPage() {
    route.replace("/(painel)/home");
  }

  async function pickDocument() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });
      setImage(result);
      console.log(result)
    } catch (err) {
      alert("Erro ao inserir imagem")
    }
  };

  async function save(){
    const obj = new FormData()
    obj.set('name', groupName)
    if(image?.output){
      obj.set('image', image?.output[0])
    }
    obj.set('adm', '4f36e01e-8805-48e7-b830-63a8fc4bd4e9')

    const res = await api.post('/api/group', obj, {headers: {'Content-Type': 'multipart/form-data'}});
    console.log(res)
  }

  return (
    <>
      <View className="bg-white w-full h-[70px] flex flex-row items-center gap-4 py-5 px-3 text-gray-900 border-b shadow-[0_0_10px_rgba(0,0,0,0.05)] border-b-gray-200">
        <Pressable
          onPress={handleBackPage}
          className="flex flex-row items-center gap-2"
        >
          <AntDesign name="arrowleft" size={24} className="text-gray-900" />
          <Text className="text-gray-900">Voltar</Text>
        </Pressable>
      </View>

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
            <MaterialCommunityIcons name="file-image-plus-outline" size={24} className="text-gray-600" />
          )}
        </Pressable>
        <TextInput
          className="shadow-[0_0_10px_rgba(0,0,0,0.05)] h-12 ml-2 px-4 w-full outline-none border border-gray-200 rounded-xl flex-row items-center bg-white text-gray-600"
          placeholder="Nome do grupo"
          value={groupName}
          onChangeText={(value) => setGroupName(value)}
        />
      </View>

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
            <Image
              className="rounded-full w-8 h-8"
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            />
            <Text className="text-sm text-gray-900 font-semibold">
              Vinícius Fazolo (Você)
            </Text>
          </View>
          <View className="flex flex-row items-center gap-4">
            <Image
              className="rounded-full w-8 h-8"
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            />
            <Text className="text-sm text-gray-900">
              nelsonfrjunior@gmail.com (Enviado)
            </Text>
          </View>
        </View>
      </View>

      <Pressable onPress={save} className="absolute bottom-0 right-0 m-5 flex items-center justify-center rounded-full w-16 h-16 bg-green-900 text-green-100">
        <AntDesign name="check" size={35} />
      </Pressable>
    </>
  );
}
