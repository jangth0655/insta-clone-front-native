import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { Ionicons } from "@expo/vector-icons";
import { ScreenRootStackParamList } from "../shared.type";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const UploadNav = ({ navigation, route }: NativeStackScreenProps<any>) => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white", top: 0 },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerStyle: { backgroundColor: "black" },
              headerBackTitleVisible: false,
              headerLeft: ({ tintColor }) => (
                <Ionicons
                  onPress={() => navigation.navigate("Tabs")}
                  color={tintColor}
                  name="close"
                  size={28}
                />
              ),
              //headerRight:{}
            }}
          >
            <Stack.Screen
              name="StackSelect"
              component={SelectPhoto}
              options={{ title: "Choose a photo" }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
};

export default UploadNav;
