import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  useWindowDimensions,
  FlatList,
  ListRenderItem,
  Image,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { IPhoto } from "../interface";
import { ScreenRootStackParamList } from "../shared.type";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput<{ width: number }>`
  background-color: rgba(255, 255, 255, 1);
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

interface SearchPhotoQuery {
  searchPhotos: IPhoto[];
}

interface SearchForm {
  keyword: string;
}

const Search = ({
  navigation,
}: NativeStackScreenProps<ScreenRootStackParamList, "Search">) => {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { register, handleSubmit, setValue, watch } = useForm<SearchForm>();
  const [startQueryFn, { loading, data, called }] =
    useLazyQuery<SearchPhotoQuery>(SEARCH_PHOTOS);

  const onSubmit = ({ keyword }: SearchForm) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      style={{ backgroundColor: "white" }}
      placeholderTextColor="black"
      placeholder="Search Photo"
      autoCapitalize="none"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onSubmit)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", { required: true });
  }, []);
  const renderItem: ListRenderItem<IPhoto> = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Photo", {
          photoId: photo.id,
        })
      }
    >
      <Image
        style={{ width: width / 4, height: 100 }}
        source={{ uri: photo.file }}
      />
    </TouchableOpacity>
  );

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Search by keyword...</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos.length === 0 ? (
            <MessageContainer>
              <ActivityIndicator size="large" />
              <MessageText>Could not find anything...</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchPhotos}
              keyExtractor={(photo) => "" + photo.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
};

export default Search;
