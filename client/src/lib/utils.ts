import { isAxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const rejectAxios = (err: unknown) => {
  if (isAxiosError(err) && err.response) {
    return err.response.data;
  }
  throw err;
};

export const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
};

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(key, value);
  }
};

export const getStringFromQuery = (slug: string | string[] | undefined) => {
  return typeof slug === 'string' ? slug : Array.isArray(slug) ? slug[0] : '';
};

export const makeDiscount = (price: number, discountPercent: number) => {
  return price - (price * discountPercent) / 100;
};
