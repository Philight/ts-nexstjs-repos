import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  // constructor(private readonly logger: Logger) {}
  constructor() {
    super();
  }

  // _initialize() {}
}
