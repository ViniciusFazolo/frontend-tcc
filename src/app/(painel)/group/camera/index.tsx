import Stack from "@/src/components/stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [navigation]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    const photo = await ref.current?.takePictureAsync();
    setImages((curr) => [...curr, photo?.uri!]);
    setUri(photo?.uri!);
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      result.assets?.forEach((item) => {
        setImages((curr) => [...curr, item.uri]);
      });

      setUri(result.assets[0].uri);
    }
  }

  function cancelPicture() {
    setImages([]);
  }

  function deleteImage(index: number) {
    setImages(images.filter((_, i) => i !== index));

    setUri(images[index - 1]);
  }

  function renderCamera() {
    return (
      <CameraView ref={ref} mirror={true} style={styles.camera} facing={facing}>
        <View className="absolute top-0" style={{ marginTop: insets.top }}>
          <Stack
            href="/(painel)/home"
            bgColor="bg-transparent"
            arrowColor="white"
          />
        </View>
        <View
          className="w-full flex-row items-center justify-around"
          style={{ marginBottom: insets.bottom + 40 }}
        >
          <TouchableOpacity
            onPress={pickImage}
            className="items-center justify-center w-12 h-12 bg-black/40 rounded-full"
          >
            <Ionicons name="images-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={takePicture}
            className="w-20 h-20 rounded-full border-4 border-white p-1"
          >
            <View className="w-full h-full bg-white rounded-full"></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCameraFacing}
            className="items-center justify-center w-12 h-12 bg-black/40 rounded-full"
          >
            <Ionicons name="camera-reverse-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    );
  }

  function renderImageCaptured() {
    return (
      <View
        style={{ marginBottom: insets.bottom, marginTop: insets.top }}
        className="flex-1 justify-between"
      >
        <View className="w-full px-5 mt-5 z-10">
          <TouchableOpacity
            onPress={cancelPicture}
            className="items-center justify-center w-12 h-12 bg-black/40 rounded-full"
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className=" w-full h-[70%] bg-black">
          {uri && (
            <Image
              source={{ uri: uri }}
              className="w-full h-full rounded-lg object-contain"
              resizeMode="contain"
            />
          )}
        </View>

        {images.length > 1 && (
          <View className="h-16 px-2 items-center">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center", gap: 3 }}
            >
              {images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setUri(image)}
                  className={`h-16 w-16 rounded-md overflow-hidden`}
                >
                  <Image source={{ uri: image }} className="w-full h-full" />

                  {image === uri && (
                    <Pressable
                      onPress={() => deleteImage(index)}
                      className="w-16 h-16 absolute bg-black/40 items-center justify-center"
                    >
                      <Ionicons name="trash-outline" size={24} color="white" />
                    </Pressable>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View className="flex-row justify-end gap-3 w-full px-5 items-center mb-5">
          <TouchableOpacity
            onPress={cancelPicture}
            className="items-center justify-center w-16 h-16 bg-black/40 rounded-full"
          >
            <MaterialCommunityIcons
              name="file-image-plus-outline"
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <Pressable className="items-center justify-center w-16 h-16 bg-green-900 rounded-full">
            <Ionicons name="arrow-forward" size={35} color="white" />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {images.length > 0 ? renderImageCaptured() : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
