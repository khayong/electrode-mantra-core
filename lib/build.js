const App = require("./app");

function buildApp(modules, context) {
  const app = new App(context);

  modules.forEach(app.loadModule.bind(app));

  app.init();

  return app;
}

module.exports = buildApp;