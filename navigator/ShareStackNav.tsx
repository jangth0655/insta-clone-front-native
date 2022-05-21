import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Image } from "react-native";
import Comments from "../screens/Comments";
import Feed from "../screens/Feed";
import Likes from "../screens/Likes";
import Me from "../screens/Me";
import Notification from "../screens/Notifications";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const Stack = createNativeStackNavigator();

type ScreenName = "Feed" | "Search" | "Notification" | "Me";

interface ShareStackNavProps {
  screenName: ScreenName;
  [key: string]: any;
}

type RootStackParamList = {
  Detail:
    | typeof Feed
    | typeof Me
    | typeof Notification
    | typeof Search
    | typeof Profile
    | typeof Photo
    | typeof Comments;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const ShareStackNav = ({ screenName }: ShareStackNavProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  maxHeight: 30,
                }}
                resizeMode="contain"
                source={require("../assets/favicon.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Notification" ? (
        <Stack.Screen name="Notification" component={Notification} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

export default ShareStackNav;
