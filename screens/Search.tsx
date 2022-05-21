import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

const Search = ({ navigation }: NativeStackScreenProps<any, "Search">) => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text style={{ color: "white" }}>Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
