import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { IUser } from "../interface";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

interface UseUser {
  me: IUser;
}

const useMe = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<UseUser>(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, []);

  return { data };
};

export default useMe;
