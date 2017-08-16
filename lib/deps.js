"use strict";

const PropTypes = require("prop-types");

const {
  withContext, getContext,
  mapProps,
  setDisplayName, wrapDisplayName
} = require("recompose");

const defaultMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions
});

function useDeps(mapper = defaultMapper) {
  return BaseComponent => {
    const displayName = wrapDisplayName(BaseComponent, "UseDeps");

    let BaseComponentDeps = BaseComponent;

    BaseComponentDeps = mapProps(props => {
      const {context, actions} = props;
      const mappedProps = mapper(context, actions);

      const others = {};
      for (const key in props) {
        if (props.hasOwnProperty(key) && key !== "context" && key !== "actions") {
          others[key] = props[key];
        }
      }

      return Object.assign({}, others, mappedProps);
    })(BaseComponentDeps);

    BaseComponentDeps = getContext({
      context: PropTypes.object,
      actions: PropTypes.object
    })(BaseComponentDeps);

    return setDisplayName(displayName)(BaseComponentDeps);
  };
}

function injectDeps(context, _actions) {
  const actions = {};
  for (const key in _actions) {
    if (_actions.hasOwnProperty(key)) {
      const actionMap = _actions[key];
      const newActionMap = {};
      for (const actionName in actionMap) {
        if (actionMap.hasOwnProperty(actionName)) {
          newActionMap[actionName] = actionMap[actionName].bind(null, context);
        }
      }
      actions[key] = newActionMap;
    }
  }

  return BaseComponent => {
    const displayName = wrapDisplayName(BaseComponent, "WithDeps");

    const BaseComponentWithContext = withContext({
      context: PropTypes.object,
      actions: PropTypes.object
    }, () => ({context, actions}))(BaseComponent);

    return setDisplayName(displayName)(BaseComponentWithContext);
  };
}

module.exports = {
  useDeps,
  injectDeps
};
