import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import UploadForm from "../screens/UploadForm";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import { Ionicons } from "@expo/vector-icons";
import MessagesNav from "./MessagesNav";

const Stack = createNativeStackNavigator();

const LoggedInNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tabs"
        component={TabsNav}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Upload"
        component={UploadNav}
      />
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          title: "UploadForm",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
          headerLeft: ({ tintColor }) => (
            <Ionicons
              //onPress={() => navigation.navigate("Tabs")}
              color={tintColor}
              name="close"
              size={28}
            />
          ),
        }}
        name="UploadForm"
        component={UploadForm}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Messages"
        component={MessagesNav}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
