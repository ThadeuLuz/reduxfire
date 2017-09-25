import firebase from 'firebase';
import { UPDATE_VALUE } from './duck';
import { setDispatch, bindAsArray, bindAsObject, unbind, isBound } from './index';

const config = {
  apiKey: 'AIzaSyAUp5E2n1BhqYDeRsSqXvs9X90LVGFz5mY',
  databaseURL: 'https://redfire-3a130.firebaseio.com',
  projectId: 'redfire-3a130',
};

firebase.initializeApp(config);
const ref = firebase.database().ref('tests');

// Errors
const setDispatchErr = new Error("ReduxFire: You have to call 'setDispatch(store.dispatch)' before calling 'unbind', 'bindAsArray' or 'bindAsObject'");
const missingBindVarErr = new Error('ReduxFire: Bind variable must be a string. Got: undefined');

describe('bindAsArray(), bindAsObject() and unbind()', () => {
  it('should throw if called before setDispatch', () => {
    [bindAsArray, bindAsObject, unbind].forEach(fn => expect(() => fn()).toThrow(setDispatchErr));
  });
});

// setDispatch(() => {});

describe('setDispatch()', () => {
  it('should work', () => {
    expect(() => {
      setDispatch(() => {});
    }).not.toThrow();
  });
});

describe('bindAsObject()', () => {
  it('should throw when missing bind Variable', () => {
    expect(() => {
      bindAsObject();
    }).toThrow(missingBindVarErr);
  });

  it('should dispatch the UPDATE_VALUE action', () =>
    new Promise((resolve) => {
      setDispatch((action) => {
        expect(action.type).toBe(UPDATE_VALUE);
        expect(action.payload.bindVar).toBe('bindAsObject');
        expect(action.payload.snap).toBeTruthy();
        resolve();
      });

      bindAsObject(ref, 'bindAsObject');
    }));
});

describe('bindAsArray()', () => {
  it('should throw when missing bind Variable', () => {
    expect(() => {
      bindAsArray();
    }).toThrow(missingBindVarErr);
  });

  it('should dispatch the UPDATE_VALUE action', () =>
    new Promise((resolve) => {
      setDispatch((action) => {
        expect(action.type).toBe(UPDATE_VALUE);
        expect(action.payload.bindVar).toBe('bindAsArray');
        expect(action.payload.snap).toBeTruthy();
        resolve();
      });

      bindAsObject(ref, 'bindAsArray');
    }));
});

describe('unbind()', () => {
  it('should throw when missing bind Variable', () => {
    expect(() => {
      unbind();
    }).toThrow();
  });
  it('should throw if callback is not a function', () => {});
});

describe('isBound()', () => {
  it('should throw when missing bind Variable', () => {
    expect(() => {
      isBound();
    }).toThrow();
  });

  it('should return true for bindAsObject', () => {
    expect(isBound('bindAsObject')).toBe(true);
  });

  it('should return true for bindAsArray', () => {
    expect(isBound('bindAsArray')).toBe(true);
  });

  it('should return false for unbound bindVar', () => {
    expect(isBound('unbound')).toBe(false);
  });
});
