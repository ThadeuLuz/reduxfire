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
 * Reducer for reduxfire.
 *
 * @param {object} state - The previous state.
 * @param {object} action - An object with the action that modifies the state.
 * @returns {object} - The new state.
 */
export default (state = {}, action = {}) => {
  const { type, payload = {} } = action;
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
 * Returns an action that updates the data at a bind variable on the state.
 *
 * @param {string} bindVar - Bind variable to save data on.
 * @param {DataSnapshot} snap - A Firebase snapshot of the data to save.
 * @return {Object} The updateValue action.
 */
export const updateValue = (bindVar, snap) => ({
  type: UPDATE_VALUE,
  payload: { bindVar, snap },
});


/**
 * Returns an action that removes all the data in a bind variable.
 *
 * @param {string} bindVar - Bind variable to remove.
 * @returns {object} - The removeValue action.
 */
export const removeValue = bindVar => ({ type: REMOVE_VALUE, payload: { bindVar } });


/**
 * Returns an action that adds an item to an array on a bind variable.
 *
 * @param {string} bindVar - Bind variable to update.
 * @param {DataSnapshot} snap - A Firebase snapshot of the data to add to array.
 * @returns {object} - The addArrayItem action.
 */
export const addArrayItem = (bindVar, snap) => ({
  type: ADD_ARRAY_ITEM,
  payload: { bindVar, snap },
});


/**
 * Returns an action that updates an item on an array on a bind variable.
 *
 * @param {string} bindVar - Bind variable to update.
 * @param {DataSnapshot} snap - A Firebase snapshot of the data to update on the array.
 * @returns {object} - The updateArrayItem action.
 */
export const updateArrayItem = (bindVar, snap) => ({
  type: UPDATE_ARRAY_ITEM,
  payload: { bindVar, snap },
});


/**
 * Returns an action that removes an item from an array on a bind variable.
 *
 * @param {string} bindVar - Bind variable to update.
 * @param {DataSnapshot} snap - A Firebase snapshot of the data to remove from the array.
 * @returns {object} - The addArrayItem action.
 */
export const removeArrayItem = (bindVar, snap) => ({
  type: REMOVE_ARRAY_ITEM,
  payload: { bindVar, snap },
});
