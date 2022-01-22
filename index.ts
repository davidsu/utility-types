import {FilterByStart, MapToPathTail, UnionFirst} from "./helpers";

type Id<S> = S extends string ? S : never
type MapFilterToTail<T extends string[], S> = MapToPathTail<FilterByStart<T, `${Id<S>}.`>>
type RBP<T extends Record<string, any>, S extends string[]> =
    S extends {length: 0} ?
      NonNullable<T> :
      Pick<T, Exclude<keyof T, UnionFirst<S>>> &
      { [P in Extract<keyof T, UnionFirst<S>>]: RBP<Required<T>[P], MapFilterToTail<S, P>> }

export type RequiredByPath<T extends Record<keyof any, any>, S extends string[] | string> =
    S extends string[] ?
      RBP<T, S> :
      RBP<T, [Id<S>]> 
