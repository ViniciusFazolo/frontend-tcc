import Stack from "@/src/components/stack";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Group() {
   const route = useRouter()

   function handleBackPage() {
      route.replace('/(painel)/home')
   }

   function navigateToAddAlbum(){
    route.navigate("./add-album")
   }

   function navigateToAlbum(){
    route.navigate('./album/[id]')
   }

  return (
    <>
      <Stack href={'/(painel)/home'}>
        <View className="flex-1 flex flex-row items-center gap-4 ml-2">
          <Image
            className="rounded-full w-10 h-10"
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
          <Text className="text-xl text-gray-900">Grupo tal</Text>
        </View>
        <View className="flex flex-row gap-3 text-gray-900">
          <Pressable>
            <FontAwesome6 name="ellipsis-vertical" size={24} color="black" />
          </Pressable>
        </View>
      </Stack>

      <View className="border-1 border-red-700 w-full grid grid-cols-3 flex-wrap justify-center gap-2 mt-8 px-4">
        <Pressable onPress={navigateToAddAlbum} className="w-full h-[120px] bg-gray-200 rounded-2xl flex justify-center items-center"> 
          <FontAwesome6 name="plus" size={24} className="text-gray-600"/>         
          <Text className="text-gray-600">Novo álbum</Text>
        </Pressable>
        
        <Pressable onPress={navigateToAlbum} className="h-[120px] bg-linear-to-t from-sky-500 to-indigo-500">
          <Image
            className="w-full h-full rounded-2xl mb-1"
            source={{ uri: "https://149616941.v2.pressablecdn.com/wp-content/uploads/2021/04/SRV-working-with-older-people-thumbnail.jpg" }}
          />

          <View className="absolute rounded-2xl opacity-70 h-full w-full z-10 bg-gradient-to-t from-black via-20% via-black to-[#ffffff15]"></View>

          <Text className="w-full absolute bottom-0 mb-1 px-2 z-20 text-base font-medium text-gray-100 truncate">Fotos 222222221</Text>
        </Pressable>
      </View>
    </>
  );
}
