import { RequiredByPath } from '.';
import { expectNotType, expectType, expectError, expectAssignable, expectNotAssignable } from 'tsd';
describe('test', () => {
  it('WTF? opened a ticket maybe they can explain', () => {
    //https://github.com/SamVerschueren/tsd/issues/141
    type T0 = RequiredByPath<{ a?: { b?: 1 } }, 'a.b'>

    expectNotType<T0>({a:{b:1}})
    expectType<T0>({a:{b:1}})

    expectNotAssignable<T0>({a:{b:1}})
    expectAssignable<T0>({a:{b:1}})


  })
  it('should make all properties required', () => {
    type T1 = RequiredByPath<{ a?: { b?: 1 } }, 'a.b'>
    expectNotType<T1>({});

    expectType<T1['a']['b']>(1)
    expectNotType<T1['a']['b']>(2)
    expectNotType<T1['a']['b']>(undefined)
    expectNotType<T1['a']['b']>(null)
  })

  it('should leave optional property option', () => {
    type T2 = RequiredByPath<{ a?: { b?: 1, c?: 1 } }, ['a.b']>

    expectAssignable<T2>({a:{b:1}})// a.c remains optional
    expectNotAssignable<T2>({a: {}})// missing a.b
    expectNotAssignable<T2>({a:{c:1}}) //missing a.b
  })

  it('multiple properties', () => {
      type T3 = RequiredByPath<{ a?: { b?: 1, c?: 2 }, d?: {e?: {f?: 4} }}, ['a.b', 'd']>

      expectAssignable<T3>({a: {b: 1}, d: {}})
      expectNotAssignable<T3>({a: {b: 1}}) // d is missing
  })

  it('multiple properties of same deep object', () => {
    type T4 = RequiredByPath<{ a?: { b?: number, c?: number }, d?: string}, ['a.b', 'a.c']>

    expectAssignable<T4>({a: {b: 1, c: 2}}) // d remains optional
    expectNotAssignable<T4>({a: {b: 1}})// a.c is missing
    expectNotAssignable<T4>({a: {b: 1, c: 2}, d: 3}) // typeof d should be string
  })

  it('cannot be null if required', () => {
    type T5 = RequiredByPath<{ a?: { b?: number | null }}, ['a.b']>
    expectNotAssignable<T5>({a: {b: null}}) // a.b can't be null
  })
})

