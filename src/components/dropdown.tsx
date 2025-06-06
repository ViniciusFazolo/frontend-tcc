import { Pressable, View } from "react-native";

type Props = {
  children: React.ReactNode;
  closeOnPress: () => void;
  closeOnTouchMove?: () => void;
  open: boolean;
};

export default function Dropdown({
  children,
  closeOnPress,
  closeOnTouchMove,
  open,
}: Props) {
  if (!open) return null;

  return (
    <>
      <Pressable
        onPress={closeOnPress}
        onTouchMove={closeOnTouchMove}
        className="flex h-full w-full bg-transparent absolute z-40"
      ></Pressable>

      <View className="flex gap-5 px-4 py-5 absolute top-0 right-0 mt-14 border border-gray-200 bg-white rounded-lg w-48 z-50 shadow-[0_0_10px_rgba(0,0,0,0.05)]">
        {children}
      </View>
    </>
  );
}
