Template.categoriesView.onCreated(function() {
  this.subscribe("categories");
  this.animatable = new ReactiveVar(true);
});

Template.categoriesView.helpers({
  categories: function() {
    return Categories.find({}, { sort: { order: 1 } });
  },
  size: function() {
    if (App.isRoute("home"))
      return "large";
    else {
      Template.instance().animatable.set(false);
      return "small";
    }
  },
  animatable: function() {
    return Template.instance().animatable.get() ? "animatable" : "";
  },
  active: function() {
    return App.helpers.getCategorySlug() === this.slug && !Session.get("isNotFound") ? "active" : "";
  }
});