import { ApolloCache, gql, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { FEED_PHOTO } from "../fragment";
import { IPhoto } from "../interface";
import { ScreenRootStackParamList } from "../shared.type";
import { ReactNativeFile } from "apollo-upload-client";

const UPLOAD_PHOTO_MUTATION = gql`
  ${FEED_PHOTO}
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedFragment
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0 40px;
`;
const Photo = styled.Image`
  height: 250px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

interface IUploadForm {
  caption: string;
}

interface UploadFormMutation {
  uploadPhoto: IPhoto;
}

const UploadForm = ({
  route,
  navigation,
}: NativeStackScreenProps<ScreenRootStackParamList, "UploadForm">) => {
  const { register, handleSubmit, setValue } = useForm<IUploadForm>();
  const updateUploadPhoto = (cache: ApolloCache<any>, result: any) => {
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      cache.modify({
        id: `ROOT_QUERY`,
        fields: {
          seeFeed: (prev) => {
            return [...uploadPhoto, ...prev];
          },
        },
      });
      navigation.goBack();
      navigation.goBack();
    }
  };
  const file = route?.params && route?.params.file;
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );

  const [uploadPHotoMutation, { loading, data, error }] =
    useMutation<UploadFormMutation>(UPLOAD_PHOTO_MUTATION, {
      update: updateUploadPhoto,
    });

  useEffect(() => {
    register("caption");
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const onValid = ({ caption }: IUploadForm) => {
    if (route?.params && route?.params.file) {
      const file = new ReactNativeFile({
        uri: route?.params.file,
        name: `1.jpg`,
        type: "image/jpeg",
      });

      uploadPHotoMutation({
        variables: {
          caption,
          file: file.uri,
        },
      });
    } else {
      uploadPHotoMutation({
        variables: {
          caption,
        },
      });
    }
  };

  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMethod="auto" source={{ uri: file }} />
        <CaptionContainer>
          <Caption
            onChangeText={(text) => setValue("caption", text)}
            placeholder="Write a caption..."
            placeholderTextColor={"rgba(0,0,0, 0.5)"}
            onSubmitEditing={handleSubmit(onValid)}
            returnKeyType="done"
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default UploadForm;
