"use strict";

const {getDisplayName} = require("recompose");

const {createApp} = require("../..");

describe("App", function () {

  it("should works", () => {
    const context = {
      client: {}
    };

    const app = createApp(context);
    app.loadModule({
      routes(injectDeps) {
        const Component = function() {};
        expect(getDisplayName(injectDeps(Component))).to.be.equal("WithDeps(Component)");
      },
      load(ctx, actions) {
        expect(ctx).to.be.equal(context);
        expect(actions.myNamespace.doSomething).to.be.a("function");
        expect(actions.myNamespace.doSomething()).to.be.equal(ctx);
      },
      actions: {
        myNamespace: {
          doSomething: (ctx) => ctx
        }
      }
    });
    app.init();
  });

});
