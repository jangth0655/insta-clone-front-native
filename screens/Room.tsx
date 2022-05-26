import {
  ApolloCache,
  gql,
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  View,
} from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import { IMessage, IRoom } from "../interface";
import { ScreenRootStackParamList } from "../shared.type";
import { Ionicons } from "@expo/vector-icons";
import { MESSAGE_FRAGMENT } from "../fragment";
import { UpdateQueryFn } from "@apollo/client/core/watchQueryOptions";

const ROOM_UPDATE = gql`
  subscription roomUpdates($id: Int) {
    roomUpdates(id: $id) {
      ...MessageFragment
    }
  }
  ${MESSAGE_FRAGMENT}
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        payload
        users {
          username
          avatar
        }
        read
      }
    }
  }
`;

const MessageContainer = styled.View<{ outGoing?: boolean }>`
  padding: 0px 10px;
  flex-direction: ${(props) => (!props.outGoing ? "row-revers" : "row")};
  align-items: flex-end;
`;

const Author = styled.View`
  margin-right: 10px;
`;

const Avatar = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 25px;
`;

const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 16px;
  margin: 0 10px;
`;

const TextInput = styled.TextInput`
  border: 2px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  color: white;
  border-radius: 100px;
  width: 90%;
  margin-right: 10px;
`;

const InputContainer = styled.View`
  width: 95%;
  margin-bottom: 50px;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;

const SendButton = styled.TouchableOpacity``;

interface RoomQuery {
  seeRoom: IRoom;
}

interface MutationResponse {
  ok: boolean;
  id: number;
}

interface RoomForm {
  message: string;
}

interface RoomUpdate {
  roomUpdate: IMessage;
}

const Room = ({
  navigation,
  route,
}: NativeStackScreenProps<ScreenRootStackParamList, "Room">) => {
  useSubscription(ROOM_UPDATE);
  const { data: meData } = useMe();
  const { register, handleSubmit, setValue, getValues, reset, watch } =
    useForm<RoomForm>();
  const update = (cache: ApolloCache<any>, result: any) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && meData) {
      const { message } = getValues();
      const messageObj = {
        id,
        payload: message,
        users: {
          username: meData?.me.username,
          avatar: meData?.me.avatar,
        },
        read: true,
        __typename: "Message",
      };
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });
      cache.modify({
        id: `Room:${route?.params && route?.params.id}`,
        fields: {
          message: (prev) => {
            return [...prev, messageFragment];
          },
        },
      });
      reset();
    }
  };

  const [sendMessageMutation, { loading: sendMessageLoading }] =
    useMutation<MutationResponse>(SEND_MESSAGE_MUTATION, {
      update,
    });
  const { data, loading, subscribeToMore } = useQuery<RoomQuery>(ROOM_QUERY, {
    variables: {
      id: route?.params && route?.params.id,
    },
  });
  console.log(data);

  const client = useApolloClient();
  const updateQuery: UpdateQueryFn = (prevQuery, option: any) => {
    const {
      subscriptionData: {
        data: { roomUpdates: message },
      },
    } = option;
    if (message.id) {
      const messageFragment = client.cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            users {
              username
              avatar
            }
            read
          }
        `,
        data: message,
      });
      client.cache.modify({
        id: `Room:${route.params && route.params.id}`,
        fields: {
          messages: (prev: any[]) => {
            const existingMessage = prev.find(
              (aMessage) => aMessage.__ref === messageFragment?.__ref
            );
            if (existingMessage) {
              return prev;
            }
            return [...prev, messageFragment];
          },
        },
      });
    }
  };
  useEffect(() => {
    if (data?.seeRoom) {
      subscribeToMore({
        document: ROOM_UPDATE,
        variables: {
          id: route.params && route.params.id,
        },
        updateQuery: updateQuery,
      });
    }
  }, [data]);
  const onValid = ({ message }: RoomForm) => {
    if (sendMessageLoading) return;
    sendMessageMutation({
      variables: {
        payload: message,
        roomId: route.params && route.params.id,
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Conversation with ${
        route?.params && route?.params.talkingTo?.username
      }`,
    });
  }, []);

  useEffect(() => {
    register("message", { required: true });
  }, []);

  const renderItem: ListRenderItem<IMessage> = ({ item: message }) => (
    <MessageContainer
      outGoing={
        route?.params &&
        message.users.username !== route?.params.talkingTo?.username
      }
    >
      <Author>
        <Avatar source={{ uri: "" }} />
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );
  const messages = [...(data?.seeRoom?.messages ?? [])];
  messages.reverse();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%", paddingVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          data={messages}
          keyExtractor={(message) => "" + message.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <InputContainer>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            placeholder="Write a message..."
            returnKeyType="send"
            onChangeText={(text) => setValue("message", text)}
            onSubmitEditing={handleSubmit(onValid)}
          />
          <SendButton
            onPress={handleSubmit(onValid)}
            disabled={!Boolean(watch("message"))}
          >
            <Ionicons
              name="send"
              color={
                !Boolean(watch("message")) ? "rgba(255,255,255,0.5)" : "white"
              }
              size={22}
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
};

export default Room;
