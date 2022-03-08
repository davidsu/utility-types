type Id<T> = T extends string[] ? T : []
type First<T extends string> = 
  T extends `${infer Head}.${infer Tail}` ?
    Head :
    T

type Path<T extends string> = 
  T extends `${infer Head}.${infer Tail}` ?
    Tail :
    T

type ArrToUnion<T extends any[]> = 
  T extends {length: 1} ?
    T[0] :
    T extends [infer Head, ...infer Tail] ?
      Head | ArrToUnion<Tail> :
      never

type ArrFirst<T extends string[], Result extends string[] = []> = 
  T extends [infer Head, ...infer Tail] ?
    Head extends string ?
      Tail extends string[] ?
        ArrFirst<Tail, [First<Head>, ...Result]> :
        never :
      never :
    Result

export type UnionFirst<T extends string[]> = ArrToUnion<ArrFirst<T>>

export type FilterByStart<T extends string[], S extends string, Result extends string[] = []> = 
  T extends [infer Head, ...infer Tail] ?
    Head extends `${S}${infer Path}`?
      FilterByStart<Id<Tail>, S, [Head, ...Result]> :
      FilterByStart<Id<Tail>, S, Result> :
    Result

export type MapToPathTail<T extends string[], Result extends string[] = []> = 
  T extends [infer Head, ...infer Tail] ?
    Head extends `${infer S}.${infer Path}` ?
      MapToPathTail<Id<Tail>, [Path, ...Result]> :
      MapToPathTail<Id<Tail>, Result> :
    Result 

