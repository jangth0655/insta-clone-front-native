import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { IComment, IUser } from "../interface";
import { RootStackParamList } from "../shared.type";
import { Ionicons } from "@expo/vector-icons";
import { ApolloCache, gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.View``;

const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

const Username = styled.Text`
  color: white;
  font-weight: 600;
`;

const File = styled.Image``;

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;

const ExtraContainer = styled.View`
  padding: 10px;
`;

const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Likes = styled.Text`
  color: white;
  margin: 7px 0;
  font-weight: 600;
`;

interface toggleLikeMutation {
  toggleLike: {
    ok: boolean;
    error?: string;
  };
}

interface PhotoProps {
  id?: number | null;
  user?: IUser;
  isLiked?: boolean | null;
  likes?: number | null;
  file?: any;
  caption?: string | null;
  commentNumber?: number | null;
  comments?: IComment[];
}

type PhotoItemNavigation = NativeStackNavigationProp<
  RootStackParamList,
  "Photo"
>;

const PhotoItem = ({ id, user, caption, file, isLiked, likes }: PhotoProps) => {
  const navigation: PhotoItemNavigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  const updateToggleLike = (cache: ApolloCache<any>, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked: (prev) => {
            return !prev;
          },
          likes: (prev) => {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikMutation] = useMutation<toggleLikeMutation>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        id,
      },
      update: updateToggleLike,
    }
  );

  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user?.username,
      id: user?.id,
    });
  };
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height / 3);
    });
  }, [file]);
  return (
    <Container>
      <Header onPress={() => goToProfile()}>
        <UserAvatar resizeMode="cover" source={{ uri: user?.avatar }} />
        <Username>{user?.username}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{
          width,
          height: imageHeight,
        }}
        source={{ uri: file }}
      />
      <Actions>
        <Action>
          <Ionicons
            onPress={() => toggleLikMutation()}
            name={isLiked ? "heart" : "heart-outline"}
            color={isLiked ? "tomato" : "white"}
            size={22}
          />
        </Action>
        <Action onPress={() => navigation.navigate("Comments")}>
          <Ionicons name="chatbubble-outline" color="white" size={22} />
        </Action>
      </Actions>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Likes", id ? { photoId: +id } : undefined)
        }
      >
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      </TouchableOpacity>
      <ExtraContainer>
        <Caption>
          <TouchableOpacity onPress={() => goToProfile()}>
            <Username>{user?.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
};

export default PhotoItem;
