import gql from "graphql-tag";

export const GET_REPO = gql`
  query ($followRenames: Boolean, $name: String!, $owner: String!) {
    repository(followRenames: $followRenames, name: $name, owner: $owner) {
        description
        projectsUrl
    }
  }
`;