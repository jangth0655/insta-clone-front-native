import { gql, useQuery } from "@apollo/client";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import styled from "styled-components/native";
import RoomItem from "../components/rooms/RoomItem";
import ScreenLayout from "../components/ScreenLayout";
import { ROOM_FRAGMENT } from "../fragment";
import useMe from "../hooks/useMe";
import { IRoom } from "../interface";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomFragment
    }
  }
  ${ROOM_FRAGMENT}
`;

interface RoomsQuery {
  seeRooms: IRoom[];
}

const Rooms = () => {
  const { data, loading, error } = useQuery<RoomsQuery>(SEE_ROOMS_QUERY);
  const { data: meData } = useMe();

  console.log(data);
  console.log(error);

  const renderItem: ListRenderItem<IRoom> = ({ item: room }) => (
    <RoomItem {...room} />
  );
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
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
};

export default Rooms;
