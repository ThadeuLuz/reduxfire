import firebase from 'firebase';

import {
  setDispatch,
  bindAsArray,
  bindAsObject,
  unbind,
} from '../src/index';

const config = {
  apiKey: 'AIzaSyAUp5E2n1BhqYDeRsSqXvs9X90LVGFz5mY',
  databaseURL: 'https://redfire-3a130.firebaseio.com',
  projectId: 'redfire-3a130',
};

firebase.initializeApp(config);
const ref = firebase.database().ref('tests').push();

describe('bindAsArray(), bindAsObject() and unbind()', () => {
  it('should throw when missing bind variable', () => {
    const err = new Error('ReduxFire: Bind variable must be a string. Got: undefined');
    expect(() => { bindAsArray(); }).toThrow(err);
    expect(() => { bindAsObject(); }).toThrow(err);
    expect(() => { unbind(); }).toThrow(err);
  });
});

describe('', () => {

});
it('should throw when missing bind variable', () => {
  const err = new Error('ReduxFire: Bind variable must be a string. Got: undefined');
  expect(() => { bindAsArray(); }).toThrow(err);
  expect(() => { bindAsObject(); }).toThrow(err);
});

