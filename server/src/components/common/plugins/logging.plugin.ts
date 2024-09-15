import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  constructor(
    private logger: LoggerService, // LOGGER INITIALIZING WITH CONTEXT
  ) {
    this.logger = new Logger('ApolloWatcher'); // LOGGER INITIALIZING WITH CONTEXT
  }

  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    this.logger.log(`Request started`);

    const _this = this;
    return {
      async willSendResponse() {
        _this.logger.log(`Will send response`);
      },
    };
  }
}
