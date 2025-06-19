import { gql } from "@apollo/client";
import client from "../graphql/client";


const SIGNUP_MUTATION = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`;



export async function signup(name, email, password) {
  try {
    const response = await client.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { name, email, password },
    });

    return response.data.signup;
  } catch (error) {
    console.error("Signup Error:", error);
    return null;
  }
}


export async function signin(email, password) {
  try {
    const response = await client.mutate({
      mutation: SIGNIN_MUTATION,
      variables: { email, password },
    });

    const token = response.data.signin;
    
    if (token) {
      localStorage.setItem("token", token);  
    }

    console.log("Token stored in localStorage:", localStorage.getItem("token"));
    return token;
  } catch (error) {
    console.error("Signin Error:", error);
    return null;
  }
}



