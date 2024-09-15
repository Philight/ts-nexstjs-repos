import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { GraphQLRequestModule } from '@golevelup/nestjs-graphql-request';

import { GithubService } from './github.service';

// ========================================================================

@Module({
  imports: [
    GraphQLRequestModule.forRootAsync(GraphQLRequestModule, {
      // Exposes configuration options based on the graphql-request package
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        TESTING: () => {
          console.log(
            configService,
            configService.get('GITHUB_ACCESS_TOKEN_CLASSIC'),
          );
        },
        endpoint: configService.get('GITHUB_GRAPHQL_ENDPOINT'),
        options: {
          // method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${configService.get(
              'GITHUB_ACCESS_TOKEN_CLASSIC',
            )}`,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
