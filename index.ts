export type RequiredByPathSingle< T extends Record<keyof any, any>, S extends string > =
  S extends `${infer Head}.${infer Tail}` ?
    Head extends keyof Required<T> ?
      { [P in Head]: RequiredByPathSingle<Required<T>[P], Tail> } & Pick<T, Exclude<keyof T, Head>> :
      never :
    S extends keyof Required<T> ?
      { [P in S]-?: Exclude<T[P], null | undefined> } & Pick<T, Exclude<keyof T, S>> :
      never;

export type RequiredByPathMultiple<T extends Record<keyof any, any>, S extends string[]> =
  S extends [ infer Head, ...infer Tail ] ?
    Head extends string ?
      Tail extends string[] ?
        RequiredByPathSingle<T, Head> & RequiredByPathMultiple<T, Tail>
        : never
      : never
    : T;

export type RequiredByPath<T extends Record<keyof any, any>, S extends string[] | string> =
  S extends string ?
    RequiredByPathSingle<T, S> :
    S extends string[] ?
    RequiredByPathMultiple<T, S> :
  never;

// type T4 = RequiredByPath<{ a?: { b?: number, c?: number }, d?: string}, ['a.b', 'a.c']>
// let t: T4 = {a: {b: 1}}
// t.d
// t.a.c = false
