export type RequiredByPathSingle< T extends Record<keyof any, any>, S extends string > =
  S extends `${infer Head}.${infer Tail}` ?
    Head extends keyof T ?
      { [P in Head]: RequiredByPathSingle<Required<T>[P], Tail> } & Pick<T, Exclude<keyof T, Head>> :
      never :
    S extends keyof Required<T> ?
      { [P in S]-?: NonNullable<T[P]> } & Pick<T, Exclude<keyof T, S>> :
      never;

export type RequiredByPathMultiple<T extends Record<keyof any, any>, S extends string[]> =
  S extends {length: 1} ?
    RequiredByPathSingle<T, S[0]> :
    S extends [ infer Head, ...infer Tail ] ?
      Head extends string ?
        Tail extends string[] ?
          RequiredByPathSingle<T, Head> & RequiredByPathMultiple<T, Tail>
          : never
        : never
      : never;

export type RequiredByPath<T extends Record<keyof any, any>, S extends string[] | string> =
  S extends string ?
    RequiredByPathSingle<T, S> :
    S extends string[] ?
      RequiredByPathMultiple<T, S> :
      never;
