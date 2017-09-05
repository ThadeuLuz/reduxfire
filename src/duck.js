// See https://github.com/erikras/ducks-modular-redux
import {
  set,
  get,
  addItem,
  removeItem,
  replaceItem,
  findKeyIndex,
  createRecord,
  getKey,
} from './helpers';


//
// Action Types
// -----------------------------------------------------------------------------


export const UPDATE_VALUE = '@@reeduxfire/UPDATE_VALUE';
export const REMOVE_VALUE = '@@reeduxfire/REMOVE_VALUE';
export const ADD_ARRAY_ITEM = '@@reeduxfire/ADD_ARRAY_ITEM';
export const UPDATE_ARRAY_ITEM = '@@reeduxfire/UPDATE_ARRAY_ITEM';
export const REMOVE_ARRAY_ITEM = '@@reeduxfire/REMOVE_ARRAY_ITEM';


//
// Reducer
// -----------------------------------------------------------------------------


/**
 *
 * @param {*} state
 * @param {*} param1
 */
export default (state = {}, { type, payload = {} }) => {
  const { bindVar, snap } = payload;

  switch (type) {
    case UPDATE_VALUE:
      return set(state, bindVar, createRecord(getKey(snap), snap.val()));

    case REMOVE_VALUE:
      return set(state, bindVar, undefined);

    case ADD_ARRAY_ITEM: {
      const record = createRecord(getKey(snap), snap.val());
      return set(state, bindVar, addItem(get(state, bindVar), record));
    }

    case UPDATE_ARRAY_ITEM: {
      const array = get(state, bindVar);
      const key = getKey(snap);
      const index = findKeyIndex(array, key);
      const record = createRecord(key, snap.val());
      return set(state, bindVar, replaceItem(array, index, record));
    }

    case REMOVE_ARRAY_ITEM: {
      const array = get(state, bindVar);
      const index = findKeyIndex(array, getKey(snap));
      return set(state, bindVar, removeItem(array, index));
    }

    default:
      return state;
  }
};


//
// Action Creators
// -----------------------------------------------------------------------------


/**
 * Updates the data at a bind variable on the state.
 *
 * @param {string} bindVar - Bind variable to save data on.
 * @param {*} snap - Record to save.
 * @return {Object} Returns an action.
 */
export const updateValue = (bindVar, snap) => ({
  type: UPDATE_VALUE,
  payload: { bindVar, snap },
});

/**
 * Removes all the data in a bind variable
 *
 * @param {*} bindVar - Bind variable to remove.
 */
export const removeValue = bindVar => ({ type: REMOVE_VALUE, payload: { bindVar } });

/**
 *
 *
 * @param {string} bindVar
 * @param {*} record
 */
export const addArrayItem = (bindVar, snap) => ({
  type: ADD_ARRAY_ITEM,
  payload: { bindVar, snap },
});


export const updateArrayItem = (bindVar, key, record) => ({
  type: UPDATE_ARRAY_ITEM,
  payload: { bindVar, key, record },
});


export const removeArrayItem = (bindVar, key) => ({
  type: REMOVE_ARRAY_ITEM,
  payload: { bindVar, key },
});
