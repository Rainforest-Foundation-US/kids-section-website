type GenericFunction<T extends unknown[]> = (...args: readonly [...T]) => any;
