import { gql, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { RefObject, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar, logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

interface LoginForm {
  username: string;
  password: string;
  result: any;
}

interface LoginMutation {
  ok: boolean;
  error?: string;
  token?: string;
}

const LogIn: React.FC<NativeStackScreenProps<any, "LogIn">> = ({ route }) => {
  const { register, handleSubmit, setValue, watch, getValues } =
    useForm<LoginForm>({
      defaultValues: {
        username: route?.params && route?.params?.username,
        password: route?.params && route?.params.password,
      },
    });
  const passwordRef: React.MutableRefObject<null> = useRef(null);
  const onNext = (nextOne: RefObject<HTMLInputElement>) => {
    nextOne.current?.focus();
  };

  const onCompleted = async (data: any) => {
    const { ok, token } = data.login;
    if (ok) {
      await logUserIn(token);
    }
  };

  const [logInMutation, { loading }] = useMutation<LoginMutation>(
    LOGIN_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = (data: LoginForm) => {
    if (loading) return;
    logInMutation({
      variables: {
        ...data,
      },
    });
  };

  useEffect(() => {
    register("username");
    register("password");
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        autoCapitalize="none"
        placeholder="username"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />

      <TextInput
        value={watch("password")}
        ref={passwordRef}
        onSubmitEditing={handleSubmit(onValid)}
        placeholder="Password"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
        text="Log In"
        loading={loading}
      />
    </AuthLayout>
  );
};

export default LogIn;
