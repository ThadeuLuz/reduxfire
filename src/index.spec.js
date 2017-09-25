import firebase from 'firebase';

import { setDispatch, bindAsArray, bindAsObject, unbind } from './index';

const config = {
  apiKey: 'AIzaSyAUp5E2n1BhqYDeRsSqXvs9X90LVGFz5mY',
  databaseURL: 'https://redfire-3a130.firebaseio.com',
  projectId: 'redfire-3a130',
};

firebase.initializeApp(config);
const ref = firebase
  .database()
  .ref('tests')
  .push();

describe('bindAsArray(), bindAsObject() and unbind()', () => {
  it('should throw when missing bind variable', () => {
    [bindAsArray, bindAsObject, unbind].forEach(fn => expect(() => fn()).toThrow());
  });
});

setDispatch();

describe('', () => {});
