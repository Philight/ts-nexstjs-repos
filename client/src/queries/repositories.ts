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
  query ($name: String, $page: Float, $perPage: Float) {
    getRepositories(name: $name, page: $page, perPage: $perPage) {
    	${REPOSITORY_FIELDS}
    }
  }
`;
