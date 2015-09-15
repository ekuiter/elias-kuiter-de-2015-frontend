Template.categoryView.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var categorySlug = App.helpers.getCategorySlug();
    if (categorySlug)
      self.subscribe("projectsInCategory", categorySlug);
  });
  self.autorun(function() {
    if (self.subscriptionsReady() && App.helpers.getCategorySlug() && !App.helpers.getCategory())
      Router.go("notFound");
  });
});

Template.categoryView.helpers({
  category: function() {
    return App.helpers.getCategory();
  },
  hasCategorySlug: function() {
    return App.helpers.getCategorySlug();
  },
  isCategoryRoute: function() {
    return App.helpers.isRoute("category");
  },
  size: function() {
    return App.helpers.isRoute("category") ? "large" : "small";
  },
  active: function() {
    return App.helpers.getProjectSlug() === this.slug ? "active" : "";
  }
});