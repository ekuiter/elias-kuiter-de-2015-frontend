App = {
  initDuration: 300,
  helpers: { // may only be called from Template helpers / onCreated callbacks
    isRoute: function(routeName) {
      return Router.current().route.getName() === routeName;
    },
    getParams: function() {
      Router.current(); // call for reactivity's sake (getParams gets called on every transition)
      var controller = Iron.controller();
      return controller.params;
    },
    getCategorySlug: function() {
      return this.getParams().categorySlug;
    },
    getProjectSlug: function() {
      return this.getParams().projectSlug;
    },
    getCategory: function() {
      return Categories.findOne({ slug: this.getCategorySlug() });
    }
  }
};

Meteor.Spinner.options = {
  length: 10,
  width: 2,
  color: "#aaa"
};