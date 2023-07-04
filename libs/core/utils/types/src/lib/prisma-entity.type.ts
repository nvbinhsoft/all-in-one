export type PrismaEntity<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
