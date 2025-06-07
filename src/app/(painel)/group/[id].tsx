import Dropdown from "@/src/components/dropdown";
import Stack from "@/src/components/stack";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

export default function Group() {
   const route = useRouter()
   const insets = useSafeAreaInsets()
   const [isMenuOpen, setIsMenuOpen] = useState(false)

   function navigateToAddAlbum(){
    route.navigate("./add-album")
   }

   function navigateToAlbum(){
    route.navigate('./album/[id]')
   }

   function openMenu() {
    setIsMenuOpen(curr => !curr)
  }

  function navigateToAddParticipant() {
    route.navigate('./add-participant')
  }
  
  function navigateToParticipants() {
    route.navigate('./participants')
  }

  return (
    <View style={{marginTop: insets.top}} className="flex-1">
      <Dropdown open={isMenuOpen} closeOnPress={openMenu} closeOnTouchMove={() => setIsMenuOpen(false)}>
        <Pressable onPress={navigateToAddParticipant} className="p-4"><Text>Novo membro</Text></Pressable>
        <Pressable onPress={navigateToParticipants} className="p-4"><Text>Membros</Text></Pressable>
      </Dropdown>

      <Stack href={'/(painel)/home'}>
        <View className="flex-1 flex flex-row items-center gap-4">
          <Image
            className="rounded-full w-10 h-10"
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          />
          <Text className="text-xl text-gray-900">Grupo tal</Text>
        </View>
        <View className="text-gray-900">
          <Pressable onPress={openMenu} className="p-5">
            <FontAwesome6 name="ellipsis-vertical" size={24} color="black" />
          </Pressable>
        </View>
      </Stack>

      <View className="w-full flex flex-row flex-wrap mt-8 px-2">
        <Pressable onPress={navigateToAddAlbum} className="h-36 w-1/3 bg-gray-200 rounded-2xl flex justify-center items-center"> 
          <FontAwesome6 name="plus" size={30} color="#4b5563" />         
          <Text className="text-gray-600 font-medium text-lg">Novo álbum</Text>
        </Pressable>
        
        <Pressable onPress={navigateToAlbum} className="h-36 w-1/3 overflow-hidden">
          <Image
            className="w-full h-full rounded-2xl mb-1"
            source={{ uri: "https://149616941.v2.pressablecdn.com/wp-content/uploads/2021/04/SRV-working-with-older-people-thumbnail.jpg" }}
          />

          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)', 'transparent']}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            className="absolute rounded-2xl h-full w-full z-10 overflow-hidden"
          />

          <Text numberOfLines={1} className="w-full absolute bottom-0 mb-1 pb-1 px-4 z-20 text-base font-medium text-gray-100">
            Fotos 2222222222222222221
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
