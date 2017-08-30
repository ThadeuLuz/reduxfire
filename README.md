# ReduxFire


[Redux](http://redux.js.org/) is a predictable state container for JavaScript apps. [Firebase](https://firebase.google.com/) complements it perfectly by providing an
easy-to-use, realtime data source for populating redux's `state` by dispatching actions. With ReduxFire, it
only takes a few lines of JavaScript to integrate Firebase data into your (pure|React|Angular|Vue|*) Redux application.

This project aims to follow as closely as possible the API of the official [ReactFire](https://github.com/firebase/reactfire) package, with a few additional functionalities.

## Table of Contents

 * [Getting Started With Firebase](#getting-started-with-firebase)
 <!-- * [Downloading ReduxFire](#downloading-reduxfire) -->
 * [Documentation](#documentation)
 <!-- * [Examples](#examples) -->
 <!-- * [Release Notes](https://github.com/firebase/reactfire/releases) -->
 <!-- * [Migration Guides](#migration-guides) -->
 <!-- * [Contributing](#contributing) -->


## Getting Started With Firebase

ReduxFire requires [Firebase](https://firebase.google.com/) in order to sync and store data.
Firebase is a suite of integrated products designed to help you develop your app, grow your user
base, and earn money. You can [sign up here for a free account](https://console.firebase.google.com/). ReduxFire also requires redux-thunk because some of its action creators dispatch functions instead of actions. This allows us to dispatch actions asynchronously and keep it in sync with your redux state.

## Downloading ReduxFire

In order to use ReduxFire in your project, you can install it via npm. You will also have to install Redux, ReduxThunk and Firebase separately (that is, they are `peerDependencies`):

```bash
$ npm i -S redux redux-thunk firebase reduxfire
```

## Documentation

* [Quickstart](docs/quickstart.md)
* [Guide](docs/guide.md)
* [API Reference](docs/reference.md)


<!-- ## Examples

* [Todo App](examples/todoApp)
* [Comments Box](examples/commentsBox) -->

<!--## Contributing

If you'd like to contribute to ReactFire, please first read through our [contribution
 guidelines](.github/CONTRIBUTING.md). Local setup instructions are available [here](.github/CONTRIBUTING.md#local-setup). -->
