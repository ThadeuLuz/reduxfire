# Quickstart | ReduxFire

With ReduxFire it only takes a few lines of JavaScript to integrate Firebase into Redux apps.


## 1. Create an account

The first thing we need to do is [sign up for a free Firebase account](https://firebase.google.com/). A brand new Firebase project will automatically be created for you which you will use in conjunction with ReduxFire to store and sync data.


## 2. Include Firebase and ReduxFire

To use ReduxFire in our website, we need to add it along with all its dependencies to the `<head>`
section of our HTML file. We recommend including the Firebase and ReduxFire libraries directly from
our CDN:


```js
<!-- Redux -->
<script src="https://unpkg.com/redux@latest/dist/redux.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.2.0/redux-thunk.js"></script>

<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/3.3.0/firebase.js"></script>

<!-- ReduxFire -->
// TODO: Add link to minified version
<script src=""></script>
```

ReduxFire and its dependencies are also available from npm via `npm i reduxfire`.


## 3. Initialize the Firebase SDK

We'll need to initialize the Firebase SDK before we can use it. This should happen one time, outside of your React component. You can find more details on the [web](https://firebase.google.com/docs/web/setup) or [Node.js](https://firebase.google.com/docs/server/setup) setup guides.

```js
<script>
  var config = {
    apiKey: "<YOUR-API-KEY>",

    // Only needed if using Firebase Realtime Database (which we will be in this example)
    databaseURL: "https://<YOUR-DATABASE-NAME>.firebaseio.com",

    // Only needed if using Firebase Authentication
    authDomain: "<YOUR-AUTH-DOMAIN>",

    // Only needed if using Firebase Storage
    storageBucket: "<YOUR-STORAGE-BUCKET>.appspot.com"
  };

  firebase.initializeApp(config);
</script>
```


## 4. Add the ReduxFire's `reducer`

ReduxFire exposes a [`reducer`](http://redux.js.org/docs/basics/Reducers.html) which is a pure function that takes the previous state and an action, and returns the next state. Our reducer specifically will handle the bind and unbind actions and will store your ref's data in its state.

 This reducer will allow us to dispatch actions that update our state with a **one-way data binding from our Firebase database to our Redux's `state`**. Add the `reducer` when creating your store, optionally combining with other reducers. Also, do not forget to apply the [`redux-thunk`](https://github.com/gaearon/redux-thunk) middleware:

```js
const rootReducer = combineReducers({
  // ... your other reducers here ...
  firebaseData: reducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk.default)
);
```

In this example we are using `firebaseData` as the key for combining reducers. This means that the state returned by our reducer will be stored under this key. Feel free to use anything else if you wish, but `firebaseData` will be used on the rest of this guide.

## 5. Bind to Firebase

Because of the data binding provided by ReduxFire, any changes to our remote database will be reflected in realtime to `state.firebaseData`. The data binding does not work in the other way - there are no actions you can dispatch to change firebase database. Any changes which we want to make should instead be changed in our database directly by using the Firebase client library. ReduxFire will handle the work of then updating `state.firebaseData`.

One nice feature of firebase is that due to the [optimistic nature](https://firebase.google.com/docs/reference/js/firebase.database.Reference#set) of it's JavaScript library, any changes will be reflected to your state instantly. In case the transaction fail, the values will be reverted back to their true server value. 

Once you have the store created, you can bind database references to keys in your store like this

```js
var ref = firebase.database().ref("items");

store.dispatch(ReduxFire.bindAsArray(ref, "items"));
```

Now, if we add an item to the `items` node in the database, that change will be automatically reflected in `firebaseData.items`. We have the option of binding the data from the database as a JavaScript array (via `bindAsArray()`) or object (via `bindAsObject()`).


## 6. Unbind from Firebase

If you want to unbind connections to the Firebase database, all you have to do is dispatch the action returned from the `unbind()` method. For
example, if we no longer want `firebaseData.items` in your state to be bound to node, we can call:

```js
store.dispatch(ReduxFire.unbind("items"));
```

## 7. Next steps

This was just a quick run through of the basics of ReduxFire. For a more in-depth explanation of how
to use ReduxFire, dig right into the
[ReduxFire API reference](reference.md).