import gql from "graphql-tag";

export const GET_REPO_BY_SEARCH = gql`
  query (
    $after: String
    $before: String
    $first: Int
    $last: Int
    $query: String!
    $type: SearchType!
  ) {
    search(
      after: $after
      before: $before
      first: $first
      last: $last
      query: $query
      type: $type
    ) {
      codeCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        ... on Repository {
          name
          createdAt
          description 
          sshUrl
          stargazerCount
          updatedAt
          url
          owner {
            login
          }
        }
      }
      repositoryCount
    }
  }
`;