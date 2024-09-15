import { Module } from '@nestjs/common';

import { RepositoriesService } from './repositories.service';
import { RepositoriesResolver } from './repositories.resolver';
import { PrismaService } from '../../prisma.service';
import { PaginationService } from '../pagination/pagination.service';

import { GithubModule } from '../github/github.module';

// ========================================================================

@Module({
  imports: [GithubModule],
  providers: [
    RepositoriesService,
    RepositoriesResolver,
    PrismaService,
    PaginationService,
  ],
  exports: [RepositoriesService],
})
export class RepositoriesModule {}
