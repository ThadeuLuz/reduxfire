import reducer, {
  UPDATE_VALUE,
  REMOVE_VALUE,
  ADD_ARRAY_ITEM,
  UPDATE_ARRAY_ITEM,
  REMOVE_ARRAY_ITEM,
  updateValue,
  removeValue,
  addArrayItem,
  updateArrayItem,
  removeArrayItem,
} from './duck';


//
// Action Creators
// -----------------------------------------------------------------------------


describe('updateValue()', () => {
  const action = updateValue('bindVar', 'snap');
  it('should return an action of type UPDATE_VALUE', () => {
    expect(action.type).toEqual(UPDATE_VALUE);
  });

  it('should return an action with the correct bindVar in the payload', () => {
    expect(action.payload.bindVar).toEqual('bindVar');
  });

  it('should return an action with the correct snap in the payload', () => {
    expect(action.payload.snap).toEqual('snap');
  });
});

describe('removeValue()', () => {
  const action = removeValue('bindVar', 'snap');
  it('should return an action of type REMOVE_VALUE', () => {
    expect(action.type).toEqual(REMOVE_VALUE);
  });

  it('should return an action with the correct bindVar in the payload', () => {
    expect(action.payload.bindVar).toEqual('bindVar');
  });
});

describe('addArrayItem()', () => {
  const action = addArrayItem('bindVar', 'snap');
  it('should return an action of type ADD_ARRAY_ITEM', () => {
    expect(action.type).toEqual(ADD_ARRAY_ITEM);
  });

  it('should return an action with the correct bindVar in the payload', () => {
    expect(action.payload.bindVar).toEqual('bindVar');
  });

  it('should return an action with the correct snap in the payload', () => {
    expect(action.payload.snap).toEqual('snap');
  });
});

describe('updateArrayItem()', () => {
  const action = updateArrayItem('bindVar', 'snap');
  it('should return an action of type UPDATE_ARRAY_ITEM', () => {
    expect(action.type).toEqual(UPDATE_ARRAY_ITEM);
  });

  it('should return an action with the correct bindVar in the payload', () => {
    expect(action.payload.bindVar).toEqual('bindVar');
  });

  it('should return an action with the correct snap in the payload', () => {
    expect(action.payload.snap).toEqual('snap');
  });
});

describe('removeArrayItem()', () => {
  const action = removeArrayItem('bindVar', 'snap');
  it('should return an action of type REMOVE_ARRAY_ITEM', () => {
    expect(action.type).toEqual(REMOVE_ARRAY_ITEM);
  });

  it('should return an action with the correct bindVar in the payload', () => {
    expect(action.payload.bindVar).toEqual('bindVar');
  });

  it('should return an action with the correct snap in the payload', () => {
    expect(action.payload.snap).toEqual('snap');
  });
});


//
// Reducer
// -----------------------------------------------------------------------------


describe('reducer()', () => {
  it('should return an empty object as initial state', () => {
    const initialState = reducer(undefined, {});
    expect(initialState).toEqual({});
  });
});

