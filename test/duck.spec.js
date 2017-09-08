import {
  UPDATE_VALUE,
  updateValue,
} from '../src/duck';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const expectedAction = {
      type: UPDATE_VALUE,
      payload: { bindVar: 'bindVar', snap: 'snap' },
    };
    expect(updateValue('bindVar', 'snap')).toEqual(expectedAction);
  });
});
