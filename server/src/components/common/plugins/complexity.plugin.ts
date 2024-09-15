import { Plugin } from '@nestjs/apollo';
import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../services/logger.service';

// ================================================================

// const

// ================================================================

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  // private logger = new Logger(ComplexityPlugin.name); // LOGGER INITIALIZING WITH CONTEXT

  constructor(
    private readonly configService: ConfigService,
    private gqlSchemaHost: GraphQLSchemaHost,
    private logger: LoggerService, // LOGGER INITIALIZING WITH CONTEXT
  ) {
    this.logger = new Logger(this.constructor.name); // LOGGER INITIALIZING WITH CONTEXT
  }

  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    const { schema } = this.gqlSchemaHost;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    const MAX_COMPLEXITY = _this.configService.get('MAX_GRAPHQL_COMPLEXITY');

    return {
      async didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });

        _this.logger.log(`Query Complexity: ${complexity}`);

        if (complexity >= MAX_COMPLEXITY) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: 20`,
          );
        }
      },
    };
  }
}
