import { View, Text, TouchableOpacity } from "react-native";

const LogIn = ({ navigation }: any) => {
  return (
    <View>
      <Text>LogIn</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <Text>Go to Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogIn;
