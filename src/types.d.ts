type GenericFunction<T extends unknown[]> = (...args: readonly [...T]) => any;

type PropsOf<C extends (...args: any) => any> = Parameters<C>[0];

type Id = string | number;
