import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 100px;
`;

const CreateAccount = styled.View`
  background-color: ${(props) => props.theme.colors.blue};
  padding: 7px 10px;
  border-radius: 5px;
`;

const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const LoginLink = styled.Text`
  color: ${(props) => props.theme.colors.blue};
  font-weight: 600;
  margin-top: 10px;
`;

const Welcome: React.FC<NativeStackScreenProps<any, "Enter">> = ({
  navigation,
}) => {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("LogIn");
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/favicon.png")} />

      <TouchableOpacity onPress={goToCreateAccount}>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </Container>
  );
};

export default Welcome;