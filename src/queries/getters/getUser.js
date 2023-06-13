import gql from "graphql-tag";

export const GET_USER = gql`
  query ($login: String!) {
    user(login: $login) {
      avatarUrl
      email
      name
      projects(first: 100) {
        nodes {
          name
        }
        totalCount
      }
      projectsUrl
      repositories(first: 100) {
        nodes {
          name
          createdAt
          description 
          sshUrl
          stargazerCount
          updatedAt
          url
          labels(first: 100) {
            nodes {
              color
              createdAt 
              description
              name
              updatedAt
            }
          }
          owner {
            login
          }
        }
        totalCount
      }
    }
  }
`;