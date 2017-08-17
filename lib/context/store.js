const createStore = require("redux").createStore;
const combineReducers = require("redux").combineReducers;

module.exports = function () {

  let store;
  let reducers = {};

  return {

    injectReducer: (reducerMap) => {
      reducers = Object.assign({}, reducers, reducerMap);

      if (store) {
        store.replaceReducer(combineReducers(reducers));
      }
    },

    dispatch: (action) => {
      if (store) {
        return store.dispatch(action);
      }
    },

    getStore: (preloadedState, enhancer) => {
      store = createStore((state, action) => state, preloadedState, enhancer);

      return store;
    }

  };
};
