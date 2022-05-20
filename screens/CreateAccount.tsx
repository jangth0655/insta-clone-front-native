import { gql, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { RefObject, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const CREATE_MUTATION = gql`
  mutation createAccount(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $username: String!
  ) {
    createAccount(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
    ) {
      ok
      error
    }
  }
`;

interface CreateAccountMutation {
  ok: boolean;
  error?: string;
}

interface CreateAccountForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const CreateAccount: React.FC<NativeStackScreenProps<any, "CreateAccount">> = ({
  navigation,
}) => {
  const { register, handleSubmit, setValue, getValues } =
    useForm<CreateAccountForm>();
  const lastNameRef: React.MutableRefObject<null> = useRef(null);
  const usernameRef: React.MutableRefObject<null> = useRef(null);
  const emailRef: React.MutableRefObject<null> = useRef(null);
  const passwordRef: React.MutableRefObject<null> = useRef(null);
  const onCompleted = (data: any) => {
    const { ok } = data.createAccount;
    if (ok) {
      navigation.navigate("LogIn", {
        username: getValues("username"),
        password: getValues("password"),
      });
    }
  };
  const [createAccountMutation, { loading }] =
    useMutation<CreateAccountMutation>(CREATE_MUTATION, {
      onCompleted,
    });
  const onNext = (nextOne: RefObject<HTMLInputElement>) => {
    nextOne.current?.focus();
  };

  const onValid = (data: CreateAccountForm) => {
    if (loading) return;
    createAccountMutation({
      variables: {
        ...data,
      },
    });
  };

  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true });
    register("username", { required: true });
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => setValue("firstName", text)}
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue("lastName", text)}
      />
      <TextInput
        autoCapitalize="none"
        ref={usernameRef}
        placeholder="username"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={"rgba(255,255,255, 0.8)"}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
        lastOne={true}
      />
      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onValid)}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
