import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import useMe from "../../hooks/useMe";
import { IRoom } from "../../interface";
import {
  RootStackParamList,
  ScreenRootStackParamList,
} from "../../shared.type";

const RoomContainer = styled.TouchableOpacity`
  background-color: black;
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;

const Data = styled.View``;

const UnreadDot = styled.View`
  width: 10px;
  border-radius: 5px;
  height: 10px;
  background-color: ${(props) => props.theme.colors.blue};
`;

const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  color: white;
  margin-top: 2px;
  font-weight: 500;
`;

type RoomItemNavigation = NativeStackNavigationProp<
  ScreenRootStackParamList,
  "Room"
>;

const RoomItem = ({ unreadTotal, id, users }: IRoom) => {
  const { data: meData } = useMe();
  const navigation: RoomItemNavigation = useNavigation();
  const talkingTo = users.find((user) => user.username !== meData?.me.username);
  const goToRoom = () =>
    navigation.navigate("Room", {
      id,
      talkingTo,
    });

  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: talkingTo?.avatar }} />
        <Data>
          <Username>{talkingTo?.username}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
};

export default RoomItem;
