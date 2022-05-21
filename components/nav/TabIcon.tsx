import { Ionicons } from "@expo/vector-icons";

interface TabIconProps {
  iconName: IconName;
  focused: boolean;
  color: string;
}

type IconName = "home" | "search" | "camera" | "heart" | "person";

const TabIcon = ({ iconName, color, focused }: TabIconProps) => {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={focused ? 24 : 20}
    />
  );
};

export default TabIcon;
