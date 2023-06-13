import gql from "graphql-tag";

export const GET_REPO_BY_NAME = gql`
  query ($followRenames: Boolean, $name: String!, $owner: String!) {
    repository(followRenames: $followRenames, name: $name, owner: $owner) {
      name
      owner {
        login
        avatarUrl
        url
      }
      languages(first: 10) {
        nodes {
          color
          name
        }
      }
      openGraphImageUrl
      primaryLanguage {
        color
        name
      }
      resourcePath
      updatedAt
      url
      description
      descriptionHTML
      projectsUrl
      stargazerCount
    }
  }
`;
