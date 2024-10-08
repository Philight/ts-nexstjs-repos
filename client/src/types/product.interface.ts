import type { Category } from './category.interface';
import type { Review } from './review.interface';
import type { Pagination } from '@/types';
import type { WithPaginationResponse } from '@/types';
import type { User } from '@/types/user.interface';

export enum ProductSort {
  HighPrice = 'HIGHT_PRICE',
  LowPrice = 'LOW_PRICE',
  Newest = 'NEWEST',
  Popular = 'POPULAR',
  Rated = 'RATED',
  Oldest = 'OLDEST',
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  discountPercent: number;
  finalPrice: number;
  images: string[];
  quantity: number;
  ownerId: number;
  categories: Category[];
}

export interface Filter extends Pagination {
  sort?: ProductSort;
  term?: string;
  ids?: number[];
}

export interface UpdateProductData {
  name: string;
  description: string;
  price: number;
  quantity: number;
  weight: number;
  discountPercent?: number;
  images: string[];
  categories: number[];
}

export type UpdateProductDataErrors = Record<keyof UpdateProductData, string>;

export interface ProductFullest extends Product {
  owner: User;
  reviews: Review[];
}

export interface GetAllProductsResponse extends WithPaginationResponse {
  products: Product[];
}
