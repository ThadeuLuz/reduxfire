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
  if (/[[\]#$/\u0000-\u001F\u007F]/.test(bindVar)) {
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


const bindVar2Path = bindVar => bindVar.split('.').filter(p => !!p);

export const get = (object, bindVar) => (
  !bindVar ? object : bindVar2Path(bindVar).reduce((prev, keysStr) => (prev || {})[keysStr], object)
);

export const set = (object, bindVar, value) => {
  const path = bindVar2Path(bindVar);

  const updateObject = path.reduceRight((previousObject, subpath) => {
    path.pop();
    const complement = get(object, path.join('.')); // data previously on the path
    return Object.assign({}, complement, { [subpath]: previousObject });
  }, value);

  return Object.assign({}, updateObject);
};


//
// Pure Array Manipulation functions
// -----------------------------------------------------------------------------


export const addItem = (list = [], item) => ([item, ...list]);

export const removeItem = (list = [], index) => ([
  ...list.slice(0, index),
  ...list.slice(index + 1),
]);

export const replaceItem = (list = [], index, item) => ([
  ...list.slice(0, index),
  item,
  ...list.slice(index + 1),
]);

export const findKeyIndex = (list, key) => list.findIndex(item => item['.key'] === key);
