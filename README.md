<div align="center"><img width="200px" src="https://github.com/Philight/ts-nexstjs-repos/blob/main/client/public/assets/icons/github.svg"></div>
<h1 align="center">🗃️ GitHub repositories</h1>

> Querying and searching GitHub repositories by keywords

> Client & server caching

> Responsive Table view, sorting, filtering

>

Web application listing repositories from the open-source GitHub database. Query by keyword on the client and fetch results from Apollo Server. Results are stored in MongoDB for faster queries.

UI built with modern ShadCNUI + DaisyUI + Tailwind stack. Framer Motion for smooth animations. Next.js for SSR and SSG.

## 🧑‍💻 Tech Stack

### Frontend:

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [ShadCN UI](https://ui.shadcn.com/)
- [Daisy UI](https://daisyui.com/)
- [Redux (Toolkit)](https://redux-toolkit.js.org/)
- [TanStack Query](https://tanstack.com/query/v3/)
- [TanStack Table](https://tanstack.com/table/)
- [Framer Motion](https://www.framer.com/)

### Backend:

- [Nest.js](https://nestjs.com/)
- [GraphQL](https://graphql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Swagger](https://swagger.io/)
- [Passport JS](https://www.passportjs.org/)
- [Faker JS](https://fakerjs.dev/)

### Utilities:

- [Typescript](https://www.typescriptlang.org/)
- [PostCSS](https://postcss.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [GraphQLRequest](https://www.npmjs.com/package/@golevelup/nestjs-graphql-request)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

## API spec

Data is fetched from the open [GitHub GraphQL API](https://docs.github.com/en/graphql)

Endpoint for API -> https://api.github.com/graphql

> Resources used

- `search` -> https://docs.github.com/en/graphql/reference/queries#search
- `Repository` -> https://docs.github.com/en/graphql/reference/objects#repository
- `RepositoryOwner` -> https://docs.github.com/en/graphql/reference/interfaces#repositoryowner
- `Language` -> https://docs.github.com/en/graphql/reference/objects#language

## ⚙️ Configuration

#### Getting started

Run the following command on your local environment:

```shell
git clone --depth=1 https://github.com/Philight/ts-nexstjs-repos.git my-project-name
cd my-project-name
npm run install
```

> use `npm run install` instead of `npm install`

### Setting env variables

In `/server` directory

```bash
cd /server
```

rename `.env.example` to `.env` and change these environment variables:

```
DATABASE_URL=mongodb+srv://[db]:[pass]..
GITHUB_ACCESS_TOKEN_CLASSIC=token123..
```

- set connection url to MongoDB or keep the connection string as it is (public user with public read access is configured)

  > Feel free to change the database provider, Prisma is used as ORM

- set GitHub access token from Profile -> Settings -> Developer Settings -> Personal Access Tokens (https://github.com/settings/tokens)

#### Scope

```
repo
└── ✅ public_repo

```

In `/client` directory

```bash
cd /client
```

rename `.env.example` to `.env`

#### Folder structure

```
┌── package.json
├── next-env.d.ts
├── README.md
├── TODO.md
├── client
├	├──  package.json
├	├──  public
├	└──  src
└── server
	├──  package.json
	└──  src
```

Then, change to root directory you can run the project locally in development mode with live reload by executing:

```shell
npm run start

```

> starts both Nest.js (http://localhost:8080) server and Next.js (http://localhost:3333) apps concurrently
