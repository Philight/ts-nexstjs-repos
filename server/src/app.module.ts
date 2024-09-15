import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { LoggerService } from './components/common/services/logger.service';
import { ComplexityPlugin } from './components/common/plugins/complexity.plugin';
import { LoggingPlugin } from './components/common/plugins/logging.plugin';
// import { UserModule } from './components/user/user.module';
import { RepositoriesModule } from './components/repositories/repositories.module';
import { PaginationModule } from './components/pagination/pagination.module';

// ======================================================================

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // UserModule,
    RepositoriesModule,
    PaginationModule,
    PaginationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // GraphQL adapter
      driver: ApolloDriver,

      // GraphQL endpoint, implicitly '/graphql'
      // path: '/mygraphql',

      // GraphQL visualiser -> http://localhost:3000/graphql
      playground: true,

      // "Code-first" - autogenerate schema from Typescript
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,

      // "Schema-first" - create your own GraphQL SDL schema definition files
      // typePaths: ['./**/*.graphql'],
      //       definitions: {
      //   path: join(process.cwd(), 'src/graphql.ts'),
      // },

      // Typescript 'number' type conversion, default "Float"
      // buildSchemaOptions: {
      //   numberScalarMode: 'integer',
      // },

      debug: process.env.NODE_ENV === 'development' ? true : false,
      // context: ({ req }) => ({ req }),
    }),
    ///// Global GraphQL client doesn't work
    // GraphQLRequestModule.forRootAsync(GraphQLRequestModule, {
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     TESTING: () => {
    //       console.log(
    //         configService,
    //         configService.get('GITHUB_ACCESS_TOKEN_CLASSIC'),
    //       );
    //     },
    //     endpoint: configService.get('GITHUB_GRAPHQL_ENDPOINT'),
    //     options: {
    //       // method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${configService.get(
    //           'GITHUB_ACCESS_TOKEN_CLASSIC',
    //         )}`,
    //       },
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    /////
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    LoggerService,
    ComplexityPlugin,
    LoggingPlugin,
  ],
})
export class AppModule {}
