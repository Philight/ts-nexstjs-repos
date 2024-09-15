export const REPOSITORY_FIELDS = `
  id
  name
  description
  descriptionHTML
  url
  homepageUrl
  openGraphImageUrl
  owner {
    id
    login
    url
    avatarUrl
  }
  stargazerCount
  primaryLanguage {
    id
    name
    color
  }
  isArchived
  isBlankIssuesEnabled
  isDisabled
  isEmpty
  isFork
  isInOrganization
  isPrivate
  isTemplate
`;

export const QUERY_REPOSITORIES = `
 query SearchRepositories($query: String!, $fromCursor: String, $count: Int!, ) {
   search(query: $query, first: $count, after: $fromCursor, type: REPOSITORY) {
     nodes {
       ... on Repository {
         ${REPOSITORY_FIELDS}
       }
     }
     edges {
       cursor
       node {
         ... on Repository {
           id
           name
         }
       }
     }
     repositoryCount
     pageInfo {
       endCursor
       hasNextPage
       hasPreviousPage
       startCursor
     }
   }
 }
`;
