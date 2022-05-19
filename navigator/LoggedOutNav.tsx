import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "../screens/CreateAccount";
import LogIn from "../screens/LogIn";
import Welcome from "../screens/Welcome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

type RootStackParamList = {
  Enter: typeof Welcome | typeof LogIn | typeof CreateAccount;
};

type EnterScreenProps = NativeStackScreenProps<RootStackParamList, "Enter">;

const Stack = createNativeStackNavigator();

const LoggedOutNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={Welcome}
      ></Stack.Screen>
      <Stack.Screen name="LogIn" component={LogIn}></Stack.Screen>
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default LoggedOutNav;
