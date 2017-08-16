"use strict";

const {
  compose
} = require("recompose");

const {useDeps: _useDeps} = require("./deps");
const buildApp = require("./build");

const createRouter = require("./context/router");
const createStore = require("./context/store");

const App = require("./app");

// export this module's functions
module.exports.createApp = (...args) => (new App(...args));

module.exports.useDeps = _useDeps;

module.exports.buildApp = buildApp;

module.exports.createRouter = createRouter;
module.exports.createStore = createStore;

module.exports.compose = compose;
