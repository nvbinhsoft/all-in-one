import {Primitives, ValueObject} from './value-object.base';

// export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] extends Primitives | Date ? O[K] : Expand<O[K]> } : never;

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K]  } : never;

