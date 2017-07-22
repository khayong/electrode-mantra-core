"use strict";

const {useDeps: _useDeps} = require("./deps");

const App = require("./app");

// export this module's functions
module.exports.createApp = (...args) => (new App(...args));

module.exports.useDeps = _useDeps;
