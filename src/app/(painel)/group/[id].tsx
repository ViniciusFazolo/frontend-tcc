import Dropdown from "@/src/components/dropdown";
import Stack from "@/src/components/stack";
import { FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { Group } from "@/src/interfaces/Group";
import { Album } from "@/src/interfaces/Album";
import api from "@/src/services/api";
import { useGroupStore } from "@/src/context/groupContext";

export default function GroupScreen() {
   const route = useRouter()
   const insets = useSafeAreaInsets()
   const { id } = useLocalSearchParams() //pega o id da que ta na rota
   const { setCurrentGroupId } = useGroupStore();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [group, setGroup] = useState<Group | null>(null);
   const [albums, setAlbums] = useState<Album[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    if (id && typeof id === 'string') {
      setCurrentGroupId(id); // salva no zustand
      loadGroupData();
    }
  }, [id]);

  async function loadGroupData() {
    try {
      setLoading(true);
      
      const groupResponse = await api.get<Group>(`/api/group/${id}`);
      setGroup(groupResponse.data);
      
      const albumsResponse = await api.get<Album[]>(`/api/group/${id}/albums`);
      setAlbums(albumsResponse.data);
      
    } catch (error) {
      console.error('Erro ao carregar grupo:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do grupo');
    } finally {
      setLoading(false);
    }
  }

   function navigateToAddAlbum() {
    route.navigate(`/group/add-album`)
  }

   function navigateToAlbum(id: string){
    route.navigate(`./album/${id}`)
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

  const AddAlbumButton = () => (
    <Pressable onPress={navigateToAddAlbum} className="h-36 w-1/3 p-1">
      <View className="flex-1 bg-gray-200 rounded-2xl flex justify-center items-center border-2 border-dashed border-gray-400">
        <FontAwesome6 name="plus" size={24} color="#6b7280" />         
        <Text className="text-gray-600 font-medium text-sm mt-2 text-center">
          Novo álbum
        </Text>
      </View>
    </Pressable>
  );

  const renderAlbum = ({ item }: { item: Album }) => (
    <Pressable 
      onPress={() => navigateToAlbum(item.id)} 
      className="h-36 w-1/3 p-1"
    >
      <View className="flex-1 overflow-hidden rounded-2xl">
        <Image
          className="w-full h-full"
          source={{
            uri: item.image 
          }}
        />

        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)', 'transparent']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          className="absolute rounded-2xl h-full w-full z-10"
        />

        <View className="absolute bottom-0 left-0 right-0 p-3 z-20">
          <Text numberOfLines={1} className="text-white font-medium text-sm">
            {item.name}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={{marginTop: insets.top}} className="flex-1 bg-white">
      <Dropdown open={isMenuOpen} closeOnPress={openMenu} closeOnTouchMove={() => setIsMenuOpen(false)}>
        <Pressable onPress={navigateToAddParticipant} className="p-4">
          <Text className="text-gray-900">Adicionar membro</Text>
        </Pressable>
        <Pressable onPress={navigateToParticipants} className="p-4">
          <Text className="text-gray-900">Ver membros</Text>
        </Pressable>
        <Pressable onPress={loadGroupData} className="p-4">
          <Text className="text-gray-900">Atualizar</Text>
        </Pressable>
      </Dropdown>

      <Stack href={'/(painel)/home'}>
        <View className="flex-1 flex flex-row items-center gap-4">
          <Image
            className="rounded-full w-12 h-12 border-2 border-gray-200"
            source={{ 
              uri: group?.image 
            }}
          />
          <View className="flex-1">
            <Text className="text-xl text-gray-900 font-semibold" numberOfLines={1}>
              {group?.name}
            </Text>
            {group?.description && (
              <Text className="text-gray-600 text-sm" numberOfLines={1}>
                {group.description}
              </Text>
            )}
          </View>
        </View>
        <Pressable onPress={openMenu} className="p-3">
          <FontAwesome6 name="ellipsis-vertical" size={20} color="#374151" />
        </Pressable>
      </Stack>

      <View className="flex-1 px-2 mt-4">
        <View className="flex-row items-center justify-between mb-4 px-2">
          <Text className="text-lg font-semibold text-gray-900">
            Álbuns ({albums.length})
          </Text>
        </View>

        <FlatList
          data={[{ id: 'add-button', isAddButton: true } as const, ...albums]}
          renderItem={({ item }) => 
            'isAddButton' in item ? <AddAlbumButton /> : renderAlbum({ item: item as Album })
          }
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
}
