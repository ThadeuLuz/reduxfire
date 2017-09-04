import {
  throwError,
  validateBindVar,
  validateFirebaseRef,
} from './helpers';

import {
  updateValue,
  removeValue,
  addArrayItem,
  updateArrayItem,
  removeArrayItem,
} from './store';


const unbindFunctions = {};

// The default dispatch throws an error if the dispatch is not set
let dispatch = () => {
  throwError("You have to call 'setDispatch(store.dispatch)' before calling 'unbind', 'bindAsArray' or 'bindAsObject'");
};


/**
 * Saves a reference to the dispatch function locally.
 *
 * @param {function} dispatchFunction - The dispatch function to store
 */
export const setDispatch = (dispatchFunction) => {
  if (typeof dispatchFunction !== 'function') {
    throwError("Argument for 'setDispatch' must be a dispatch function.");
  }
  dispatch = dispatchFunction;
};


/**
 *
 * @param {*} firebaseRef
 * @param {*} bindVar
 * @param {*} cancelCallback
 */
export const bindAsObject = (firebaseRef, bindVar, cancelCallback) => {
  validateBindVar(bindVar);
  validateFirebaseRef(firebaseRef);

  if (unbindFunctions[bindVar]) {
    throwError(`The bindVar '${bindVar}' is already bound to a Firebase reference`);
  }

  const onValueListener = (snap) => {
    dispatch(updateValue(bindVar, snap));
  };

  firebaseRef.on('value', onValueListener, cancelCallback);

  // Stores the unbind function for this bindVar in our dictionary
  unbindFunctions[bindVar] = () => {
    firebaseRef.off('value', onValueListener); // Turns off the listener
    delete unbindFunctions[bindVar]; // Deletes the unbind function from the dictionary
    dispatch(removeValue(bindVar)); // Removes the data from the state
  };
};

export const bindAsArray = (firebaseRef, bindVar, cancelCallback) => {
  validateBindVar(bindVar);
  validateFirebaseRef(firebaseRef);

  if (unbindFunctions[bindVar]) {
    throwError(`The bindVar '${bindVar}' is already bound to a Firebase reference`);
  }

  const arrayChildAdded = (snap) => {
    dispatch(addArrayItem(bindVar, snap));
  };

  const arrayChildChanged = (snap) => {
    dispatch(updateArrayItem(bindVar, snap));
  };

  const arrayChildRemoved = (snap) => {
    dispatch(removeArrayItem(bindVar, snap));
  };

  firebaseRef.on('child_added', arrayChildAdded, cancelCallback);
  firebaseRef.on('child_changed', arrayChildChanged, cancelCallback);
  firebaseRef.on('child_removed', arrayChildRemoved, cancelCallback);

  // Stores the unbind function for this bindVar in our dictionary
  unbindFunctions[bindVar] = () => {
    // Turns off the listeners
    firebaseRef.off('child_added', arrayChildAdded);
    firebaseRef.off('child_changed', arrayChildChanged);
    firebaseRef.off('child_removed', arrayChildRemoved);
    delete unbindFunctions[bindVar]; // Deletes the unbind function from the dictionary
    dispatch(removeValue(bindVar)); // Removes the data from the state
  };
};

export const unbind = (bindVar) => {
  validateBindVar(bindVar);
  const unbindFunction = unbindFunctions[bindVar];

  if (!unbindFunction) {
    throwError(`The bindvar '${bindVar}' is not bound to a Firebase reference`);
  }

  unbindFunction();
};
