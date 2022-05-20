import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { RefObject, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

interface LoginForm {
  username: string;
  password: string;
}

const LogIn: React.FC<NativeStackScreenProps<any, "Enter">> = ({
  navigation,
}) => {
  const { register, handleSubmit, setValue } = useForm<LoginForm>();
  const passwordRef: React.MutableRefObject<null> = useRef(null);
  const onNext = (nextOne: RefObject<HTMLInputElement>) => {
    nextOne.current?.focus();
  };

  const onValid = (data: LoginForm) => {
    console.log(data);
  };

  useEffect(() => {
    register("username");
    register("password");
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        autoCapitalize="none"
        placeholder="username"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />

      <TextInput
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
        disabled={false}
        onPress={handleSubmit(onValid)}
        text="Log In"
      />
    </AuthLayout>
  );
};

export default LogIn;
