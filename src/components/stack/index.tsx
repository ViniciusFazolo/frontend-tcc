import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Props } from "./interface/props";
import { AntDesign } from "@expo/vector-icons";

export default function Stack({children, href, bgColor = "bg-white", arrowColor = "black"}: Props) {
    const router = useRouter()

    function handleBackPage(){
        router.replace(href)
    }

  return (
    <View className={`${bgColor} w-full h-[70px] flex flex-row items-center text-gray-900 ${bgColor === "bg-transparent" ? '' : 'border-b-gray-200 border-b shadow-[0_0_10px_rgba(0,0,0,0.05)]'}`}>
      <Pressable
        onPress={handleBackPage}
        className="flex flex-row items-center"
      >
        <AntDesign name="arrowleft" size={24} className="text-gray-900 p-5"color={arrowColor} />
      </Pressable>

      {children}
    </View>
  );
}
