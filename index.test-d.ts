import { RequiredByPath } from '.';
import { expectNotType, expectType, expectError, expectAssignable, expectNotAssignable } from 'tsd';
import {Alike, Debug, Expect, MergeInsertions} from '@type-challenges/utils'
describe('test', () => {
  it('WTF? opened a ticket maybe they can explain', () => {
    //https://github.com/SamVerschueren/tsd/issues/141
    type T01 = RequiredByPath<{ a?: { b?: 1 } }, 'a.b'>
    type Case = Expect<Alike<T01, {a: {b: 1}}>>

    expectNotType<T01>({a:{b:1}})
    expectType<T01>({a:{b:1}})

    expectNotAssignable<T01>({a:{b:1}})
    expectAssignable<T01>({a:{b:1}})
  })

  it('check that resulting object has the proper properties using @type-callenges since tsd does not work here', () => {
    type T0 = RequiredByPath<{ a?: { b?: 1 } }, 'a.b'>
    type Case = Expect<Alike<T0, {a: {b: 1}}>>
  })

  it('should make all properties required', () => {
    type T1 = RequiredByPath<{ a?: { b?: 1 } }, 'a.b'>
    type Case = Expect<Alike<T1, {a: {b: 1}}>>
    expectNotType<T1>({});

    expectType<T1['a']['b']>(1)
    expectNotType<T1['a']['b']>(2)
    expectNotType<T1['a']['b']>(undefined)
    expectNotType<T1['a']['b']>(null)

  })

  it('should leave optional property option', () => {
    type T2 = RequiredByPath<{ a?: { b?: 1, c?: 1 } }, ['a.b']>
    type Case = Expect<Alike<T2, {a: {b: 1, c?: 1}}>>

    expectAssignable<T2>({a:{b:1}})// a.c remains optional
    expectNotAssignable<T2>({a: {}})// missing a.b
    expectNotAssignable<T2>({a:{c:1}}) //missing a.b
  })

  it('multiple properties', () => {
      type T3 = RequiredByPath<{ a?: { b?: 1, c?: 2 }, d?: {e?: {f?: 4} }}, ['a.b', 'd']>
      type Case = Expect<Alike<T3, {a: {b: 1, c?: 2}, d: {e?: {f?: 4} }}>>

      expectAssignable<T3>({a: {b: 1}, d: {}})
      expectNotAssignable<T3>({a: {b: 1}}) // d is missing
  })

  it('multiple properties of same deep object', () => {
    type T4 = RequiredByPath<{ a?: { b?: number, c?: number }, d?: string}, ['a.b', 'a.c']>
    type Case = Expect<Alike<T4, {a: {b: number, c: number}, d?: string}>>

    expectAssignable<T4>({a: {b: 1, c: 2}}) // d remains optional
    expectNotAssignable<T4>({a: {b: 1}})// a.c is missing
    expectNotAssignable<T4>({a: {b: 1, c: 2}, d: 3}) // typeof d should be string
  })

  it('cannot be null if required', () => {
    type T5 = RequiredByPath<{ a?: { b?: number | null }}, ['a.b']>
    type Case = Expect<Alike<T5, {a: {b: number }}>>

    expectNotAssignable<T5>({a: {b: null}}) // a.b can't be null
  })
})

