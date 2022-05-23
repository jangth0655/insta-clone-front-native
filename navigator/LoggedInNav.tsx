import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";

const Stack = createNativeStackNavigator();

const LoggedInNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Stack.Screen name="Tabs" component={TabsNav} />
      <Stack.Screen name="Upload" component={UploadNav} />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
