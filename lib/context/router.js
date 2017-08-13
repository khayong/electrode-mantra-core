module.exports = function () {
  const routes = {
    childRoutes: []
  };

  return {
    routes,

    makeRootRoute: route => {
      Object.assign(routes, route);
    },

    injectChildRoute: route => {
      routes.childRoutes.push(route);
    }
  }
};
