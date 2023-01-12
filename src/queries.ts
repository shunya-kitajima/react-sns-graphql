import gql from 'graphql-tag'

export const CREATE_UER = gql`
  mutation ($username: String!, $passowrd: String!) {
    createUser(input: { username: $username, password: $password, email: "" }) {
      user {
        id
        username
      }
    }
  }
`
export const GET_TOKEN = gql`
  mutation ($username: String!, $passowrd: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`
