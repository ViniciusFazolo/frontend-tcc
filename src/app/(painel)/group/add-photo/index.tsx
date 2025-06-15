import { useRouter } from "expo-router";
import { Image, Pressable, Text, TextInput, View, ScrollView, Alert, FlatList } from "react-native";
import { useState, useEffect } from "react";
import api from "@/src/services/api";
import { AntDesign } from "@expo/vector-icons";
import Stack from "@/src/components/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Album } from "@/src/interfaces/Album";
import { Publish } from "@/src/interfaces/Publish";
import { useGroupStore } from "@/src/context/groupContext";
import { UnifiedImage } from "@/src/interfaces/UnifiedImages";
import { useAuthStore } from "@/src/context/authContext";

interface Props {
  unifiedImages: UnifiedImage[]
}

export default function AddPhotoScreen({unifiedImages}: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentGroupId } = useGroupStore();
  const [images, setImages] = useState<UnifiedImage[]>(unifiedImages);
  const [description, setDescription] = useState<string>("");
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {id} = useAuthStore()

  useEffect(() => {
    loadAlbums();
  }, []);

  async function loadAlbums() {
    try {
      setLoading(true);
      const response = await api.get<Album[]>(`/api/album/group/${currentGroupId}`);
      setAlbums(response.data);
    } catch (error) {
      console.error('Erro ao carregar álbuns:', error);
      Alert.alert('Erro', 'Não foi possível carregar os álbuns');
    } finally {
      setLoading(false);
    }
  }

  function handleBackPage() {
    router.back();
  }

  async function savePhoto() {
    if (!selectedAlbum) {
      Alert.alert("Erro", "Selecione um álbum para salvar a foto");
      return;
    }

    if (images.length === 0) {
      Alert.alert("Erro", "Nenhuma imagem selecionada");
      return;
    }

    try {
      for (const image of images) {
        const formData = new FormData();

        formData.append('image', image.blob)
        formData.append('description', description);
        formData.append('album', selectedAlbum.id);
        formData.append('author', id!)

        await api.post<Publish>('/api/publish', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      Alert.alert('Sucesso', 'Fotos salvas com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.replace('/(painel)/home')
        }
      ]);

    } catch (error: any) {
      console.error('Erro ao salvar foto:', error);
      Alert.alert('Erro', 'Não foi possível salvar as fotos. Tente novamente.');
    }
  }

  const renderAlbumItem = ({ item }: { item: Album }) => (
    <Pressable
      onPress={() => setSelectedAlbum(item)}
      className={`p-4 border-2 rounded-xl mb-3 shadow-[0_0_10px_rgba(0,0,0,0.05)] ${
        selectedAlbum?.id === item.id 
          ? 'border-green-500 bg-green-50' 
          : 'border-gray-200 bg-white'
      }`}
    >
      <View className="flex-row items-center gap-3">
        <Image
          className="w-12 h-12 rounded-lg"
          source={{ uri: item.image }}
        />
        <View className="flex-1">
          <Text className="text-gray-900 font-medium text-base">
            {item.name}
          </Text>
        </View>
        {selectedAlbum?.id === item.id && (
          <AntDesign name="checkcircle" size={20} color="#10b981" />
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={{ marginTop: insets.top, marginBottom: insets.bottom }} className="flex-1 bg-white">
      <Stack href="/(painel)/group/camera">
        <Pressable onPress={handleBackPage}>
          <Text className="text-gray-900">Voltar</Text>
        </Pressable>
      </Stack>

      <ScrollView className="flex-1 px-4 mt-4">
        {/* Preview das imagens */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Fotos selecionadas ({images.length})
          </Text>
          
            <View>
              <View className="h-64 bg-gray-100 rounded-xl overflow-hidden mb-3">
                <Image
                  source={{ uri: images[currentImageIndex].uri }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              
              {images.length > 1 && (
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 8 }}
                >
                  {images.map((image, index) => (
                    <Pressable
                      key={index}
                      onPress={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-green-500' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        source={{ uri: image.uri }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </Pressable>
                  ))}
                </ScrollView>
              )}
            </View>
        </View>

        {/* Campo de descrição */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Descrição
          </Text>
          <TextInput
            className="h-24 shadow-[0_0_10px_rgba(0,0,0,0.05)] p-4 w-full border border-gray-200 rounded-xl bg-white text-gray-600"
            placeholder="Adicione uma descrição para suas fotos..."
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Seleção de álbum */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Selecionar álbum
          </Text>
          
          {loading ? (
            <Text className="text-gray-500 text-center py-4">Carregando álbuns...</Text>
          ) : albums.length === 0 ? (
            <View className="p-4 bg-gray-50 rounded-xl">
              <Text className="text-gray-500 text-center">
                Nenhum álbum encontrado. Crie um álbum primeiro.
              </Text>
            </View>
          ) : (
            <FlatList
              data={albums}
              renderItem={renderAlbumItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Botão de salvar */}
      <Pressable
        onPress={savePhoto}
        className="m-5 flex items-center justify-center rounded-full w-16 h-16 bg-green-900 self-end"
        disabled={!selectedAlbum || images.length === 0}
        style={{
          opacity: !selectedAlbum || images.length === 0 ? 0.5 : 1
        }}
      >
        <AntDesign name="check" size={35} color="white" />
      </Pressable>
    </View>
  );
}