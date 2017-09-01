//
// Helpers
// -----------------------------------------------------------------------------


/**
 * Throws a formatted error message
 *
 * @param {string} message
 * @param {number} code
 */
export const throwError = (message) => {
  throw new Error(`ReduxFire: ${message}`);
};

/**
 * Returns the key of a Firebase snapshot across SDK versions.
 *
 * @param {DataSnapshot} snap A Firebase snapshot.
 * @return {string|null} key The Firebase snapshot's key.
 */
export const getKey = snap => ((typeof snap.key === 'function') ? snap.key() : snap.key);


/**
 * Returns the reference of a Firebase snapshot or reference across SDK versions.
 *
 * @param {DataSnapshot|DatabaseReference} snap - A Firebase snapshot.
 * @return {DatabaseReference} ref - The Firebase reference corresponding to the inputted snapshot.
 */
// export const getRef = snap => ((typeof snap.ref === 'function') ? snap.ref() : snap.ref);


/**
 * Creates a new record given a key-value pair.
 *
 * @param {string} key The new record's key.
 * @param {any} value The new record's value.
 * @return {Object} The new record.
 */
export const createRecord = (key, value) => ((typeof value === 'object' && value !== null) ?
  { '.key': key, ...value } : { '.key': key, '.value': value });


//
// Validation
// -----------------------------------------------------------------------------


/**
 * Validates the name of the variable which is being bound.
 *
 * @param {string} bindVar The variable which is being bound.
 */
export const validateBindVar = (bindVar) => {
  if (typeof bindVar !== 'string') {
    throwError(`Bind variable must be a string. Got: ${bindVar}`);
  }

  if (bindVar.length === 0) {
    throwError('Bind variable must be a non-empty string. Got: ""');
  }

  // Firebase can only stored child paths up to 768 characters
  if (bindVar.length > 768) {
    throwError(`Bind variable is too long to be stored in Firebase. Got: ${bindVar}`);
  }

  // Firebase does not allow node keys to contain the following characters
  if (/[[\].#$/\u0000-\u001F\u007F]/.test(bindVar)) {
    throwError(`Bind variable cannot contain any of the following characters: . # $ ] [ /. Got: ${bindVar}`);
  }
};


/**
 * Validates a firebase database reference.
 *
 * @param {Firebase} firebaseRef - The variable which is being bound.
 */
export const validateFirebaseRef = (firebaseRef) => {
  if (Object.prototype.toString.call(firebaseRef) !== '[object Object]') {
    throwError('Invalid Firebase reference');
  }
};


//
// Pure Object Manipulation functions
// -----------------------------------------------------------------------------


export const removeProp = (object, prop) => {
  const { [prop]: omit, ...others } = object;
  return others;
};


//
// Pure Array Manipulation functions
// -----------------------------------------------------------------------------


export const addItem = (list, item) => ([item, ...list]);

export const removeItem = (list, index) => ([
  ...list.slice(0, index),
  ...list.slice(index + 1),
]);

export const replaceItem = (list, item, index) => ([
  ...list.slice(0, index),
  ...list.slice(index + 1),
]);

export const findKeyIndex = (list, key) => list.findIndex(item => item['.key'] === key);
