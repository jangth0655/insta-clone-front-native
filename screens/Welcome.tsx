import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const LoginLink = styled.Text`
  color: ${(props) => props.theme.colors.blue};
  font-weight: 600;
  margin-top: 20px;
`;

const Welcome: React.FC<NativeStackScreenProps<any, "Welcome">> = ({
  navigation,
}) => {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("LogIn");
  return (
    <AuthLayout>
      <AuthButton
        text="Create New Account"
        disabled={false}
        onPress={goToCreateAccount}
        loading={false}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default Welcome;
