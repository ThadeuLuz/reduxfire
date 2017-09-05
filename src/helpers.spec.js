/* global expect, describe, it */
import deepFreeze from 'deep-freeze';

import {
  throwError,
  getKey,
  set,
  get,
  findKeyIndex,
  addItem,
  removeItem,
  replaceItem,
} from './helpers';

const lib = {
  invalidFirebaseRefs: [null, undefined, true, false, [], 0, 5, '', 'a', ['hi', 1]],
  invalidBindVars: ['', 1, true, false, [], {}, [1, 2], { a: 1 }, null, undefined, 'te$st', 'te[st', 'te]st', 'te#st', 'te/st', 'a#i]$da[s', 'te/nst', 'te/rst', 'te/u0000st', 'te/u0015st', 'te/007Fst', Array(800).join('a')],
  simpleObject: { a: 1, b: 2 },
  nedtedObject: { a: { b: { c: 1 } } },
  simpleArray: [
    { '.key': 'myKey', '.value': 'myValue' },
    { '.key': 'myOtherKey', '.value': 'myOtherValue' },
  ],
};

deepFreeze(lib);

it('Lib should not be mutatable', () => {
  expect(() => { lib.simpleArray.push(1); }).toThrow();
});

describe('Given the helper functions,', () => {
  describe('throwError()', () => {
    it('should throw an Error', () => {
      expect(() => { throwError('error'); }).toThrow();
    });
  });
});

describe('Given the firebase functions,', () => {
  describe('getKey()', () => {
    it('should return a key on old syntax', () => {
      expect(getKey({ key: 'value' })).toBe('value');
    });
    it('should return a key on new syntax', () => {
      expect(getKey({ key: () => 'value' })).toBe('value');
    });
  });
});

describe('Given the object functions,', () => {
  it('set() should return an object with nested keys', () => {
    expect(set(lib.simpleObject, 'a.b.c', 1)).toEqual({ b: 2, a: { b: { c: 1 } } });
  });

  it('get() should return the nested value', () => {
    expect(get(lib.nedtedObject, 'a.b.c')).toBe(1);
  });
});

describe('Given the array functions,', () => {
  it('findKeyIndex() should return the index of key', () => {
    expect(findKeyIndex(lib.simpleArray, 'myOtherKey')).toBe(1);
  });

  it('addItem() should add a new item', () => {
    const newArray = addItem(lib.simpleArray, lib.simpleObject);
    expect(newArray[0]).toBe(lib.simpleObject);
    expect(newArray.length).toBe(lib.simpleArray.length + 1);
  });

  it('replaceItem() should replace the item in array', () => {
    const newArray = replaceItem(lib.simpleArray, 1, lib.simpleObject);
    expect(newArray[1]).toBe(lib.simpleObject);
    expect(newArray.length).toBe(lib.simpleArray.length);
  });

  it('removeItem() should remove the item at the index', () => {
    const newArray = removeItem(lib.simpleArray, 1);
    expect(newArray.length).toBe(lib.simpleArray.length - 1);
  });
});

