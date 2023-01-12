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

export const CREATE_PROFILE = gql`
  mutation {
    createProfile(input: {}) {
      profile {
        id
        userProp {
          username
        }
      }
    }
  }
`

export const GET_PROFILES = gql`
  query {
    allProfiles {
      edges {
        node {
          id
          userProf {
            id
            username
          }
          followings {
            edges {
              node {
                id
                username
              }
            }
          }
        }
      }
    }
  }
`

export const GET_MYPROFILE = gql`
  query {
    profile {
      id
      userProf {
        id
        username
        profilesFollowings {
          edges {
            node {
              userProf {
                id
                username
              }
            }
          }
        }
        followings {
          edges {
            node {
              id
              username
            }
          }
        }
      }
    }
  }
`
