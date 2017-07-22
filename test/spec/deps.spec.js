"use strict";

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const {getDisplayName} = require("recompose");

const {useDeps} = require("../..");
const {injectDeps} = require("../../lib/deps");

describe("Dependency Injection", function () {

  it("should works", () => {
    const context = {key1: 1, key2: 2};
    const actions = {namespace1: {action1: ctx => ctx}};

    function Parent({children}) {
      return React.createElement("div", {}, children);
    }
    const ParentCtx = injectDeps(context, actions)(Parent);

    expect(getDisplayName(ParentCtx)).to.be.equal("WithDeps(Parent)");

    function Child(props) {
      const obj = props.actions.namespace1.action1(props.context);
      return React.createElement("div", {"data-key1": obj.key1, "data-key2": obj.key2});
    }
    const ChildWithDeps = useDeps()(Child);
    expect(getDisplayName(ChildWithDeps)).to.be.equal("UseDeps(Child)");

    expect(ReactDOMServer.renderToStaticMarkup(
      React.createElement(ParentCtx, {},
        React.createElement(ChildWithDeps)))).to.be.equal("<div><div data-key1=\"1\" data-key2=\"2\"></div></div>");
  });

});
