import { gql, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PhotoItem from "../components/PhotoItem";

import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragment";
import { SeeFeedItem, SeeFeedItems } from "../interface";

const FEED_QUERY = gql`
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
`;

const Feed = ({ navigation }: NativeStackScreenProps<any, "Feed">) => {
  const { data, loading, refetch, fetchMore } = useQuery<SeeFeedItems>(
    FEED_QUERY,
    {
      variables: {
        offset: 0,
      },
    }
  );

  const renderPhoto: ListRenderItem<SeeFeedItem> = ({ item }) => {
    return <PhotoItem {...item} />;
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
};

export default Feed;
