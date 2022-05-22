import { gql, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RefreshControl, ScrollView } from "react-native";
import { PHOTO_FRAGMENT } from "../fragment";
import { ScreenRootStackParamList } from "../shared.type";
import { IPhoto } from "../interface";
import PhotoItem from "../components/PhotoItem";
import ScreenLayout from "../components/ScreenLayout";
import { useState } from "react";

const SEE_PHOTO = gql`
  ${PHOTO_FRAGMENT}
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
    }
  }
`;

interface SeePhotoQuery {
  seePhoto: IPhoto;
}

const PhotoScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<ScreenRootStackParamList, "Photo">) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery<SeePhotoQuery>(SEE_PHOTO, {
    variables: {
      id: route?.params?.photoId,
    },
  });
  const onRefresh = async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "black" }}
        contentContainerStyle={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PhotoItem {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  );
};

export default PhotoScreen;
