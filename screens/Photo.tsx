import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";

const Photo = ({ navigation }: NativeStackScreenProps<any, "Photo">) => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Photo;
