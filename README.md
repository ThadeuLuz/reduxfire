# ReduxFire ![Travis](https://travis-ci.org/ThadeuLuz/reduxfire.svg?branch=master) [![npm version](https://badge.fury.io/js/reduxfire.svg)](https://badge.fury.io/js/reduxfire)

[Redux](http://redux.js.org/) is a predictable state container for JavaScript apps. [Firebase](https://firebase.google.com/) complements it perfectly by providing an
easy-to-use, realtime data source for populating redux's `state` by dispatching actions. With ReduxFire, it
only takes a few lines of JavaScript to integrate Firebase data into your (pure|React|Angular|Vue|*) Redux application.

This project aims to follow the API of the official [ReactFire](https://github.com/firebase/reactfire) package, with a few additional functionalities.



## Table of Contents

 * [Getting Started With Firebase](#getting-started-with-firebase)
 * [Downloading ReduxFire](#downloading-reduxfire)
 * [Documentation](#documentation)
 * [Example](#example)
 <!-- * [Release Notes](https://github.com/firebase/reactfire/releases) -->
 <!-- * [Migration Guides](#migration-guides) -->
 <!-- * [Contributing](#contributing) -->


## Getting Started With Firebase

ReduxFire requires [Firebase](https://firebase.google.com/) in order to sync and store data.
Firebase is a suite of integrated products designed to help you develop your app, grow your user
base, and earn money. You can [sign up here for a free account](https://console.firebase.google.com/). ReduxFire also requires redux-thunk because some of its action creators dispatch functions instead of actions. This allows us to dispatch actions asynchronously and keep it in sync with your redux state.

## Downloading ReduxFire

In order to use ReduxFire in your project, you can install it via npm. You will probably also have to install Redux and Firebase:

```bash
$ npm i -S redux firebase reduxfire
```

## Documentation

* [Quickstart](docs/quickstart.md)
* [Guide](docs/guide.md)
* [API Reference](docs/reference.md)

## Example

Clone the product and run

```bash
$ npm i
$ npm run example
```
