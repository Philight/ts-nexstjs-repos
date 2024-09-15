declare global {
  interface Array<T> {
    css(): string;
    sortAsc(): Array<T>;
    sortDesc(): Array<T>;
    sortNested({ _property, _order }: { property: string; order?: 'asc' | 'desc' }): Array<T>;
    removeItem(_value): Array<T>;
  }
  interface String {
    removeWhitespace(): string;
  }
}

export {};
