import { IsOptional, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class QueryDto {
  @IsString()
  @IsNotEmpty()
  readonly searchTerm: string;

  @IsString()
  @IsOptional()
  readonly sort?: string;

  @IsInt({ message: 'Count perPage must be an integer value' })
  @IsOptional()
  readonly perPage?: number;

  @IsString()
  @IsOptional()
  readonly startingFromCursor?: string;
}

export class QueryResultDto {
  @IsNotEmpty()
  readonly search: QueryResultSearchDto;

  @IsString()
  @IsNotEmpty()
  readonly searchTerm: string;

  @IsString()
  @IsOptional()
  readonly sort?: string;

  @IsInt({ message: 'Count perPage must be an integer value' })
  @IsOptional()
  readonly perPage?: number;

  @IsString()
  @IsOptional()
  readonly startingFromCursor?: string;
}

class QueryResultSearchDto {
  readonly nodes: unknown[];
  readonly edges: QueryResultEdgesDto;

  @IsInt()
  readonly repositoryCount: number;

  readonly pageInfo: QueryResultPaginationDto;
}

class QueryResultEdgesDto {
  @IsString()
  @IsNotEmpty()
  readonly cursor: string;

  readonly node: QueryResultNodeDto;
}

class QueryResultPaginationDto {
  @IsString()
  readonly endCursor: string;

  readonly hasNextPage: boolean;

  readonly hasPreviousPage: boolean;

  @IsString()
  readonly startCursor: string;
}

export class QueryResultNodeDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
