# API Reference | ReduxFire


## Table of Contents

 * [`reducer(state, action)`](#reducerstate-action)
 * [`bindAsArray(firebaseRef, bindVar, cancelCallback)`](#bindasarrayfirebaseref-bindvar-cancelcallback)
 * [`bindAsObject(firebaseRef, bindVar, cancelCallback)`](#bindasobjectfirebaseref-bindvar-cancelcallback)
 * [`unbind(bindVar)`](#unbindbindvar)

## reducer(state, action)

### Description

The standard [Redux reducer](http://redux.js.org/docs/basics/Reducers.html) that you should combine with your other reducers when creating your Redux store. You probably don't want to call this method directly.

The key used for the reducer will be where your bound data will be stored. You can use any valid key, but we will assume you are using the key `firebaseData`.

It is also necessary to install [`redux-thunk`](https://github.com/gaearon/redux-thunk) middleware. This allows us to dispatch other actions asyncronously, and keep your store up to date with de realtime database.

```js
import { createStore, combineReducers } from 'redux';
import { reducer } from 'reduxfire';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  // ... your other reducers here ...
  firebaseData: reducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
```

## bindAsArray(firebaseRef, bindVar, cancelCallback)

### Description

This method is an [action-creator](http://redux.js.org/docs/basics/Actions.html#action-creators). It creates an action for a one-way binding from a list of nodes in your Firebase database to an array in the state of Redux's store. The name of the array stored in the state is specified using the `bindVar` variable.

### Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `firebaseRef` | `DatabaseRef` | The database reference to which we are binding. |
| `bindVar` | String | The name of the attribute within Redux's state which will be bound to your database. |
| `cancelCallback` | Function | An optional callback that will be notified if your event subscription is ever canceled because your client does not have permission to read this data (or it had permission but has now lost it). This callback will be passed an `Error` object indicating why the failure occurred. |

### Examples

The following code will make the data stored at the `/items` node as an array and make it available as `firebaseData.items` within your state:

```js
import { bindAsArray } from 'reduxfire';

var ref = firebase.database().ref("items");
store.dispatch(bindAsArray(ref, "items"));
```

Each record in the bound array will contain a `.key` property which specifies the key where the record is stored. So if you have data at `/items/-Jtjl482BaXBCI7brMT8`, the record for that data will have a `.key` of `"-Jtjl482BaXBCI7brMT8"`.

If an individual record's value in the database is a primitive (boolean, string, or number), the
value will be stored in the `.value` property. If the individual record's value is an object, each
of the object's properties will be stored as properties of the bound record. As an example, let's
assume the `/items` node you bind to contains the following data:

```js
{
  "items": {
    "-Jtjl482BaXBCI7brMT8": 100,
    "-Jtjl6tmqjNeAnQvyD4l": {
      "first": "fred",
      "last": "Flintstone"
    },
    "-JtjlAXoQ3VAoNiJcka9": "foo"
  }
}
```

The resulting bound array stored in `firebaseData.items` in the state will be:

```js
[
  {
    ".key": "-Jtjl482BaXBCI7brMT8",
    ".value": 100
  },
  {
    ".key": "-Jtjl6tmqjNeAnQvyD4l",
    "first": "Fred"
    "last": "Flintstone"
  },
  {
    ".key": "-JtjlAXoQ3VAoNiJcka9",
    ".value": "foo"
  }
]
```


## bindAsObject(firebaseRef, bindVar, cancelCallback)

### Description

This method is an [action-creator](http://redux.js.org/docs/basics/Actions.html#action-creators). It creates an action for a  one-way binding from node in your Firebase database to an object in the state of Redux's store. The name of the object stored in the state is specified using the `bindVar`
variable.

### Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `firebaseRef` | `DatabaseRef` | The database reference to which we are binding. |
| `bindVar` | String | The name of the attribute within Redux's state which will be bound to your database. |
| `cancelCallback` | Function | An optional callback that will be notified if your event subscription is ever canceled because your client does not have permission to read this data (or it had permission but has now lost it). This callback will be passed an `Error` object indicating why the failure occurred. |

### Examples

The following code will make the data stored at `/users/fred` as an object and make it available as `firebaseData.user` within your component:

```js
import { bindAsObject } from 'reduxfire';

var ref = firebase.database().ref().child("users/fred");
store.dispatch(bindAsObject(ref, "user"));
```

The bound object will contain a `.key` property which specifies the key where the object is stored. So in the code above where we bind to `/users/fred`, the bound object will have a `.key` of `"fred"`.

If the bound node's value in the database is a primitive (boolean, string, or number), the value will be stored in the `.value` property. If the bound node's value is an object, each of the object's properties will be stored as properties of the bound object. As an example, let's assume the `/users/fred` node you bind comes from the following data:

```js
{
  "users": {
    "fred": true
  }
}
```

The resulting bound object stored in `firebaseData.user` will be:

```js
{
  ".key": "fred",
  ".value": true
}
```

As another example, let's assume the `/users/fred` node contains an object:

```js
{
  "users": {
    "fred": {
      "first": "Fred",
      "last": "Flintstone"
    }
  }
}
```

The resulting bound object stored in `firebaseData.user` will be:

```js
{
  ".key": "fred",
  "first": "Fred",
  "last": "Flintstone"
}
```

As a final example, let's assume the `/users/fred` node does not exist (that is, it has a value of `null`). The resulting bound object stored in `this.state.user` will be:

```js
{
  ".key": "fred",
  ".value": null
}
```

## unbind(bindVar)

### Description

Unbinds the binding between your database and the inputted bind variable.

### Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `bindVar` | string | The name of the attribute within `state.firebaseData` which will be unbound from your database. |

The following code will unbind `state.firebaseData.items` and set its value to `undefined`:

```js
import { unbind } from 'reduxfire';

store.dispatch(unbind("items"));
```