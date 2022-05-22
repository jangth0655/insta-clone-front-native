import { gql, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";
import { USER_FRAGMENT } from "../fragment";
import { IUser } from "../interface";

const LIKES_QUERY = gql`
  ${USER_FRAGMENT}
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
`;

interface LikesQuery {
  seePhotoLikes: IUser[];
}

const Likes = ({ route }: NativeStackScreenProps<any>) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery<LikesQuery>(LIKES_QUERY, {
    variables: {
      id: route?.params?.photoId,
    },
    skip: !route?.params?.photoId,
  });

  const renderUser: ListRenderItem<IUser> = ({ item }) => (
    <UserRow
      avatar={item.avatar}
      username={item.username}
      isFollowing={item.isFollowing}
      isMe={item.isMe}
      id={item.id}
    />
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          ></View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoLikes}
        keyExtractor={(item) => "" + item.id}
        style={{ width: "100%" }}
        renderItem={renderUser}
      />
    </ScreenLayout>
  );
};

export default Likes;
