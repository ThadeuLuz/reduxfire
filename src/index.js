import { throwError, validateBindVar, validateFirebaseRef } from './helpers';

import reducer, {
  updateValue,
  removeValue,
  addArrayItem,
  updateArrayItem,
  removeArrayItem,
} from './store';

export { reducer };

const unbindFunctions = {};

// The default dispatch throws an error if the dispatch is not set
let dispatch = () => {
  throwError("You have to call 'setDispatch(store.dispatch)' before calling 'unbind', 'bindAsArray' or 'bindAsObject'");
};


/**
 * Sets the dispatch function on the library.
 *
 * @param {function} dispatchFunction - The dispatch function to use.
 */
export const setDispatch = (dispatchFunction) => {
  if (typeof dispatchFunction !== 'function') {
    throwError("Argument for 'setDispatch' must be a dispatch function.");
  }
  dispatch = dispatchFunction;
};


/**
 * Creates a binding between Firebase and the inputted bind variable as an object.
 *
 * @param {Firebase} firebaseRef - The Firebase ref whose data to bind.
 * @param {string} bindVar - The state variable to which to bind the data.
 * @param {function} cancelCallback - The Firebase reference's cancel callback.
 */
export const bindAsObject = (firebaseRef, bindVar, cancelCallback) => {
  validateBindVar(bindVar);
  validateFirebaseRef(firebaseRef);

  if (unbindFunctions[bindVar]) {
    throwError(`The bind variable '${bindVar}' is already bound to a Firebase reference`);
  }

  const onValueListener = (snap) => {
    dispatch(updateValue(bindVar, snap));
  };

  firebaseRef.on('value', onValueListener, cancelCallback);

  // Stores the unbind function for this bindVar in our dictionary
  unbindFunctions[bindVar] = (callback) => {
    firebaseRef.off('value', onValueListener); // Turns off the listener
    delete unbindFunctions[bindVar]; // Deletes the unbind function from the dictionary
    dispatch(removeValue(bindVar)); // Removes the data from the state
    callback();
  };
};

/**
 * Creates a binding between Firebase and the inputted bind variable as an array.
 *
 * @param {Firebase} firebaseRef - The Firebase ref whose data to bind.
 * @param {string} bindVar - The state variable to which to bind the data.
 * @param {function} cancelCallback - The Firebase reference's cancel callback.
 */
export const bindAsArray = (firebaseRef, bindVar, cancelCallback) => {
  validateBindVar(bindVar);
  validateFirebaseRef(firebaseRef);

  if (unbindFunctions[bindVar]) {
    throwError(`The bind variable '${bindVar}' is already bound to a Firebase reference`);
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
  unbindFunctions[bindVar] = (callback) => {
    // Turns off the listeners
    firebaseRef.off('child_added', arrayChildAdded);
    firebaseRef.off('child_changed', arrayChildChanged);
    firebaseRef.off('child_removed', arrayChildRemoved);
    delete unbindFunctions[bindVar]; // Deletes the unbind function from the dictionary
    dispatch(removeValue(bindVar)); // Removes the data from the state
    callback();
  };
};

/**
 * Removes the binding between Firebase and the inputted bind variable.
 *
 * @param {string} bindVar - The state variable to which the data is bound.
 * @param {function} callback - Called when the data is unbound and the state has been updated.
 */
export const unbind = (bindVar, callback = () => { }) => {
  validateBindVar(bindVar);
  const unbindFunction = unbindFunctions[bindVar];

  if (!unbindFunction) {
    throwError(`The bind variable '${bindVar}' is not bound to a Firebase reference`);
  }

  if (typeof dispatchFunction !== 'function') {
    throwError(`The callback argument needs to be a function, istead got '${callback}'`);
  }

  unbindFunction(callback);
};
