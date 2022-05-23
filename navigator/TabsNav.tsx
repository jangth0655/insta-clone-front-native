import { useReactiveVar } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import useMe from "../hooks/useMe";
import ShareStackNav from "./ShareStackNav";

const Tabs = createBottomTabNavigator();

const TabsNav = () => {
  const { data } = useMe();
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopColor: "rgba(255,255,255,0.2)",
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="TabFeed"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} focused={focused} iconName="home" />
          ),
        }}
      >
        {() => <ShareStackNav screenName="Feed" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="TabSearch"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} focused={focused} iconName="search" />
          ),
        }}
      >
        {() => <ShareStackNav screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Camera"
        component={View}
        listeners={({ navigation, route }: NativeStackScreenProps<any>) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Upload");
          },
        })}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} focused={focused} iconName="camera" />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="TabNotification"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} focused={focused} iconName="heart" />
          ),
        }}
      >
        {() => <ShareStackNav screenName="Notification" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="TabMe"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me.avatar ? (
              <Image
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  ...(focused && { borderColor: "white", borderWidth: 1 }),
                }}
                source={{ uri: data?.me?.avatar }}
              />
            ) : (
              <TabIcon color={color} focused={focused} iconName="person" />
            ),
        }}
      >
        {() => <ShareStackNav screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default TabsNav;
