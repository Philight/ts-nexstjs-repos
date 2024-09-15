import {
  INestApplication,
  Injectable,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(PrismaService.name); // LOGGER INITIALIZING WITH CONTEXT

  constructor() {
    super({
      // PRISMA LOGGING OPTIONS
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      // errorFormat: 'colorless', // Default
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log(`Prisma connected.`);

    this.$on<any>('query', (event: Prisma.QueryEvent) => {
      this.logger.debug(`// ----------------------------------`);
      this.logger.debug(`Running DB query..`);
      this.logger.verbose(`Query: 
        ${JSON.stringify(event.query, null, 2)}`);
      this.logger.verbose(`Params: ${JSON.stringify(event.params, null, 2)}`);
      this.logger.debug(`Duration: ${event.duration} ms`);
      this.logger.debug(`// ----------------------------------`);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      this.logger.log(`Prisma closing connection..`);
      await app.close();
    });
  }
}
