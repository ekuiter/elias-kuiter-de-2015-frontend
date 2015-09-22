App = {
  initDuration: 300,
  notFoundTitle: "Seite nicht gefunden",
  isRoute: function(routeName) {
    return Router.current().route.getName() === routeName;
  },
  setTitle: function(title, router) {
    if (typeof title === "function")
      title = title.apply(router);
    document.title = title ? title + " | " + this.defaultTitle : this.defaultTitle;
  },
  renderNotFound: function() {
    Session.set("isNotFound", true);
    this.setTitle(this.notFoundTitle);
    Router.current().render("notFoundRoute");
  },
  helpers: { // may only be called from Template helpers / onCreated callbacks
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
    getImageNumber: function() {
      return parseInt(this.getParams().imageNumber);
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