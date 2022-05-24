import { Camera, CameraProps, CameraType, FlashMode } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Action = styled.View`
  flex: 0.3;
  justify-content: space-around;
  align-items: center;
  padding: 0px 50px;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  opacity: 0.5;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background-color: rgba(255, 255, 255, 0.5);
`;
const SliderContainer = styled.View``;
const ActionsContainer = styled.View`
  flex-direction: row;
`;

const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;

const PhotoActionText = styled.Text`
  font-weight: 600;
`;

const TakePhoto = ({ navigation }: any) => {
  const camera = useRef(new Camera({}));
  const [takenPhoto, setTakenPhoto] = useState<any>("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [cameraType, setCameraType] = useState<any>(CameraType.back);
  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };

  useEffect(() => {
    getPermissions();
  }, []);
  const onCameraSwitch = () => {
    if (cameraType === CameraType.front) {
      setCameraType(CameraType.back);
    } else {
      setCameraType(CameraType.front);
    }
  };

  const onZumValueChange = (e: any) => {
    setZoom(e);
  };

  const onFlashChange = () => {
    if (flashMode === FlashMode.off) {
      setFlashMode(FlashMode.on);
    } else if (flashMode === FlashMode.on) {
      setFlashMode(FlashMode.auto);
    } else if (flashMode === FlashMode.auto) {
      setFlashMode(FlashMode.off);
    }
  };
  const goToUpload = async (save: any) => {
    if (save) {
      const asset = await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
  };
  const onUpload = () => {
    Alert.alert("Save Photo", "Save Photo & upload or just upload", [
      {
        text: "Save Upload",
        onPress: () => goToUpload(true),
      },
      {
        text: "Just Upload",
        onPress: () => goToUpload(false),
      },
    ]);
  };

  const onCameraReady = () => setCameraReady(true);
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };

  const onDismiss = () => setTakenPhoto("");
  return (
    <Container>
      <StatusBar hidden={true} />
      {takenPhoto === "" ? (
        <Camera
          ref={camera}
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          onCameraReady={onCameraReady}
        >
          <CloseButton onPress={() => navigation.navigate("Tabs")}>
            <Ionicons name="close" color="white" size={30} />
          </CloseButton>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {takenPhoto === "" ? (
        <Action>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255,255,255, 0.5)"
              onValueChange={onZumValueChange}
            />
          </SliderContainer>
          <ButtonContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashChange}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    flashMode === FlashMode.off
                      ? "flash-off"
                      : flashMode === FlashMode.on
                      ? "flash"
                      : flashMode === FlashMode.auto
                      ? "eye"
                      : ""
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons
                  color="white"
                  size={30}
                  name={
                    cameraType === CameraType.front
                      ? "camera-reverse"
                      : "camera"
                  }
                />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonContainer>
        </Action>
      ) : (
        <Action>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dismiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
          <PhotoAction>
            <PhotoActionText>Save & Upload</PhotoActionText>
          </PhotoAction>
        </Action>
      )}
    </Container>
  );
};

export default TakePhoto;
