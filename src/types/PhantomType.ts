export type PhantomType<T, U extends string> = T & { [key in U]: never };
