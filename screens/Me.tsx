import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Text, View } from "react-native";
import useMe from "../hooks/useMe";
import { ScreenRootStackParamList } from "../shared.type";

const Me = ({
  navigation,
}: NativeStackScreenProps<ScreenRootStackParamList, "Me">) => {
  const { data } = useMe();

  useEffect(() => {
    navigation.setOptions({
      title: data?.me.username,
    });
  }, []);

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <Text style={{ color: "white" }}>Hello</Text>
    </View>
  );
};

export default Me;
