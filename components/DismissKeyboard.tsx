import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function DismissKeyboard({ children }: AuthLayoutProps) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
