const createStore = require("redux").createStore;

module.exports = function () {

  const rootReducers = [];

  const consolidateReducer = (state, action) => {
    let nextState = state;
    if (rootReducers.length > 0) {
      nextState = rootReducers.reduce((a, c) => c(a, action), nextState);
    }

    return nextState;
  }

  return {

    injectRootReducer: (reducer) => {
      rootReducers.push(reducer);
    },

    getStore: (preloadedState, enhancer) => {
      return createStore(consolidateReducer, preloadedState, enhancer);
    }

  };
};
